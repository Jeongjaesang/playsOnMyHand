import { useState, useEffect } from "react";

export function useFilter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isFilterOpen]);

  return { isFilterOpen, setIsFilterOpen };
}
