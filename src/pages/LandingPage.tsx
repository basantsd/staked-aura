import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GradientButton } from "@/components/GradientButton";
import { Shield, Layers, Vote, TrendingUp } from "lucide-react";

function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 10, 0],
        rotate: [0, 5, -3, 0],
        opacity: [0.3, 0.6, 0.4, 0.3],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute rounded-3xl gradient-bg blur-2xl ${className}`}
    />
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { icon: Shield, title: "Secure Staking", desc: "Stake your assets with battle-tested smart contracts" },
    { icon: TrendingUp, title: "Earn Yield", desc: "Competitive APY on your staked tokens" },
    { icon: Vote, title: "Governance", desc: "Vote on proposals and shape the protocol" },
    { icon: Layers, title: "Treasury", desc: "Transparent on-chain treasury management" },
  ];

  return (
    <div className="min-h-screen animated-bg relative overflow-hidden">
      {/* Floating shapes */}
      <FloatingShape className="w-72 h-72 top-20 -left-20 opacity-20" delay={0} />
      <FloatingShape className="w-96 h-96 top-40 right-[-5rem] opacity-15" delay={2} />
      <FloatingShape className="w-60 h-60 bottom-32 left-1/3 opacity-10" delay={4} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">NexusDAO</span>
        </div>
        <GradientButton size="sm" onClick={() => navigate("/dashboard")}>
          Launch App
        </GradientButton>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl mx-auto">
            <span className="gradient-text">Secure DeFi Staking</span>
            <br />
            <span className="text-foreground">& Governance Protocol</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          Earn yield on your assets while participating in on-chain governance. 
          Transparent, decentralized, and community-driven.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex gap-4"
        >
          <GradientButton size="lg" onClick={() => navigate("/dashboard")}>
            Launch App →
          </GradientButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
        >
          {[
            { label: "Total Value Locked", value: "$142M" },
            { label: "Stakers", value: "12,483" },
            { label: "Avg. APY", value: "8.2%" },
            { label: "Proposals Passed", value: "247" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 md:px-12 pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              className="glass-card-hover p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
