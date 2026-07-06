import { useState, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Alert,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/screen-container";
import { useI18n } from "@/lib/i18n-context";
import { useColors } from "@/hooks/use-colors";
import { trpc } from "@/lib/trpc";
import * as Haptics from "expo-haptics";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactUsScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const colors = useColors();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const messageRef = useRef<TextInput>(null);

  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const isValidEmail = (v: string) => EMAIL_REGEX.test(v);

  const sendMessageMutation = trpc.contact.sendMessage.useMutation();

  const handleSend = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      Alert.alert(t("error"), t("pleaseFillAllFields"));
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      Alert.alert(t("error"), t("invalidEmailFormat"));
      return;
    }

    setIsSending(true);
    try {
      await sendMessageMutation.mutateAsync({
        from_name: trimmedName,
        reply_to: trimmedEmail,
        message: trimmedMessage,
      });

      setHasSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      Alert.alert(
        t("error"),
        err?.message || "發送失敗，請稍後再試。"
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ScreenContainer className="p-6">
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("contactUsTitle"),
          headerLeft: () => (
            <Pressable onPress={handleClose}>
              <MaterialIcons name="close" size={24} color={colors.tint} />
            </Pressable>
          ),
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 gap-6 pt-4">
            {/* Description */}
            <Text className="text-sm text-muted leading-5">
              {t("contactUsDescription")}
            </Text>

            {hasSent ? (
              /* Success State */
              <View className="flex-1 items-center justify-center py-12 gap-4">
                <View className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 items-center justify-center">
                  <MaterialIcons name="check-circle" size={40} color="#22c55e" />
                </View>
                <Text className="text-xl font-bold text-foreground">
                  {t("messageSent")}
                </Text>
                <Text className="text-sm text-muted text-center px-4">
                  {t("messageSentDescription")}
                </Text>
                <Pressable
                  onPress={() => setHasSent(false)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                  className="mt-4"
                >
                  <View className="bg-surface border border-border rounded-lg px-6 py-3">
                    <Text className="text-foreground font-medium">
                      {t("sendMessage")}
                    </Text>
                  </View>
                </Pressable>
              </View>
            ) : (
              /* Form */
              <View className="gap-4">
                {/* Name Field */}
                <View className="gap-1.5">
                  <Text className="text-sm font-medium text-foreground">
                    {t("yourName")}
                  </Text>
                  <TextInput
                    className="bg-surface border border-border rounded-xl px-4 py-3 text-base text-foreground"
                    placeholder={t("yourName")}
                    placeholderTextColor={colors.muted}
                    value={name}
                    onChangeText={setName}
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current?.focus()}
                    blurOnSubmit={false}
                    autoCapitalize="words"
                    editable={!isSending}
                  />
                </View>

                {/* Email Field */}
                <View className="gap-1.5">
                  <Text className="text-sm font-medium text-foreground">
                    {t("yourEmail")}
                  </Text>
                  <TextInput
                    ref={emailRef}
                    className="bg-surface border border-border rounded-xl px-4 py-3 text-base text-foreground"
                    placeholder={t("yourEmail")}
                    placeholderTextColor={colors.muted}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => messageRef.current?.focus()}
                    blurOnSubmit={false}
                    editable={!isSending}
                  />
                </View>

                {/* Message Field */}
                <View className="gap-1.5">
                  <Text className="text-sm font-medium text-foreground">
                    {t("yourMessage")}
                  </Text>
                  <TextInput
                    ref={messageRef}
                    className="bg-surface border border-border rounded-xl px-4 py-3 text-base text-foreground"
                    placeholder={t("yourMessage")}
                    placeholderTextColor={colors.muted}
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    style={{ minHeight: 150 }}
                    editable={!isSending}
                  />
                </View>

                {/* Send Button */}
                <Pressable
                  onPress={handleSend}
                  disabled={isSending}
                  style={({ pressed }) => [
                    { opacity: pressed ? 0.8 : 1 },
                    isSending && { opacity: 0.6 },
                  ]}
                >
                  <View className="bg-primary rounded-xl py-3.5 items-center justify-center flex-row gap-2">
                    {isSending ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <MaterialIcons name="send" size={18} color="#fff" />
                    )}
                    <Text className="text-background font-semibold text-base">
                      {isSending ? t("sending") : t("sendMessage")}
                    </Text>
                  </View>
                </Pressable>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
