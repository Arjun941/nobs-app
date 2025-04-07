interface Workbox {
  addEventListener(
    event: 'installed' | 'controlling' | 'activated' | 'waiting',
    callback: (event: { type: string }) => void
  ): void;
  messageSkipWaiting(): void;
  register(): Promise<void>;
}

declare global {
  interface Window {
    workbox?: Workbox;
  }
}

export {};
