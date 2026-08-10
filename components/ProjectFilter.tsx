"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

const dropdownToTag: Record<string, string | null> = {
  software: "Software",
  gamedev: "Game Dev",
  research: "Research",
  everything: null,
};

type ProjectFilterContextValue = {
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  selectFromDropdown: (value: string) => void;
};

const ProjectFilterContext = createContext<ProjectFilterContextValue | null>(
  null,
);

export function ProjectFilterProvider({ children }: { children: ReactNode }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <ProjectFilterContext.Provider
      value={{
        selectedTag,
        setSelectedTag,
        selectFromDropdown: (value) => {
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
