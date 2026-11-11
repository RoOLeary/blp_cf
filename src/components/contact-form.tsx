"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { sendContact, type ContactState } from "@/actions/contact";
import { Link } from "@/i18n/navigation";

const inputClass =
  "w-full border-b-2 border-white bg-transparent px-0 py-2 placeholder-white/50 focus:border-black focus:outline-none";

const labelClass = "mb-2 block text-sm tracking-widest uppercase";

const initialState: ContactState = { success: false };

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  if (state.success) {
    return (
      <div role="status" className="self-center">
        <p className="mb-4 text-4xl font-bold tracking-tighter uppercase">
          {t("form.successTitle")}
        </p>
        <p className="text-xl">
          {t("form.successBody")}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelClass}>
          {t("form.name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          defaultValue={state.values?.name}
          placeholder={t("form.namePlaceholder")}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          {t("form.email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={state.values?.email}
          placeholder={t("form.emailPlaceholder")}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          {t("form.message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          minLength={10}
          defaultValue={state.values?.message}
          placeholder={t("form.messagePlaceholder")}
          className={inputClass}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          required
          className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none border-2 border-white bg-transparent transition-colors checked:border-black checked:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        />
        <label htmlFor="acceptTerms" className="cursor-pointer text-sm">
          {t.rich("form.consent", {
            link: (chunks) => (
              <Link
                href="/privacy-policy"
                className="underline underline-offset-4 hover:text-black"
              >
                {chunks}
              </Link>
            ),
          })}
        </label>
      </div>

      {state.errors && (
        <ul role="alert" className="space-y-1 border-l-4 border-black pl-4 text-sm font-bold">
          {state.errors.map((error) => (
            <li key={error}>{t(`errors.${error}`)}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-8 bg-black px-8 py-3 text-sm tracking-widest text-white uppercase transition-colors hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-black disabled:hover:text-white"
      >
        {pending ? t("form.sending") : t("form.submit")}
      </button>
    </form>
  );
}
