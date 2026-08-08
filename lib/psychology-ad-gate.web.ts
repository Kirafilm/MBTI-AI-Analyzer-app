import { isAdsterraDisplayEnabled } from "@/lib/adsterra";
import { showPsychologyAdModal } from "@/lib/psychology-ad-modal-controller.web";

export async function showPsychologyTestAd(): Promise<void> {
  if (!isAdsterraDisplayEnabled()) {
    return;
  }

  await showPsychologyAdModal();
}
