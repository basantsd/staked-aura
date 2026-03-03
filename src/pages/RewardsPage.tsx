import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Gift, Clock } from "lucide-react";

const rewardHistory = [
  { date: "2026-03-01", amount: "124.50", type: "Staking Reward" },
  { date: "2026-02-28", amount: "118.30", type: "Staking Reward" },
  { date: "2026-02-25", amount: "132.10", type: "Governance Bonus" },
  { date: "2026-02-22", amount: "115.80", type: "Staking Reward" },
  { date: "2026-02-19", amount: "121.40", type: "Staking Reward" },
];

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => (prev <= 0 ? seconds : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function RewardsPage() {
  const countdown = useCountdown(7245);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground">Rewards</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard delay={0} className="gradient-border text-center">
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-3 pulse-glow">
            <Gift className="w-7 h-7 text-primary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Claimable Rewards</p>
          <p className="text-3xl font-bold gradient-text">
            <AnimatedCounter end={487.32} prefix="$" decimals={2} />
          </p>
          <GradientButton className="w-full mt-4" size="md">
            Claim Rewards
          </GradientButton>
        </GlassCard>

        <GlassCard delay={0.1} className="gradient-border text-center">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-3">
            <Clock className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Next Reward In</p>
          <p className="text-3xl font-bold font-mono text-foreground">{countdown}</p>
          <p className="text-sm text-muted-foreground mt-4">Auto-compounding enabled</p>
        </GlassCard>
      </div>

      {/* Reward History */}
      <GlassCard delay={0.2} className="gradient-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Reward History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-3 font-medium">Date</th>
                <th className="text-left py-3 font-medium">Type</th>
                <th className="text-right py-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rewardHistory.map((r, i) => (
                <tr
                  key={i}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-default"
                >
                  <td className="py-3 text-foreground">{r.date}</td>
                  <td className="py-3 text-muted-foreground">{r.type}</td>
                  <td className="py-3 text-right font-medium gradient-text">${r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
