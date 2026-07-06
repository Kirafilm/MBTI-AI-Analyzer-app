CREATE TABLE `premium_purchases` (
  `id` int AUTO_INCREMENT NOT NULL,
  `openId` varchar(64) NOT NULL,
  `email` varchar(320),
  `stripeSessionId` varchar(255) NOT NULL,
  `stripeCustomerId` varchar(255),
  `purchasedAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `premium_purchases_id` PRIMARY KEY(`id`),
  CONSTRAINT `premium_purchases_openId_unique` UNIQUE(`openId`)
);
