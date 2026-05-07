import * as React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  ShieldCheck, 
  TrendingUp, 
  Target,
  Zap,
  Activity,
  AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const trendData = [
  { name: '00:00', trust: 85, fraud: 2 },
  { name: '04:00', trust: 82, fraud: 5 },
  { name: '08:00', trust: 88, fraud: 1 },
  { name: '12:00', trust: 94, fraud: 0 },
  { name: '16:00', trust: 91, fraud: 3 },
  { name: '20:00', trust: 89, fraud: 2 },
  { name: '23:59', trust: 92, fraud: 1 },
];

const riskDistribution = [
  { segment: 'Low Risk', value: 850 },
  { segment: 'Medium Risk', value: 120 },
  { segment: 'High Risk', value: 30 },
];

export default function TrustAnalyticsPage() {
  return (
    <DashboardLayout title="Trust Analytics" breadcrumbs={[{ label: 'Trust Analytics' }]}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-sm font-medium">Avg. Trust Score</CardDescription>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold tabular-nums">92.4</CardTitle>
            <div className="mt-1 flex items-center gap-1">
              <Badge variant="secondary" className="text-[10px] h-5 py-0 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                <TrendingUp className="mr-1 h-3 w-3" /> +4.2%
              </Badge>
              <span className="text-[10px] text-muted-foreground">vs last week</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-sm font-medium">Fraud Prevention</CardDescription>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold tabular-nums">99.8%</CardTitle>
            <p className="text-[10px] text-muted-foreground mt-1">12 attempts blocked today</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-sm font-medium">Silent Auth Rate</CardDescription>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold tabular-nums">94.2%</CardTitle>
            <p className="text-[10px] text-muted-foreground mt-1">Via Network-as-Code Tokens</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-sm font-medium">Risk Alerts</CardDescription>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold tabular-nums text-destructive">13</CardTitle>
            <p className="text-[10px] text-muted-foreground mt-1">Manual review required</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm border">
          <CardHeader>
            <CardTitle className="text-lg">Trust & Risk Trends</CardTitle>
            <CardDescription>
              Correlation between transaction velocity and risk signals
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Line 
                  type="monotone" 
                  dataKey="trust" 
                  name="Trust Score"
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="fraud" 
                  name="Risk Level"
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border">
          <CardHeader>
            <CardTitle className="text-lg">Identity Risk Distribution</CardTitle>
            <CardDescription>
              User segmentation based on automated identity quality scoring
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis 
                  type="number"
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  dataKey="segment"
                  type="category"
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
