"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";

import { CURRENT_EXPERIENCE } from "@/lib/platform";
import { Logo } from "@/components/shared/Logo";
import { clearCurrentUser, clearToken, getCurrentUser } from "@/lib/auth";

const navigation = [
  {
    label: "Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Participants",
    href: "/admin/participants",
    icon: Upload,
  },
  {
    label: "Assignments",
    href: "/admin/assignments",
    icon: ClipboardList,
  },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentUser = getCurrentUser();

  const displayName =
    currentUser?.firstName || currentUser?.email || "Admin";

  const initials = (
    currentUser?.firstName?.[0] ?? currentUser?.email?.[0] ?? "A"
  ).toUpperCase();

  function logout() {
    clearToken();
    clearCurrentUser();
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f3f3f0] text-[#171717]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] border-r border-black/[0.08] bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex items-center justify-between border-b border-black/[0.08] px-6 py-5">
            <div className="flex items-center gap-3">
              <Logo href="/admin/dashboard" imageClassName="h-7" />
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-black lg:hidden"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Current experience */}
          <div className="mx-4 mt-5 border-b border-black/[0.08] pb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
              Current experience
            </p>

            <p className="mt-3 text-sm font-bold">
              {CURRENT_EXPERIENCE.name}
            </p>

            <p className="mt-1 text-xs leading-5 text-neutral-500">
              {CURRENT_EXPERIENCE.label}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
              Workspace
            </p>

            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 border-l-2 px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "border-[#e30613] bg-[#f7f7f5] text-black"
                        : "border-transparent text-neutral-500 hover:bg-neutral-50 hover:text-black"
                    }`}
                  >
                    <Icon className="h-[17px] w-[17px]" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-black/[0.08] p-4">
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 px-3 py-3 text-sm font-medium text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-black/[0.08] bg-[#f3f3f0]/95 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-neutral-600 transition hover:bg-white hover:text-black lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{displayName}</p>
              <p className="mt-0.5 text-xs text-neutral-500">
                {currentUser?.email ?? "Arravo Experience"}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
              {initials}
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}