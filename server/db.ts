import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, premiumPurchases, users, type InsertPremiumPurchase } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;
const memoryPremiumOpenIds = new Set<string>();

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function hasPremiumPurchase(openId: string) {
  if (memoryPremiumOpenIds.has(openId)) {
    return true;
  }

  const db = await getDb();
  if (!db) {
    return false;
  }

  const result = await db
    .select({ openId: premiumPurchases.openId })
    .from(premiumPurchases)
    .where(eq(premiumPurchases.openId, openId))
    .limit(1);

  return result.length > 0;
}

export async function recordPremiumPurchase(purchase: InsertPremiumPurchase) {
  memoryPremiumOpenIds.add(purchase.openId);

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Premium purchase recorded in memory only:", purchase.openId);
    return;
  }

  await db
    .insert(premiumPurchases)
    .values(purchase)
    .onDuplicateKeyUpdate({
      set: {
        email: purchase.email ?? null,
        stripeSessionId: purchase.stripeSessionId,
        stripeCustomerId: purchase.stripeCustomerId ?? null,
      },
    });
}

// TODO: add feature queries here as your schema grows.
