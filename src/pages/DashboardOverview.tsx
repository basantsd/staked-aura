import { GlassCard } from "@/components/GlassCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TrendingUp, Coins, Lock, Vote } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const metrics = [
  { label: "Total Value Locked", value: 142500000, prefix: "$", suffix: "", decimals: 0, icon: TrendingUp, format: true },
  { label: "Total Staked", value: 89200000, prefix: "$", suffix: "", decimals: 0, icon: Coins, format: true },
  { label: "Your Stake", value: 24850, prefix: "$", suffix: "", decimals: 0, icon: Lock, format: false },
  { label: "Your Voting Power", value: 1.82, prefix: "", suffix: "%", decimals: 2, icon: Vote, format: false },
];

const chartData = [
  { month: "Jul", tvl: 82 }, { month: "Aug", tvl: 91 }, { month: "Sep", tvl: 88 },
  { month: "Oct", tvl: 105 }, { month: "Nov", tvl: 118 }, { month: "Dec", tvl: 112 },
  { month: "Jan", tvl: 126 }, { month: "Feb", tvl: 135 }, { month: "Mar", tvl: 142 },
];

function formatNumber(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toFixed(0);
}

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <GlassCard key={m.label} delay={i * 0.1} className="gradient-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-foreground">
                  {m.format ? (
                    <>{m.prefix}<AnimatedCounter end={m.value / 1e6} decimals={1} suffix="M" /></>
                  ) : (
                    <AnimatedCounter end={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} />
                  )}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <m.icon className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* TVL Chart */}
      <GlassCard delay={0.5} className="gradient-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Protocol TVL</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(258, 70%, 66%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="hsl(215, 20%, 40%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 20%, 40%)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}M`} />
              <Tooltip
                contentStyle={{
                  background: "hsl(222, 41%, 11%)",
                  border: "1px solid hsl(222, 30%, 22%)",
                  borderRadius: "12px",
                  color: "hsl(213, 31%, 91%)",
                }}
                formatter={(value: number) => [`$${value}M`, "TVL"]}
              />
              <Area type="monotone" dataKey="tvl" stroke="hsl(217, 91%, 60%)" strokeWidth={2} fill="url(#tvlGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
