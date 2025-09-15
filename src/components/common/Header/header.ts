import { useEffect } from "react";

// ✅ Single element scroll animation hook
export function useScrollAnimation(
  selector: string,
  options: { threshold?: number; activeClass?: string } = {}
) {
  const { threshold = 50, activeClass = "fixed" } = options;

  useEffect(() => {
    let element: HTMLElement | null = null;

    const handleScroll = () => {
      if (!element) return;
      const scrollTop = window.scrollY;
      if (scrollTop > threshold) {
        element.classList.add(activeClass);
      } else {
        element.classList.remove(activeClass);
      }
    };

    const setup = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        element = document.querySelector<HTMLElement>(selector);
        if (!element) return;
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // run once immediately
      } else {
        // remove if resized down
        element?.classList.remove(activeClass);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    setup();
    window.addEventListener("resize", setup);

    return () => {
      window.removeEventListener("resize", setup);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selector, threshold, activeClass]);
}

// ✅ Multi-element scroll hook
export function useScrollLogo(
  selectors: string[],
  threshold: number,
  classes: string[]
) {
  useEffect(() => {
    let elements: HTMLElement[] = [];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      elements.forEach((el, i) => {
        if (scrollTop > threshold) {
          el.classList.add(classes[i]);
        } else {
          el.classList.remove(classes[i]);
        }
      });
    };

    const setup = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        elements = selectors
          .map((sel) => document.querySelector<HTMLElement>(sel))
          .filter(Boolean) as HTMLElement[];
        if (elements.length === 0) return;
        window.addEventListener("scroll", handleScroll);
        handleScroll();
      } else {
        elements.forEach((el, i) => el.classList.remove(classes[i]));
        window.removeEventListener("scroll", handleScroll);
      }
    };

    setup();
    window.addEventListener("resize", setup);

    return () => {
      window.removeEventListener("resize", setup);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectors, threshold, classes]);
}
