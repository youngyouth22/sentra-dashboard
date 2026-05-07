import * as React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Clock,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Server,
  ZapOff
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Button from "@/core/components/button";
import { useAnalytics } from "../hooks/use-analytics";

export default function DashboardPage() {
  const { usage, loading } = useAnalytics();

  const successRate = usage && usage.totalRequests > 0 
    ? (usage.successCount / usage.totalRequests) * 100 
    : 0;

  return (
    <DashboardLayout title="Sentra Nexus Dashboard">
      <div className="flex flex-col gap-6">
        {/* --- HERO SECTION: Real-time Stats --- */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border shadow-sm bg-primary/[0.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-primary/60">
                Total Requests
              </CardDescription>
              <Activity className="h-4 w-4 text-primary animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">
                {usage?.totalRequests.toLocaleString() || "0"}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                Live traffic from Sentra Gateway
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-emerald-600/60">
                Success Rate
              </CardDescription>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-emerald-600">
                {successRate.toFixed(1)}%
              </div>
              <Progress value={successRate} className="h-1.5 mt-2 bg-emerald-500/10" />
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-rose-600/60">
                Errors Logged
              </CardDescription>
              <ZapOff className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-rose-600">
                {usage?.errorCount.toLocaleString() || "0"}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                Failed validation or blocked attempts
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-blue-600/60">
                Avg. Latency
              </CardDescription>
              <Zap className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">
                {usage?.avgResponseTime || 0}ms
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                Global response time average
              </p>
            </CardContent>
          </Card>
        </div>

        {/* --- MAIN CONTENT: Real Usage Data --- */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Endpoint Distribution */}
          <Card className="md:col-span-4 border shadow-sm h-fit">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                Endpoint Usage
              </CardTitle>
              <CardDescription className="text-xs">
                Distribution of calls across the API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usage && Object.entries(usage.requestsByEndpoint).length > 0 ? (
                  Object.entries(usage.requestsByEndpoint)
                    .sort(([, a], [, b]) => b - a)
                    .map(([endpoint, count]) => (
                      <div key={endpoint} className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono text-muted-foreground truncate max-w-[180px]">{endpoint}</span>
                          <span className="font-bold">{count}</span>
                        </div>
                        <Progress 
                          value={(count / usage.totalRequests) * 100} 
                          className="h-1 bg-muted" 
                        />
                      </div>
                    ))
                ) : (
                  <div className="py-10 text-center text-xs text-muted-foreground opacity-50">
                    No endpoint data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Activity Logs */}
          <Card className="md:col-span-8 border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Live Activity Stream
                </CardTitle>
                <CardDescription className="text-xs">
                  The latest 10 requests processed by the gateway
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-emerald-500/5 text-emerald-600 border-emerald-500/20 text-[10px] animate-pulse">
                Recording Live
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {loading && !usage ? (
                  Array(8).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0 animate-pulse">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-1/2 bg-muted rounded" />
                        <div className="h-2 w-1/4 bg-muted rounded" />
                      </div>
                    </div>
                  ))
                ) : usage?.lastRequests.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center opacity-50">
                    <Activity className="h-10 w-10 mb-2" />
                    <p className="text-sm">No activity recorded yet</p>
                  </div>
                ) : (
                  usage?.lastRequests.slice(0, 10).map((req) => (
                    <div key={req.id} className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-muted/30 transition-colors px-2 rounded-lg group">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${req.statusCode < 400 ? 'bg-emerald-500/5 text-emerald-600 border-emerald-500/20' : 'bg-rose-500/5 text-rose-600 border-rose-500/20'}`}>
                          {req.statusCode < 400 ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ZapOff className="h-4 w-4" />
                          )}
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold font-mono truncate">{req.endpoint}</div>
                          <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            Secure Request • {new Date(req.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-xs font-bold font-mono ${req.statusCode < 400 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {req.statusCode}
                        </div>
                        <div className="text-[10px] text-muted-foreground tabular-nums">{req.responseTime}ms</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
