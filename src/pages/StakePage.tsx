import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Loader2, CheckCircle, Sparkles } from "lucide-react";

type StakeState = "idle" | "loading" | "success";

export default function StakePage() {
  const [amount, setAmount] = useState("");
  const [stakeState, setStakeState] = useState<StakeState>("idle");

  const handleStake = () => {
    if (!amount || Number(amount) <= 0) return;
    setStakeState("loading");
    setTimeout(() => setStakeState("success"), 2000);
    setTimeout(() => {
      setStakeState("idle");
      setAmount("");
    }, 4000);
  };

  const stakedPercent = 67.4;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-foreground"
      >
        Stake
      </motion.h1>

      {/* Staking Info */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard delay={0} className="gradient-border">
          <p className="text-sm text-muted-foreground">Your Staked Balance</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            <AnimatedCounter end={24850} prefix="$" suffix="" decimals={0} />
          </p>
        </GlassCard>
        <GlassCard delay={0.08} className="gradient-border">
          <p className="text-sm text-muted-foreground">Current APY</p>
          <p className="text-2xl font-bold gradient-text mt-1">
            <AnimatedCounter end={8.2} suffix="%" decimals={1} />
          </p>
        </GlassCard>
      </div>

      {/* Stake Card */}
      <GlassCard delay={0.16} className="gradient-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Stake Tokens</h2>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground text-lg focus:outline-none input-glow transition-all"
            />
            <button
              onClick={() => setAmount("10000")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold gradient-text hover:opacity-80 transition-opacity"
            >
              MAX
            </button>
          </div>

          <GradientButton
            className="w-full"
            onClick={handleStake}
            disabled={stakeState !== "idle" || !amount}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={stakeState}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {stakeState === "loading" && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
                {stakeState === "success" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                  </motion.span>
                )}
                {stakeState === "idle" && "Stake"}
                {stakeState === "loading" && "Staking..."}
                {stakeState === "success" && "Staked Successfully!"}
              </motion.span>
            </AnimatePresence>
          </GradientButton>

          <button className="w-full py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all text-sm font-medium">
            Unstake
          </button>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Staking Progress</span>
            <span>{stakedPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stakedPercent}%` }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
              className="h-full gradient-bg rounded-full relative"
            >
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-foreground border-2 border-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.8, type: "spring", stiffness: 300 }}
              />
            </motion.div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
