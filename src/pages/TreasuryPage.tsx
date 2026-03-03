import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Landmark, ArrowUpRight, ArrowDownLeft, Filter } from "lucide-react";

const transactions = [
  { id: 1, type: "Inflow", desc: "Staking fees collected", amount: "+$42,350", date: "2026-03-02", category: "Revenue" },
  { id: 2, type: "Outflow", desc: "Team compensation Q1", amount: "-$125,000", date: "2026-03-01", category: "Operations" },
  { id: 3, type: "Inflow", desc: "Protocol revenue share", amount: "+$87,200", date: "2026-02-28", category: "Revenue" },
  { id: 4, type: "Outflow", desc: "Security audit payment", amount: "-$45,000", date: "2026-02-25", category: "Security" },
  { id: 5, type: "Inflow", desc: "Liquidation penalties", amount: "+$18,400", date: "2026-02-23", category: "Revenue" },
  { id: 6, type: "Outflow", desc: "Marketing campaign", amount: "-$32,000", date: "2026-02-20", category: "Marketing" },
];

export default function TreasuryPage() {
  const [filter, setFilter] = useState<"All" | "Inflow" | "Outflow">("All");

  const filtered = filter === "All" ? transactions : transactions.filter((t) => t.type === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Treasury</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard delay={0} className="gradient-border text-center">
          <Landmark className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <p className="text-2xl font-bold gradient-text mt-1">
            <AnimatedCounter end={18.4} prefix="$" suffix="M" decimals={1} />
          </p>
        </GlassCard>
        <GlassCard delay={0.1} className="gradient-border text-center">
          <ArrowUpRight className="w-8 h-8 text-success mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Monthly Inflow</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            <AnimatedCounter end={147.9} prefix="$" suffix="K" decimals={1} />
          </p>
        </GlassCard>
        <GlassCard delay={0.2} className="gradient-border text-center">
          <ArrowDownLeft className="w-8 h-8 text-destructive mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Monthly Outflow</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            <AnimatedCounter end={202} prefix="$" suffix="K" decimals={0} />
          </p>
        </GlassCard>
      </div>

      {/* Transaction History */}
      <GlassCard delay={0.3} className="gradient-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
          <div className="flex gap-2">
            {(["All", "Inflow", "Outflow"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filter === f
                    ? "gradient-bg text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-3 font-medium">Date</th>
                <th className="text-left py-3 font-medium">Description</th>
                <th className="text-left py-3 font-medium">Category</th>
                <th className="text-right py-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-3 text-muted-foreground">{t.date}</td>
                  <td className="py-3 text-foreground">{t.desc}</td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {t.category}
                    </span>
                  </td>
                  <td className={`py-3 text-right font-medium ${t.type === "Inflow" ? "text-success" : "text-destructive"}`}>
                    {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
