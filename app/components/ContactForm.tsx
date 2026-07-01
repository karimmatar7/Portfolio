"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

type ContactMessages = {
  contactTitle: string;
  contactIntro: string;
  contactNameLabel: string;
  contactEmailLabel: string;
  contactMessageLabel: string;
  contactButton: string;
  contactSuccess: string;
  contactError: string;
};

export function ContactForm({ messages }: { messages: ContactMessages }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formRef.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
        }
      )
      .then(
        () => {
          setStatus("success");
          formRef.current?.reset();
        },
        () => {
          setStatus("error");
        }
      );
  }

  return (
    <motion.section
      id="contact"
      className="space-y-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">
        {messages.contactTitle}
      </h2>
      <p className="text-sm sm:text-base text-slate-300 max-w-md">
        {messages.contactIntro}
      </p>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-200"
            htmlFor="name"
          >
            {messages.contactNameLabel}
          </label>
          <input
            id="name"
            name="name"
            className="w-full rounded-md border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm outline-none text-slate-100 focus:border-red-500"
            placeholder={messages.contactNameLabel}
            required
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-200"
            htmlFor="email"
          >
            {messages.contactEmailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-md border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm outline-none text-slate-100 focus:border-red-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-200"
            htmlFor="message"
          >
            {messages.contactMessageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-md border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm outline-none text-slate-100 focus:border-red-500 resize-none"
            placeholder={messages.contactMessageLabel}
            required
          />
        </div>

        <motion.button
          type="submit"
          className="inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-red-400 transition-colors disabled:opacity-60"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          disabled={status === "loading"}
        >
          {messages.contactButton}
        </motion.button>

        {status === "success" && (
          <p className="text-xs text-emerald-400 mt-2">
            {messages.contactSuccess}
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400 mt-2">
            {messages.contactError}
          </p>
        )}
      </motion.form>
    </motion.section>
  );
}