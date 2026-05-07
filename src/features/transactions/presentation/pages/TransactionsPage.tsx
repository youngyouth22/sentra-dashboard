import * as React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  MoreHorizontal,
  ShieldCheck,
  ShieldAlert,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransactions } from "../hooks/use-transactions";

export default function TransactionsPage() {
  const { transactions, loading } = useTransactions();

  return (
    <DashboardLayout title="Live Transactions" breadcrumbs={[{ label: 'Transactions' }]}>
      <Card className="shadow-sm border">
        <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-6 border-b">
          <div className="space-y-1">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Live feed of network-verified financial operations.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tx ID or user..." 
                className="pl-8 h-9"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">ID / User</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden lg:table-cell">Trust Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={7} className="h-16">
                      <div className="h-4 bg-muted rounded animate-pulse w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : transactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-muted/50">
                  <TableCell className="pl-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{tx.id}</span>
                      <span className="text-[10px] text-muted-foreground">{tx.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-xs">
                      {tx.type === 'Payout' ? (
                        <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <ArrowDownLeft className="h-3 w-3 text-primary" />
                      )}
                      {tx.type}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold tabular-nums text-sm">{tx.amount}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-muted h-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${tx.score > 80 ? 'bg-emerald-500' : tx.score > 50 ? 'bg-amber-500' : 'bg-destructive'}`} 
                          style={{ width: `${tx.score}%` }}
                        />
                      </div>
                      <span className={`text-[10px] font-bold ${tx.score > 80 ? 'text-emerald-600' : tx.score > 50 ? 'text-amber-600' : 'text-destructive'}`}>
                        {tx.score}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      tx.status === 'ALLOW' 
                        ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20" 
                        : "bg-destructive/5 text-destructive border-destructive/20"
                    }>
                      {tx.status === 'ALLOW' ? (
                        <ShieldCheck className="mr-1 h-3 w-3" />
                      ) : (
                        <ShieldAlert className="mr-1 h-3 w-3" />
                      )}
                      <span className="text-[10px]">{tx.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-xs">{tx.date}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

