"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/Button";
import styles from "./DropdownButton.module.css";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownButtonProps = {
  options: DropdownOption[];
  /** Initial selected option value. */
  defaultValue: string;
  /** Minimum width of the dropdown menu (may exceed the trigger). Accepts any CSS length. */
  menuMinWidth?: string | number;
  /** Called with the selected option value. */
  onSelect?: (value: string) => void;
};

/** Stub: replace or pass `onSelect` to handle the chosen value. */
function handleSelect(value: string) {
  // TODO: handle selection
  void value;
}

export function DropdownButton({
  options,
  defaultValue,
  menuMinWidth,
  onSelect = handleSelect,
}: DropdownButtonProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const selectedLabel =
    options.find((option) => option.value === selected)?.label ?? selected;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const menuMinWidthStyle =
    menuMinWidth == null
      ? undefined
      : {
          minWidth:
            typeof menuMinWidth === "number"
              ? `${menuMinWidth}px`
              : menuMinWidth,
        };

  return (
    <div ref={rootRef} className={styles.root}>
      <Button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selectedLabel}</span>
        <span className={styles.caret} aria-hidden="true">
          {open ? "▴" : "▾"}
        </span>
      </Button>
      {open ? (
        <ul
          id={menuId}
          className={styles.menu}
          role="listbox"
          style={menuMinWidthStyle}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === selected}
            >
              <button
                type="button"
                className={styles.option}
                onClick={() => {
                  setSelected(option.value);
                  onSelect(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
