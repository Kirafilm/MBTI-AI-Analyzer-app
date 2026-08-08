import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { AdsterraAd } from "@/components/adsterra-ad.web";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import { getAdsterraDisplay300 } from "@/lib/adsterra";
import {
  dismissPsychologyAdModal,
  subscribePsychologyAdModal,
} from "@/lib/psychology-ad-modal-controller.web";

const MIN_VIEW_SECONDS = 3;

export function PsychologyAdModalHost() {
  const colors = useColors();
  const { language } = useI18n();
  const [visible, setVisible] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(MIN_VIEW_SECONDS);
  const adsterraUnit = getAdsterraDisplay300();

  useEffect(() => subscribePsychologyAdModal(setVisible), []);

  useEffect(() => {
    if (!visible) {
      setCanContinue(false);
      setSecondsLeft(MIN_VIEW_SECONDS);
      return;
    }

    setCanContinue(false);
    setSecondsLeft(MIN_VIEW_SECONDS);

    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setCanContinue(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [visible]);

  const title =
    language === "en"
      ? "Please wait a moment"
      : language === "zh-CN"
        ? "请稍候"
        : "請稍候";

  const continueLabel =
    language === "en" ? "Continue" : language === "zh-CN" ? "继续" : "繼續";

  const waitLabel =
    language === "en"
      ? `Continue in ${secondsLeft}s`
      : language === "zh-CN"
        ? `${secondsLeft} 秒后可继续`
        : `${secondsLeft} 秒後可繼續`;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.55)",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 16,
            backgroundColor: colors.background,
            padding: 20,
            gap: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground, textAlign: "center" }}>
            {title}
          </Text>

          {adsterraUnit ? <AdsterraAd unit={adsterraUnit} /> : null}

          <Pressable
            disabled={!canContinue}
            onPress={dismissPsychologyAdModal}
            style={{
              backgroundColor: canContinue ? colors.tint : colors.muted,
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              {canContinue ? continueLabel : waitLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
