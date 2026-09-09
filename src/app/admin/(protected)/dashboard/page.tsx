"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Download,
  Users,
} from "lucide-react";

import { Container } from "@/components/shared/Container";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CURRENT_EXPERIENCE, PLATFORM } from "@/lib/platform";
import { ApiError } from "@/lib/api";
import { fetchZoneDistribution } from "@/lib/staff";

type ZoneStat = { zone: string; zoneDisplay: string; count: number };

export default function DashboardPage() {
  const [zones, setZones] = useState<ZoneStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchZoneDistribution()
      .then(setZones)
      .catch((err) => {
        setError(
          err instanceof ApiError
            ? err.message
            : "Could not load zone distribution."
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  const total = zones.reduce((sum, zone) => sum + zone.count, 0);
  const zonesInUse = zones.filter((zone) => zone.count > 0).length;

  const stats = [
    {
      label: "People taking part",
      value: total,
      note: "Total participants",
    },
    {
      label: "Zones in use",
      value: zonesInUse,
      note: `Out of ${zones.length || 4} zones`,
    },
  ];

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold text-tomato-600">
            {PLATFORM.name}
          </p>

          <h1 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.055em] text-neutral-950 sm:text-5xl">
            Here’s how things are going.
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            {CURRENT_EXPERIENCE.name} · {CURRENT_EXPERIENCE.label}
          </p>
        </div>

        <StatusBadge tone="success">● LIVE</StatusBadge>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[22px] bg-white px-5 py-6 shadow-[0_2px_14px_rgba(20,20,20,0.035)]"
          >
            <p className="text-sm font-medium text-neutral-500">
              {stat.label}
            </p>

            <p className="mt-5 text-4xl font-black tracking-[-0.06em] text-neutral-950">
              {stat.value}
            </p>

            <p className="mt-2 text-xs text-neutral-400">
              {stat.note}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-[22px] bg-white p-6 shadow-[0_2px_14px_rgba(20,20,20,0.035)] sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-neutral-950">
                Zone distribution
              </p>

              <p className="mt-1 text-sm text-neutral-500">
                How participants are spread across the four zones.
              </p>
            </div>

            <span className="text-sm font-semibold text-neutral-400">
              {total} total
            </span>
          </div>

          <div className="mt-8 space-y-5">
            {isLoading && (
              <p className="text-sm text-neutral-500">Loading...</p>
            )}

            {!isLoading && error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {!isLoading &&
              !error &&
              zones.map((zone) => (
                <div key={zone.zone}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-neutral-800">
                      {zone.zoneDisplay}
                    </span>

                    <span className="text-neutral-500">
                      {zone.count}
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-neutral-950"
                      style={{
                        width: `${total ? (zone.count / total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="rounded-[22px] bg-neutral-950 p-6 text-white sm:p-7">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Current experience
              </p>

              <p className="mt-2 text-xs text-neutral-500">
                {CURRENT_EXPERIENCE.label}
              </p>
            </div>

            <span className="h-2 w-2 rounded-full bg-tomato-500" />
          </div>

          <h2 className="mt-12 text-3xl font-black tracking-[-0.055em]">
            {CURRENT_EXPERIENCE.name}
          </h2>

          <p className="mt-3 text-sm leading-6 text-neutral-400">
            {CURRENT_EXPERIENCE.description}
          </p>

          <Link
            href="/admin/assignments"
            className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-semibold transition hover:text-tomato-400"
          >
            View assignments
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>

      <section className="mt-8">
        <div className="mb-4">
          <p className="text-sm font-semibold text-neutral-950">
            Quick actions
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            Get to the things you use most.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/admin/participants"
            className="group flex items-center justify-between rounded-[18px] bg-white px-5 py-5 shadow-[0_2px_14px_rgba(20,20,20,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,20,20,0.06)]"
          >
            <span className="flex items-center gap-3 text-sm font-semibold">
              <Users className="h-4 w-4 text-neutral-400" />
              View participants
            </span>

            <ArrowRight className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-1" />
          </Link>

          <Link
            href="/admin/assignments"
            className="group flex items-center justify-between rounded-[18px] bg-white px-5 py-5 shadow-[0_2px_14px_rgba(20,20,20,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,20,20,0.06)]"
          >
            <span className="flex items-center gap-3 text-sm font-semibold">
              <ClipboardList className="h-4 w-4 text-neutral-400" />
              Check assignments
            </span>

            <ArrowRight className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-1" />
          </Link>

          <Link
            href="/admin/assignments"
            className="group flex items-center justify-between rounded-[18px] bg-white px-5 py-5 shadow-[0_2px_14px_rgba(20,20,20,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,20,20,0.06)]"
          >
            <span className="flex items-center gap-3 text-sm font-semibold">
              <Download className="h-4 w-4 text-neutral-400" />
              Download the list
            </span>

            <ArrowRight className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </Container>
  );
}
