import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Field, Input, Button, Panel } from "../components/AdminUI";
import type { HeroStat } from "@/lib/queries";

export function SettingsManager() {
  const [stats, setStats] = useState<HeroStat[]>([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // load current settings on mount
  useEffect(() => {
    api.get<{ heroStats: HeroStat[] }>("/settings")
      .then((d) => setStats(d.heroStats))
      .catch((e) => setError(e.message));
  }, []);

  // update one field of one stat, leaving the rest untouched
  const updateStat = (index: number, field: keyof HeroStat, value: string) => {
    setStats((prev) =>
      prev.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat))
    );
  };

  const save = async () => {
    setError("");
    setSaved(false);
    try {
      await api.patch("/settings", { heroStats: stats }, true);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Site settings</h1>
      <p className="mt-2 text-sm text-ash">The four stats shown in your homepage hero.</p>

      <div className="mt-6 space-y-4">
        {stats.map((stat, i) => (
          <Panel key={i} className="grid gap-4 sm:grid-cols-4">
            <Field label="Label">
              <Input value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} />
            </Field>
            <Field label="Value">
              <Input value={stat.value} onChange={(e) => updateStat(i, "value", e.target.value)} />
            </Field>
            <Field label="Unit (optional)">
              <Input value={stat.unit} onChange={(e) => updateStat(i, "unit", e.target.value)} />
            </Field>
            <Field label="Tone">
              <select
                value={stat.tone}
                onChange={(e) => updateStat(i, "tone", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2.5 text-[15px] text-bone outline-none focus:border-electric"
              >
                <option value="cyan">Cyan</option>
                <option value="ember">Ember</option>
              </select>
            </Field>
          </Panel>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-ember">{error}</p>}
      {saved && <p className="mt-4 text-sm text-cyan">Saved ✓</p>}
      <Button onClick={save} className="mt-6">Save settings</Button>
    </div>
  );
}