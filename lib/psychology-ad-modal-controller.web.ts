type ModalListener = (visible: boolean) => void;

let visible = false;
let resolver: (() => void) | null = null;
const listeners = new Set<ModalListener>();

function notify() {
  listeners.forEach((listener) => listener(visible));
}

export function subscribePsychologyAdModal(listener: ModalListener) {
  listeners.add(listener);
  listener(visible);
  return () => {
    listeners.delete(listener);
  };
}

export function showPsychologyAdModal(): Promise<void> {
  if (visible) {
    return new Promise((resolve) => {
      const check = () => {
        if (!visible) {
          unsubscribe();
          resolve();
        }
      };
      const unsubscribe = subscribePsychologyAdModal(check);
    });
  }

  return new Promise((resolve) => {
    resolver = resolve;
    visible = true;
    notify();
  });
}

export function dismissPsychologyAdModal() {
  if (!visible) return;
  visible = false;
  notify();
  resolver?.();
  resolver = null;
}

export function isPsychologyAdModalVisible() {
  return visible;
}
