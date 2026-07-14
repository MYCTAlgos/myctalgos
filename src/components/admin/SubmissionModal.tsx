"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { STAGES, stageIndex } from "@/lib/client-status";
import type { ContactSubmission, DiscoverySubmission } from "@/types/submissions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function initials(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

type UpdateStatusAction = (
  id: string,
  status: string,
  statusNotes: string
) => Promise<{ ok: boolean; error?: string }>;

type Props =
  | { type: "contact"; item: ContactSubmission; onClose: () => void }
  | {
      type: "discovery";
      item: DiscoverySubmission;
      onClose: () => void;
      updateStatusAction: UpdateStatusAction;
    };

export function SubmissionModal(props: Props) {
  const { onClose } = props;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-navy-950/80 p-3 backdrop-blur-sm sm:p-6 lg:p-10"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-6xl flex-col rounded-2xl border border-white/10 bg-navy-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-14">
          {props.type === "contact" ? (
            <ContactDetail item={props.item} />
          ) : (
            <DiscoveryDetail
              item={props.item}
              updateStatusAction={props.updateStatusAction}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ContactDetail({ item: c }: { item: ContactSubmission }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 font-mono text-lg font-semibold text-white">
          {initials(c.name)}
        </div>
        <div>
          <p className="text-xl font-medium text-white">{c.name}</p>
          <p className="text-sm text-white/50">{c.email}</p>
        </div>
      </div>
      <p className="mb-6 font-mono text-xs text-white/30">
        Received {formatDate(c.created_at)}
      </p>
      {c.interest && (
        <span className="mb-4 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 font-mono text-xs text-sky-300">
          {c.interest}
        </span>
      )}
      <p className="whitespace-pre-line text-base leading-relaxed text-white/70">
        {c.message}
      </p>
    </div>
  );
}

function DiscoveryDetail({
  item: d,
  updateStatusAction,
}: {
  item: DiscoverySubmission;
  updateStatusAction: UpdateStatusAction;
}) {
  const [draftStatus, setDraftStatus] = useState(d.status);
  const [draftNotes, setDraftNotes] = useState(d.status_notes ?? "");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const isDirty =
    draftStatus !== d.status || draftNotes !== (d.status_notes ?? "");

  async function handleSave() {
    setSaving(true);
    setSavedMsg(null);
    const result = await updateStatusAction(d.id, draftStatus, draftNotes);
    setSaving(false);
    setSavedMsg(result.ok ? "Saved" : result.error || "Failed to save");
  }

  return (
    <div className="lg:grid lg:grid-cols-[1fr_1.15fr] lg:gap-14">
      <div>
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 font-mono text-lg font-semibold text-white">
            {initials(d.name)}
          </div>
          <div>
            <p className="text-xl font-medium text-white">
              {d.name}{" "}
              <span className="font-normal text-white/40">
                &middot; {d.business_name}
              </span>
            </p>
            <p className="text-sm text-white/50">
              {d.email}
              {d.phone ? ` · ${d.phone}` : ""}
            </p>
          </div>
        </div>
        <p className="mb-8 font-mono text-xs text-white/30">
          Submitted {formatDate(d.created_at)}
        </p>

        <div className="rounded-xl border border-white/10 bg-navy-950/50 p-6">
          <h3 className="mb-6 text-xs font-medium uppercase tracking-wider text-white/40">
            Project Roadmap
          </h3>
          <RoadmapStepper draft={draftStatus} onSelect={setDraftStatus} />

          <label className="mb-2 mt-8 block text-xs font-medium uppercase tracking-wider text-white/40">
            Internal Notes
          </label>
          <textarea
            value={draftNotes}
            onChange={(e) => setDraftNotes(e.target.value)}
            rows={5}
            placeholder="Where things stand, next steps, blockers..."
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-blue-400"
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || saving}
              className="rounded-full bg-gradient-to-r from-blue-600 to-sky-400 px-5 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            {savedMsg && (
              <span className="text-xs text-white/50">{savedMsg}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 lg:mt-0">
        <div className="mb-6 grid gap-5 text-sm sm:grid-cols-2">
          <Field label="Industry" value={d.industry} />
          <Field label="Business Type" value={d.business_type} />
          <Field label="Years Operating" value={d.years_operating} />
          <Field label="Audience" value={d.audience} />
          <Field label="Budget" value={d.budget} />
          <Field label="Timeline" value={d.timeline} />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {d.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 font-mono text-xs text-sky-300"
            >
              {interest}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 text-sm leading-relaxed text-white/60">
          {d.learn_topics && d.learn_topics.length > 0 && (
            <p>
              <span className="text-white/30">Learn topics: </span>
              {d.learn_topics.join(", ")}
              {d.learn_other ? `, ${d.learn_other}` : ""}
            </p>
          )}
          {d.build_services && d.build_services.length > 0 && (
            <p>
              <span className="text-white/30">Build services: </span>
              {d.build_services.join(", ")}
            </p>
          )}
          {d.build_details && (
            <p>
              <span className="text-white/30">Build details: </span>
              {d.build_details}
            </p>
          )}
          {d.scale_features && d.scale_features.length > 0 && (
            <p>
              <span className="text-white/30">Scale features: </span>
              {d.scale_features.join(", ")}
              {d.scale_other ? `, ${d.scale_other}` : ""}
            </p>
          )}
          {d.referral_source && (
            <p>
              <span className="text-white/30">Heard about us: </span>
              {d.referral_source}
            </p>
          )}
          {d.message && (
            <p className="mt-2 whitespace-pre-line text-white/70">
              {d.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-white/30">{label}</p>
      <p className="text-white/80">{value}</p>
    </div>
  );
}

function RoadmapStepper({
  draft,
  onSelect,
}: {
  draft: string;
  onSelect: (value: string) => void;
}) {
  const idx = stageIndex(draft);
  const pct = STAGES.length <= 1 ? 0 : (idx / (STAGES.length - 1)) * 100;

  return (
    <div className="relative pt-1">
      <div className="absolute left-[18px] right-[18px] top-[19px] h-0.5 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="relative flex justify-between">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const reached = i <= idx;
          return (
            <button
              key={stage.value}
              type="button"
              onClick={() => onSelect(stage.value)}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                  reached
                    ? "border-blue-400 bg-blue-500/20 text-sky-300"
                    : "border-white/15 bg-navy-900 text-white/30"
                }`}
              >
                <Icon size={15} />
              </span>
              <span
                className={`max-w-[4.5rem] text-center text-[10px] leading-tight ${
                  i === idx ? "text-white" : "text-white/40"
                }`}
              >
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
