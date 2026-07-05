"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { demoLogin } from "@/app/actions/auth";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(demoLogin, {
    ok: false,
  } as { ok: boolean; error?: string });

  return (
    <form action={action} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}

      <div>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="field"
          placeholder="you@email.com"
          autoComplete="email"
        />
      </div>

      {state?.error && <p className="text-sm text-red">{state.error}</p>}

      <button type="submit" disabled={pending} className="btn btn-primary w-full">
        {pending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Logging in…
          </>
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
}
