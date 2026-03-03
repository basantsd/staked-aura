import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  return { h, m, s };
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-14 glass-card rounded-lg flex items-center justify-center overflow-hidden">
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-2xl font-bold font-mono text-foreground"
        >
          {value.toString().padStart(2, "0")}
        </motion.span>
      </div>
      <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function RewardsPage() {
  const { h, m, s } = useCountdown(7245);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-foreground"
      >
        Rewards
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard delay={0} className="gradient-border text-center">
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-3 pulse-glow">
            <Gift className="w-7 h-7 text-primary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Claimable Rewards</p>
          <p className="text-4xl font-bold gradient-text">
            <AnimatedCounter end={487.32} prefix="$" decimals={2} />
          </p>
          <GradientButton className="w-full mt-4" size="md">
            Claim Rewards
          </GradientButton>
        </GlassCard>

        <GlassCard delay={0.08} className="gradient-border text-center">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-3">
            <Clock className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">Next Reward In</p>
          <div className="flex items-center justify-center gap-2">
            <FlipUnit value={h} label="hrs" />
            <span className="text-xl font-bold text-muted-foreground mt-[-1rem]">:</span>
            <FlipUnit value={m} label="min" />
            <span className="text-xl font-bold text-muted-foreground mt-[-1rem]">:</span>
            <FlipUnit value={s} label="sec" />
          </div>
          <p className="text-sm text-muted-foreground mt-4">Auto-compounding enabled</p>
        </GlassCard>
      </div>

      {/* Reward History */}
      <GlassCard delay={0.16} className="gradient-border">
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
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-default"
                >
                  <td className="py-3 text-foreground">{r.date}</td>
                  <td className="py-3 text-muted-foreground">{r.type}</td>
                  <td className="py-3 text-right font-medium gradient-text">${r.amount}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
