"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export const dropdownToTag: Record<string, string | null> = {
  software: "Software",
  gamedev: "Game Dev",
  research: "Research",
  everything: null,
};

type ProjectFilterContextValue = {
  dropdownValue: string;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  selectFromDropdown: (value: string) => void;
};

const ProjectFilterContext = createContext<ProjectFilterContextValue | null>(
  null,
);

export function ProjectFilterProvider({ children }: { children: ReactNode }) {
  const [dropdownValue, setDropdownValue] = useState("everything");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <ProjectFilterContext.Provider
      value={{
        dropdownValue,
        selectedTag,
        setSelectedTag,
        selectFromDropdown: (value) => {
          setDropdownValue(value);
          setSelectedTag(value in dropdownToTag ? dropdownToTag[value] : null);
        },
      }}
    >
      {children}
    </ProjectFilterContext.Provider>
  );
}

export function useProjectFilter() {
  const value = useContext(ProjectFilterContext);
  if (!value) {
    throw new Error("useProjectFilter must be used within ProjectFilterProvider");
  }
  return value;
}

export function useProjectFilterOptional() {
  return useContext(ProjectFilterContext);
}
