"use client";

import { DropdownButton } from "@/components/DropdownButton";
import { useProjectFilter } from "@/components/ProjectFilter";

export function LearnMoreDropdown() {
  const { selectFromDropdown } = useProjectFilter();

  return (
    <DropdownButton
      defaultValue="everything"
      menuMinWidth="15rem"
      onSelect={selectFromDropdown}
      options={[
        { label: "the Software Engineer", value: "software" },
        { label: "the Game Developer", value: "gamedev" },
        { label: "the Researcher", value: "research" },
        { label: "Everything", value: "everything" },
      ]}
    />
  );
}
