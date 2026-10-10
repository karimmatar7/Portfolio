"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { profile } from "@/app/content/site";
import { cx } from "@/app/lib/cx";
import { EASE } from "@/app/lib/motion";
import { useLocale } from "./LocaleProvider";
import { ArrowRight, ArrowUpRight, BrandIcon, CheckIcon, type BrandIcon as BrandIconName } from "./Icons";
import { Reveal } from "./ui/Reveal";
import { Rule, SectionHeading } from "./ui/SectionHeading";

type Status = "idle" | "loading" | "success" | "error";

type FieldId = "name" | "email" | "message";

type Errors = Partial<Record<FieldId, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD_ORDER: FieldId[] = ["name", "email", "message"];

export function Contact() {
  const { t, axis } = useLocale();
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement | null>(null);
  const fieldRefs = useRef<Partial<Record<FieldId, HTMLElement | null>>>({});
  const successRef = useRef<HTMLParagraphElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const copy = t.contact;

  const fieldVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.55, ease: EASE },
    },
  };

  function readErrors(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Errors = {};

    if (!name) next.name = copy.required;
    if (!email) next.email = copy.required;
    else if (!EMAIL_PATTERN.test(email)) next.email = copy.invalidEmail;
    if (!message) next.message = copy.required;

    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form || status === "loading") return;

    const nextErrors = readErrors(form);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((id) => nextErrors[id]);
    if (firstInvalid) {
      setStatus("idle");
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setStatus("loading");

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        form,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "" }
      )
      .then(
        () => {
          form.reset();
          setErrors({});
          setStatus("success");
        },
        () => setStatus("error")
      );
  }

  /** Re-checks one field while typing so a message clears as soon as it is fixed. */
  function handleChange(id: FieldId) {
    if (!errors[id]) return;
    const form = formRef.current;
    if (!form) return;
    const updated = readErrors(form);
    setErrors((prev) => ({ ...prev, [id]: updated[id] }));
  }

  function handleSendAnother() {
    setStatus("idle");
    fieldRefs.current.name?.focus();
  }

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const fieldClass =
    "w-full border-b border-rule bg-transparent py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-ink aria-[invalid=true]:border-accent";

  const labelClass = "block text-sm font-medium text-ink";

  const errorClass = "text-sm text-accent-ink";

  return (
    <section id="contact" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
        <Rule className="mt-10" />

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:gap-24">
          <div>
            <Reveal>
              <p className="max-w-md text-base leading-relaxed text-ink-soft">
                {copy.intro}
              </p>
            </Reveal>

            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              aria-busy={status === "loading"}
              className="mt-10 max-w-md space-y-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              <p
                ref={successRef}
                tabIndex={-1}
                role="status"
                className={cx(
                  "flex items-start gap-2 text-sm outline-none",
                  status === "success" ? "text-ink" : "sr-only"
                )}
              >
                {status === "success" ? (
                  <>
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {copy.success}
                  </>
                ) : null}
              </p>

              <p
                role="alert"
                className={cx(
                  "text-sm leading-relaxed text-accent-ink",
                  status === "error" ? "block" : "sr-only"
                )}
              >
                {status === "error" ? copy.error : ""}
              </p>

              <motion.div className="space-y-2" variants={fieldVariants}>
                <label htmlFor="name" className={labelClass}>
                  {copy.nameLabel}
                </label>
                <input
                  ref={(node) => {
                    fieldRefs.current.name = node;
                  }}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  placeholder={copy.namePlaceholder}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  onChange={() => handleChange("name")}
                  className={fieldClass}
                />
                {errors.name ? (
                  <p id="name-error" className={errorClass}>
                    {errors.name}
                  </p>
                ) : null}
              </motion.div>

              <motion.div className="space-y-2" variants={fieldVariants}>
                <label htmlFor="email" className={labelClass}>
                  {copy.emailLabel}
                </label>
                <input
                  ref={(node) => {
                    fieldRefs.current.email = node;
                  }}
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={120}
                  placeholder={copy.emailPlaceholder}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={() => handleChange("email")}
                  className={cx(fieldClass, "rtl:text-right")}
                />
                {errors.email ? (
                  <p id="email-error" className={errorClass}>
                    {errors.email}
                  </p>
                ) : null}
              </motion.div>

              <motion.div className="space-y-2" variants={fieldVariants}>
                <label htmlFor="message" className={labelClass}>
                  {copy.messageLabel}
                </label>
                <textarea
                  ref={(node) => {
                    fieldRefs.current.message = node;
                  }}
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={2000}
                  placeholder={copy.messagePlaceholder}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error message-hint" : "message-hint"
                  }
                  onChange={() => handleChange("message")}
                  className={cx(fieldClass, "resize-y")}
                />
                {errors.message ? (
                  <p id="message-error" className={errorClass}>
                    {errors.message}
                  </p>
                ) : (
                  <p id="message-hint" className="text-xs text-ink-mute">
                    {copy.messageHint}
                  </p>
                )}
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-4 pt-1"
                variants={fieldVariants}
              >
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                  className="group inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent disabled:cursor-wait disabled:opacity-70"
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                >
                  {status === "loading" ? (
                    <>
                      {copy.sending}
                      <motion.span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-full border border-paper/40 border-t-paper"
                        animate={reduce ? undefined : { rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                    </>
                  ) : (
                    <>
                      {copy.button}
                      <ArrowRight
                        className={cx(
                          "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1",
                          axis === -1 && "rotate-180"
                        )}
                      />
                    </>
                  )}
                </motion.button>

                {status === "success" ? (
                  <button
                    type="button"
                    onClick={handleSendAnother}
                    className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {copy.sendAnother}
                  </button>
                ) : null}
              </motion.div>
            </motion.form>
          </div>

          <Reveal delay={0.1}>
            <div>
              <h3 className="meta text-ink-mute">{copy.socialTitle}</h3>
              <ul className="mt-6 border-b border-rule">
                {profile.socials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4 border-t border-rule py-4 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <BrandIcon
                          name={social.id as BrandIconName}
                          className="h-4 w-4 text-ink-mute transition-colors duration-300 group-hover:text-accent"
                        />
                        <span className="text-sm text-ink">{social.name}</span>
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="meta hidden text-ink-mute sm:inline">
                          {social.handle}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}