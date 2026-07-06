import { isAdSenseDisplayEnabled } from "@/lib/adsense";
import { showPsychologyAdModal } from "@/lib/psychology-ad-modal-controller.web";

export async function showPsychologyTestAd(): Promise<void> {
  if (!isAdSenseDisplayEnabled()) {
    return;
  }

  await showPsychologyAdModal();
}
