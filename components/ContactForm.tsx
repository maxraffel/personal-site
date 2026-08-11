"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { cx } from "@/lib/cx";
import styles from "./ContactForm.module.css";

type ToastState = {
  tone: "success" | "error";
  message: string;
} | null;

function isValidEmail(email: string) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
    email,
  );
}

export function ContactForm() {
  const formId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedInstitution = institution.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setToast({
        tone: "error",
        message: "Please fill out name, email, and message.",
      });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setToast({
        tone: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          institution: trimmedInstitution,
          message: trimmedMessage,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setToast({
          tone: "error",
          message: data?.error ?? "Failed to send message. Please try again.",
        });
        return;
      }

      setName("");
      setEmail("");
      setInstitution("");
      setMessage("");
      setToast({
        tone: "success",
        message: "Message sent — thanks for reaching out, I will get back to you as soon as possible!",
      });
    } catch {
      setToast({
        tone: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.row}>
          <label className={styles.field} htmlFor={`${formId}-name`}>
            <span className={styles.label}>Name</span>
            <input
              id={`${formId}-name`}
              className={styles.input}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label className={styles.field} htmlFor={`${formId}-email`}>
            <span className={styles.label}>Email</span>
            <input
              id={`${formId}-email`}
              className={styles.input}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>

        <label className={styles.field} htmlFor={`${formId}-institution`}>
          <span className={styles.label}>
            Institution / Company{" "}
            <span className={styles.optional}>(optional)</span>
          </span>
          <input
            id={`${formId}-institution`}
            className={styles.input}
            name="institution"
            type="text"
            autoComplete="organization"
            value={institution}
            onChange={(event) => setInstitution(event.target.value)}
          />
        </label>

        <label className={styles.field} htmlFor={`${formId}-message`}>
          <span className={styles.label}>Message</span>
          <textarea
            id={`${formId}-message`}
            className={cx(styles.input, styles.textarea)}
            name="message"
            required
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>

        <div className={styles.actions}>
          <Button type="submit" disabled={pending}>
            {pending ? "Sending…" : "Send"}
          </Button>
        </div>
      </form>

      {toast ? (
        <div
          className={cx(
            styles.toast,
            toast.tone === "success" ? styles.toastSuccess : styles.toastError,
          )}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      ) : null}
    </>
  );
}
