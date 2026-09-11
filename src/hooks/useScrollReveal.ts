import { useInView } from "framer-motion";
import { useRef } from "react";

type UseInViewOptions = NonNullable<Parameters<typeof useInView>[1]>;

export const useScrollReveal = <T extends HTMLElement = HTMLElement>(
  options?: Pick<UseInViewOptions, "once" | "margin">
) => {
  const ref = useRef<T | null>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? "-100px",
  });
  return { ref, isInView };
};
