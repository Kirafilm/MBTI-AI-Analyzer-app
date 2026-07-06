import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/screen-container";
import { useI18n } from "@/lib/i18n-context";
import { useColors } from "@/hooks/use-colors";
import { tosContent } from "@/lib/terms-of-service-content";
import type { TosContent } from "@/lib/terms-of-service-content";
import * as Haptics from "expo-haptics";

const SectionTitle = ({ children }: { children: string }) => (
  <Text className="text-lg font-bold text-foreground mt-6 mb-2">{children}</Text>
);

const BodyText = ({ children }: { children: string }) => (
  <Text className="text-sm text-foreground leading-6 mb-3">{children}</Text>
);

const BulletItem = ({ children }: { children: string }) => (
  <View className="flex-row mb-2 pl-2">
    <Text className="text-sm text-foreground leading-6 w-4">•</Text>
    <Text className="text-sm text-foreground leading-6 flex-1">{children}</Text>
  </View>
);

const Divider = () => <View className="h-px bg-border my-6" />;

export default function TermsOfServiceScreen() {
  const router = useRouter();
  const { t, language } = useI18n();
  const colors = useColors();

  const content: TosContent = tosContent[language];

  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <ScreenContainer className="p-6">
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("termsOfService"),
          headerLeft: () => (
            <Pressable onPress={handleClose}>
              <MaterialIcons name="close" size={24} color={colors.tint} />
            </Pressable>
          ),
        }}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-foreground mt-4 mb-2">
          {content.title}
        </Text>
        <Text className="text-sm text-muted mb-6">{content.lastUpdated}</Text>

        <BodyText>{content.intro}</BodyText>

        <Divider />

        {content.sections.map((section, idx) => (
          <View key={idx}>
            <SectionTitle>{section.title}</SectionTitle>

            {section.subSections
              ? section.subSections.map((sub, sIdx) => (
                  <View key={sIdx}>
                    <Text className="text-sm font-semibold text-foreground mb-1 mt-2">
                      {sub.title}
                    </Text>
                    {sub.bullets.map((b, bIdx) => (
                      <BulletItem key={bIdx}>{b}</BulletItem>
                    ))}
                  </View>
                ))
              : null}

            {section.body
              ? section.body.map((b, bIdx) => (
                  <BodyText key={bIdx}>{b}</BodyText>
                ))
              : null}

            {section.bullets
              ? section.bullets.map((b, bIdx) => (
                  <BulletItem key={bIdx}>{b}</BulletItem>
                ))
              : null}

            <Divider />
          </View>
        ))}

        <View className="flex-row items-center gap-2 mb-3 pl-2">
          <MaterialIcons name="email" size={18} color={colors.tint} />
          <Text className="text-sm text-foreground">{content.contactEmail}</Text>
        </View>

        <Divider />

        <Text className="text-xs text-muted text-center mt-2 mb-8">
          {content.footer}
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
}
