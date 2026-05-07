import * as React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Key, 
  Plus, 
  Copy, 
  Check, 
  AlertCircle,
  MoreHorizontal
} from "lucide-react";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useApiKeys } from "../hooks/use-api-keys";
import type { ApiKey } from "../../domain/entities/api-key";
import PrimaryButton from "@/core/components/primaryButton";

export default function ApiKeysPage() {
  const { keys, loading, isCreating, isDeleting, createKey, deleteKey } = useApiKeys();
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [newKeyName, setNewKeyName] = React.useState("");
  const [createdKey, setCreatedKey] = React.useState<ApiKey | null>(null);
  const [copied, setCopied] = React.useState(false);

  const handleCreate = async () => {
    if (!newKeyName) return;
    try {
      const newKey = await createKey(newKeyName);
      setCreatedKey(newKey);
      setNewKeyName("");
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteKey(id);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("API key copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout title="API Management" breadcrumbs={[{ label: 'API Keys' }]}>
      <Card className="shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Manage your authentication tokens for SENTRA API access.
            </CardDescription>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={(open) => {
            setIsCreateOpen(open);
            if (!open) setCreatedKey(null);
          }}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create New Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{createdKey ? "Key Created" : "Create API Key"}</DialogTitle>
                <DialogDescription>
                  {createdKey 
                    ? "Copy your key now. You won't be able to see it again." 
                    : "Give your key a descriptive name to track its usage."}
                </DialogDescription>
              </DialogHeader>
              
              {!createdKey ? (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={newKeyName} 
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g. Production Backend" 
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
                    <span className="text-muted-foreground">Make sure to save this key. It will not be shown again.</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted border rounded-lg font-mono text-sm overflow-hidden truncate">
                    <span className="flex-1 truncate">{createdKey.rawKey}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(createdKey.rawKey || "")}
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}

              <DialogFooter>
                {!createdKey ? (
                  <PrimaryButton 
                    onClick={handleCreate} 
                    disabled={!newKeyName || isCreating}
                    loading={isCreating}
                  >
                    Generate Key
                  </PrimaryButton>
                ) : (
                  <Button onClick={() => setIsCreateOpen(false)}>Done</Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">ID</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && keys.length === 0 ? (
                  Array(3).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5} className="h-16">
                        <div className="h-4 bg-muted rounded animate-pulse w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : keys.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No API keys found. Create one to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  keys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-muted-foreground" />
                          {key.name}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-xs text-muted-foreground">
                        {key.id}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(key.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : 'Never'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => copyToClipboard(key.id)}>
                              Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                              onClick={() => handleDelete(key.id)}
                              disabled={isDeleting}
                            >
                              Revoke Key
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

