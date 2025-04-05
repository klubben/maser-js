import { transition } from "@/utils/transition";

export const transitionAsync = async (
  ...args: Parameters<typeof transition>
) => {
  return new Promise<void>((resolve) => {
    const cb = args[2].onComplete;
    args[2].onComplete = () => {
      cb?.();
      resolve();
    };
    transition(...args);
  });
};
