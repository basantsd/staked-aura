import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GradientButton } from "@/components/GradientButton";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Shield, Layers, Vote, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";

function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -25, 12, 0],
        x: [0, 8, -6, 0],
        rotate: [0, 6, -4, 0],
        scale: [1, 1.05, 0.97, 1],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute rounded-3xl gradient-bg blur-3xl ${className}`}
    />
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.3 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(217, 91%, 70%, ${p.o})`;
        ctx.fill();
      }
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(217, 91%, 60%, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { icon: Shield, title: "Secure Staking", desc: "Stake your assets with battle-tested smart contracts" },
    { icon: TrendingUp, title: "Earn Yield", desc: "Competitive APY on your staked tokens" },
    { icon: Vote, title: "Governance", desc: "Vote on proposals and shape the protocol" },
    { icon: Layers, title: "Treasury", desc: "Transparent on-chain treasury management" },
  ];

  const stats = [
    { label: "Total Value Locked", end: 142, suffix: "M", prefix: "$", decimals: 0 },
    { label: "Stakers", end: 12483, suffix: "", prefix: "", decimals: 0 },
    { label: "Avg. APY", end: 8.2, suffix: "%", prefix: "", decimals: 1 },
    { label: "Proposals Passed", end: 247, suffix: "", prefix: "", decimals: 0 },
  ];

  return (
    <div className="min-h-screen animated-bg relative overflow-hidden">
      <ParticleField />

      {/* Floating shapes */}
      <FloatingShape className="w-80 h-80 top-16 -left-24 opacity-20" delay={0} />
      <FloatingShape className="w-[28rem] h-[28rem] top-32 right-[-6rem] opacity-[0.12]" delay={2} />
      <FloatingShape className="w-64 h-64 bottom-24 left-1/3 opacity-[0.08]" delay={4} />

      {/* Hero glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" />

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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl mx-auto">
            <span className="gradient-text">Secure DeFi Staking</span>
            <br />
            <span className="text-foreground">& Governance Protocol</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          Earn yield on your assets while participating in on-chain governance. 
          Transparent, decentralized, and community-driven.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex gap-4"
        >
          <GradientButton size="lg" onClick={() => navigate("/dashboard")}>
            Launch App →
          </GradientButton>
        </motion.div>

        {/* Stats with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">
                <AnimatedCounter end={stat.end} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} duration={2500} />
              </div>
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
              transition={{ duration: 0.5, delay: 0.8 + i * 0.12 }}
              whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.25 } }}
              className="glass-card-hover shine-on-hover p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4 pulse-glow">
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
