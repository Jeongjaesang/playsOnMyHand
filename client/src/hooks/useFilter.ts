import { Filters } from "@/components/home/Filter";
import { useState, useEffect } from "react";

export function useFilter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({}); // ✅ Store filter states here

  // ✅ Handle Escape key to close modal
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

  // ✅ Encapsulated function to update filters
  const handleFilter = (newFilters: Filters) => {
    console.log("🔄 Updating filters:", newFilters);
    setFilters((prev) => ({
      ...prev,
      ...newFilters, // ✅ Merge new filters with existing ones
    }));
  };

  return { isFilterOpen, setIsFilterOpen, filters, handleFilter }; // ✅ Export `handleFilter`
}
