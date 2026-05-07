import * as React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Clock,
  MoreHorizontal
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useWebhooks } from "../hooks/use-webhooks";
import PrimaryButton from "@/core/components/primaryButton";

const mockLogs = [
  { id: 'wh_log_1', event: 'trust.score_updated', url: 'https://api.myapp.com/webhooks', status: 200, time: '2 mins ago' },
  { id: 'wh_log_2', event: 'transaction.blocked', url: 'https://api.myapp.com/webhooks', status: 200, time: '15 mins ago' },
  { id: 'wh_log_3', event: 'auth.silent_failed', url: 'https://api.myapp.com/webhooks', status: 500, time: '1 hour ago' },
  { id: 'wh_log_4', event: 'device.bound', url: 'https://api.myapp.com/webhooks', status: 200, time: '3 hours ago' },
];

export default function WebhooksPage() {
  const { endpoints, loading, isCreating, isDeleting, addWebhook, deleteWebhook } = useWebhooks();
  const [newUrl, setNewUrl] = React.useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    try {
      await addWebhook(newUrl);
      setNewUrl("");
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWebhook(id);
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <DashboardLayout title="Webhooks" breadcrumbs={[{ label: 'Webhooks' }]}>
      <Tabs defaultValue="endpoints" className="space-y-4">
        <TabsList>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="logs">Delivery Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          <Card className="shadow-sm border">
            <CardHeader>
              <CardTitle>Register Endpoint</CardTitle>
              <CardDescription>
                SENTRA will send real-time JSON payloads to this URL when events occur.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="flex gap-2">
                <Input 
                  placeholder="https://your-api.com/webhooks" 
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="flex-1 h-9"
                />
                <PrimaryButton 
                  type="submit" 
                  size="sm" 
                  className="h-9 w-auto"
                  loading={isCreating}
                  disabled={!newUrl || isCreating}
                >
                  Add Endpoint
                </PrimaryButton>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardHeader>
              <CardTitle>Configured Endpoints</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Target URL</TableHead>
                    <TableHead className="hidden md:table-cell">Events</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading && endpoints.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-16">
                        <div className="h-4 bg-muted rounded animate-pulse w-full" />
                      </TableCell>
                    </TableRow>
                  ) : endpoints.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-muted-foreground text-sm">
                        No webhooks configured.
                      </TableCell>
                    </TableRow>
                  ) : (
                    endpoints.map((ep) => (
                      <TableRow key={ep.id}>
                        <TableCell className="pl-6 font-medium text-sm">
                          <div className="flex items-center gap-2 max-w-[300px] truncate">
                            <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                            {ep.url}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex gap-1 flex-wrap">
                            {ep.events?.map(ev => (
                              <Badge key={ev} variant="secondary" className="text-[10px] h-4 py-0">
                                {ev}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-emerald-500/5 text-emerald-600 border-emerald-500/20 text-[10px] h-4">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                onClick={() => handleDelete(ep.id)}
                                disabled={isDeleting}
                              >
                                Delete Endpoint
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card className="shadow-sm border">
            <CardHeader>
              <CardTitle>Delivery Logs</CardTitle>
              <CardDescription>
                Recent delivery attempts to your configured endpoints.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Event Type</TableHead>
                    <TableHead className="hidden md:table-cell">Destination</TableHead>
                    <TableHead>Response</TableHead>
                    <TableHead className="hidden lg:table-cell">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-6 font-mono text-[10px] text-primary">{log.event}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-xs truncate max-w-[200px]">{log.url}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.status === 200 ? (
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-destructive" />
                          )}
                          <span className={`text-xs font-medium ${log.status === 200 ? "text-emerald-600" : "text-destructive"}`}>
                            {log.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground text-[10px]">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {log.time}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

