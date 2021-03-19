import React from "react";

export function useRovingTabindex({
  initialIndex = 0,
  direction = "horizontal",
  selector = ":scope > *",
} = {}) {
  const compositeRef = React.useRef(null);
  const focusableElementsRef = React.useRef([]);
  const [activeElement, setActiveElement] = React.useState(null);
  const previousActiveElement = usePrevious(activeElement);

  React.useEffect(() => {
    previousActiveElement?.setAttribute("tabindex", "-1");
    activeElement?.setAttribute("tabindex", "0");
  }, [activeElement, previousActiveElement]);

  React.useEffect(() => {
    const handleElementFocus = ({ target }) => setActiveElement(target);
    const handleElementClick = ({ target }) => target.focus();

    function handleElementKeydown(e) {
      const { code } = e;
      if (
        (direction === "horizontal" &&
          ["ArrowLeft", "ArrowRight"].includes(code)) ||
        (direction === "vertical" && ["ArrowUp", "ArrowDown"].includes(code))
      )
        e.preventDefault();
    }

    function handleElementKeyup(e) {
      const { code, target } = e;

      if (
        (direction === "horizontal" &&
          ["ArrowLeft", "ArrowRight"].includes(code)) ||
        (direction === "vertical" && ["ArrowUp", "ArrowDown"].includes(code))
      ) {
        e.preventDefault();
        const elementIndex = focusableElementsRef.current.indexOf(target);
        const lastElementIndex = focusableElementsRef.current.length - 1;
        const isElementFirst = elementIndex === 0;
        const isElementLast = elementIndex === lastElementIndex;

        let nextIndex;

        if (
          (direction === "horizontal" && code === "ArrowRight") ||
          (direction === "vertical" && code === "ArrowDown")
        )
          nextIndex = isElementLast ? 0 : elementIndex + 1;

        if (
          (direction === "horizontal" && code === "ArrowLeft") ||
          (direction === "vertical" && code === "ArrowUp")
        )
          nextIndex = isElementFirst ? lastElementIndex : elementIndex - 1;

        focusableElementsRef.current[nextIndex].focus();
      }
    }

    focusableElementsRef.current = [
      ...compositeRef.current.querySelectorAll(selector),
    ];

    const focusableElements = focusableElementsRef.current;

    focusableElements.map((element) => {
      element.setAttribute("tabindex", "-1");
      element.addEventListener("focus", handleElementFocus);
      element.addEventListener("click", handleElementClick);
      element.addEventListener("keydown", handleElementKeydown);
      element.addEventListener("keyup", handleElementKeyup);
    });

    setActiveElement(focusableElements[initialIndex]);

    return () => {
      focusableElements.map((element) => {
        element.removeEventListener("focus", handleElementFocus);
        element.removeEventListener("click", handleElementClick);
        element.removeEventListener("keydown", handleElementKeydown);
        element.removeEventListener("keyup", handleElementKeyup);
      });
    };
  }, [initialIndex, direction, selector]);

  return [compositeRef, activeElement];
}

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => (ref.current = value));
  return ref.current;
}
