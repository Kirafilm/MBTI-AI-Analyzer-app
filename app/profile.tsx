import { ScrollView, Text, View, Pressable, Alert } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/screen-container";
import { useI18n } from "@/lib/i18n-context";
import { useAuth } from "@/hooks/use-auth";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { user, isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const colors = useColors();

  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleDeleteAccount = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      t("deleteAccount"),
      t("deleteAccountConfirm"),
      [
        { text: t("cancel"), style: "cancel" },
        {
          text: t("delete"),
          style: "destructive",
          onPress: async () => {
            Alert.alert(
              t("deleteAccount"),
              "此功能尚未實現。如需刪除賬號，請通過聯絡我們發送請求。",
              [{ text: t("close") }]
            );
          },
        },
      ]
    );
  };

  const handlePrivacyPolicy = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/privacy-policy");
  };

  const handleTermsOfService = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/terms-of-service");
  };

  const handleContactUs = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/contact-us");
  };

  const handleLogout = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await logout();
    router.back();
  };

  const menuItems = [
    {
      icon: "privacy-tip" as const,
      label: t("privacyPolicy"),
      onPress: handlePrivacyPolicy,
    },
    {
      icon: "description" as const,
      label: t("termsOfService"),
      onPress: handleTermsOfService,
    },
    {
      icon: "mail" as const,
      label: t("contactUs"),
      onPress: handleContactUs,
    },
  ];

  return (
    <ScreenContainer className="p-6">
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("profile"),
          headerLeft: () => (
            <Pressable onPress={handleClose}>
              <MaterialIcons name="close" size={24} color={colors.tint} />
            </Pressable>
          ),
        }}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-6 pt-4">
          {/* User Info */}
          <View className="items-center gap-3 py-6">
            <View className="w-20 h-20 rounded-full bg-surface border-2 border-primary items-center justify-center">
              <MaterialIcons name="person" size={40} color={colors.tint} />
            </View>
            {isAuthenticated ? (
              <>
                <Text className="text-lg font-semibold text-foreground">
                  {user?.name ?? "-"}
                </Text>
                {user?.email ? (
                  <Text className="text-sm text-muted">{user.email}</Text>
                ) : null}
              </>
            ) : (
              <>
                <Text className="text-base text-muted">{t("notAuthenticated")}</Text>
                <Pressable
                  onPress={handleLogin}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <View className="bg-primary rounded-lg px-6 py-2">
                    <Text className="text-background font-semibold text-sm">
                      {t("login")}
                    </Text>
                  </View>
                </Pressable>
              </>
            )}
          </View>

          {/* Menu Items */}
          <View className="bg-surface rounded-2xl border border-border overflow-hidden">
            {menuItems.map((item, index) => (
              <Pressable
                key={item.icon}
                onPress={item.onPress}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                className={index < menuItems.length - 1 ? "border-b border-border" : ""}
              >
                <View className="flex-row items-center gap-4 p-4">
                  <MaterialIcons name={item.icon} size={22} color={colors.tint} />
                  <Text className="flex-1 text-base text-foreground">{item.label}</Text>
                  <MaterialIcons name="chevron-right" size={20} color={colors.muted} />
                </View>
              </Pressable>
            ))}
          </View>

          {/* Bottom Actions */}
          <View className="gap-3 mt-2">
            {isAuthenticated && (
              <Pressable
                onPress={handleLogout}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <View className="w-full bg-surface rounded-xl p-4 items-center border border-border">
                  <Text className="text-foreground font-semibold text-base">
                    {t("logout")}
                  </Text>
                </View>
              </Pressable>
            )}

            <Pressable
              onPress={handleDeleteAccount}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <View className="w-full bg-red-50 dark:bg-red-950/30 rounded-xl p-4 items-center border border-red-200 dark:border-red-800">
                <Text className="text-red-600 dark:text-red-400 font-semibold text-base">
                  {t("deleteAccount")}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
