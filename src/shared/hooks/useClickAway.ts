import { useEffect, type RefObject, useRef } from "react";

export const useClickAway = <T extends HTMLElement> (
  ref: RefObject<T | null>,
  handler: (event: Event) => void,
  refs?: Array<RefObject<HTMLElement | null>>
) => {
  const refHandler = useRef<(event: Event) => void>(null)

  useEffect(() => {
    refHandler.current = handler
  }, [handler]);

  useEffect(() => {
    const handleClick = (event: Event) => {
      const allRefs = [ref, ...refs || []]

      if (allRefs.every(ref => !ref.current?.contains(event.target as Node))) {
        refHandler.current?.(event);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("touchstart", handleClick)
    }
  }, [ref, refs])
}