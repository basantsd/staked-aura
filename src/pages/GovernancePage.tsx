import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Vote, Clock, Plus, X } from "lucide-react";

const proposals = [
  { id: 1, title: "Increase staking rewards to 9.5% APY", desc: "Proposal to adjust the reward rate for stakers in light of increased protocol revenue.", yes: 72, no: 28, timeLeft: "2d 14h", status: "Active" },
  { id: 2, title: "Treasury diversification into stablecoins", desc: "Allocate 20% of treasury to USDC and DAI for protocol stability.", yes: 85, no: 15, timeLeft: "5d 8h", status: "Active" },
  { id: 3, title: "Add ETH/ARB liquidity pool", desc: "Launch a new liquidity pool on Arbitrum to capture L2 growth.", yes: 64, no: 36, timeLeft: "1d 3h", status: "Active" },
  { id: 4, title: "Governance token buyback program", desc: "Use protocol revenue to buy back and burn governance tokens quarterly.", yes: 91, no: 9, timeLeft: "Ended", status: "Passed" },
];

export default function GovernancePage() {
  const [votingModal, setVotingModal] = useState<number | null>(null);
  const [createModal, setCreateModal] = useState(false);

  const selected = proposals.find((p) => p.id === votingModal);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-foreground"
        >
          Governance
        </motion.h1>
        <GradientButton size="sm" onClick={() => setCreateModal(true)}>
          <Plus className="w-4 h-4 mr-1 inline" /> Create Proposal
        </GradientButton>
      </div>

      {/* Delegation Card */}
      <GlassCard delay={0} className="gradient-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Your Voting Power</p>
            <p className="text-2xl font-bold gradient-text">
              <AnimatedCounter end={1.82} suffix="%" decimals={2} />
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
              Delegate to Self
            </button>
            <button className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
              Delegate to Address
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Proposals */}
      <div className="space-y-4">
        {proposals.map((p, i) => (
          <GlassCard key={p.id} delay={0.08 + i * 0.08} className="gradient-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    p.status === "Active"
                      ? "bg-success/20 text-success badge-pulse"
                      : "bg-primary/20 text-primary"
                  }`}>
                    {p.status}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {p.timeLeft}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>

                {/* Vote bar */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.yes}%` }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="h-full gradient-bg rounded-full"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-24 text-right">
                    <AnimatedCounter end={p.yes} suffix="% Yes" decimals={0} duration={1200} />
                  </span>
                </div>
              </div>

              {p.status === "Active" && (
                <GradientButton size="sm" onClick={() => setVotingModal(p.id)}>
                  <Vote className="w-4 h-4 mr-1 inline" /> Vote
                </GradientButton>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Voting Modal */}
      <AnimatePresence>
        {votingModal !== null && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
            onClick={() => setVotingModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="glass-card gradient-border p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Cast Your Vote</h2>
                <button onClick={() => setVotingModal(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{selected.title}</p>
              <p className="text-sm text-muted-foreground mb-6">Your voting power: <span className="gradient-text font-semibold">1.82%</span></p>

              <div className="flex gap-3">
                <GradientButton className="flex-1" onClick={() => setVotingModal(null)}>
                  Vote YES
                </GradientButton>
                <button
                  onClick={() => setVotingModal(null)}
                  className="flex-1 py-3 rounded-xl border border-destructive/50 text-destructive hover:bg-destructive/10 transition-all font-medium"
                >
                  Vote NO
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Proposal Modal */}
      <AnimatePresence>
        {createModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
            onClick={() => setCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="glass-card gradient-border p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Create Proposal</h2>
                <button onClick={() => setCreateModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  placeholder="Proposal Title"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none input-glow transition-all"
                />
                <textarea
                  placeholder="Description"
                  rows={4}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none input-glow transition-all resize-none"
                />
                <input
                  placeholder="Action Target Address"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none input-glow transition-all"
                />
                <GradientButton className="w-full" onClick={() => setCreateModal(false)}>
                  Submit Proposal
                </GradientButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
