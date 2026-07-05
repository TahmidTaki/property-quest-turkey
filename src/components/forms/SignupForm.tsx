"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { demoSignup } from "@/app/actions/auth";

export function SignupForm() {
  const [state, action, pending] = useActionState(demoSignup, {
    ok: false,
  } as { ok: boolean; error?: string });

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="label dark:text-dark-text" htmlFor="fullName">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          className="field dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
          placeholder="John Doe"
          autoComplete="name"
        />
      </div>

      <div>
        <label className="label dark:text-dark-text" htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="field dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
          placeholder="+90"
          autoComplete="tel"
        />
      </div>

      <div>
        <label className="label dark:text-dark-text" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="field dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
          placeholder="m@example.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label className="label dark:text-dark-text" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="field dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
          placeholder="Password"
          autoComplete="new-password"
        />
      </div>

      <div>
        <label className="label dark:text-dark-text" htmlFor="confirmPassword">
          Confirm
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="field dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
          placeholder="Confirm"
          autoComplete="new-password"
        />
      </div>

      {state?.error && <p className="text-sm text-red dark:text-red-400">{state.error}</p>}

      <button type="submit" disabled={pending} className="btn btn-primary w-full dark:bg-red dark:hover:bg-red-dark">
        {pending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Creating account…
          </>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
}