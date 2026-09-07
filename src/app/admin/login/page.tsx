"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/shared/Logo";
import { Input } from "@/components/shared/Input";
import Button from "@/components/shared/Button";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email && password) {
      sessionStorage.setItem("mosaic_admin", "true");
      router.push("/admin/dashboard");
    }
  }

  return (
    <main className="grid min-h-screen bg-[#f3f3f0] lg:grid-cols-[0.9fr_1.1fr]">
      {/* Brand panel */}
      <section className="relative hidden overflow-hidden bg-black p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#e30613]" />

        <div className="relative">
          <div className="inline-flex rounded-xl bg-white px-3.5 py-2 shadow-sm">
            <Logo href="/" imageClassName="h-7" />
          </div>
        </div>

        <div className="relative max-w-md">
          <p className="text-sm font-medium text-neutral-400">
            Arravo Experience
          </p>

          <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.06em]">
            The work behind
            <br />
            the experience.
          </h1>

          <p className="mt-6 max-w-sm text-sm leading-6 text-neutral-400">
            Manage participants, review allocations and prepare the next
            Arravo experience.
          </p>
        </div>

        <p className="relative text-xs text-neutral-500">
          Internal workspace · Arravo
        </p>
      </section>

      {/* Form panel */}
      <section className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-[420px]">
          <div className="lg:hidden">
            <Logo href="/" />
          </div>

          <div className="mt-14 lg:mt-0">
            <p className="text-sm font-medium text-[#e30613]">
              Admin workspace
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.06em]">
              Welcome back.
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Sign in to manage the Arravo Mosaic experience.
            </p>
          </div>

          <form onSubmit={submit} className="mt-9 space-y-5">
            <Input
              id="email"
              label="Company email"
              type="email"
              placeholder="admin@arravo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <Input
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <Button type="submit" className="w-full">
              <span>Sign in</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="pt-2 text-center text-xs leading-5 text-neutral-400">
              Frontend demo. Real authentication will be connected to the
              backend.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}