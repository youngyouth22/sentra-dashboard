import * as React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  Shield, 
  Lock, 
  Save,
  AlertTriangle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [companyName, setCompanyName] = React.useState("Fintech Global Inc.");
  const [threshold, setThreshold] = React.useState(85);

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <DashboardLayout title="Settings" breadcrumbs={[{ label: 'Settings' }]}>
      <div className="grid gap-6 max-w-4xl">
        <Card className="shadow-sm border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <CardTitle>General Configuration</CardTitle>
            </div>
            <CardDescription>
              Manage your company profile and public dashboard settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="company">Company Name</Label>
              <Input 
                id="company" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="domain">Primary Domain</Label>
              <Input 
                id="domain" 
                defaultValue="fintech-global.com"
                className="h-9"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t py-4">
            <Button size="sm" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-sm border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <CardTitle>Trust Thresholds</CardTitle>
            </div>
            <CardDescription>
              Configure automated blocking thresholds based on SENTRA AI scores.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Minimum Trust Score for Auto-Approval</Label>
                <span className="text-xl font-bold tabular-nums text-primary">{threshold}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={threshold}
                onChange={(e) => setThreshold(parseInt(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0 (Aggressive)</span>
                <span>100 (Strict)</span>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-4 p-4 bg-muted/50 border rounded-lg">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-medium">Manual Review Trigger</p>
                <p className="text-[10px] text-muted-foreground">
                  Transactions with scores between 40 and {threshold} will be flagged for manual review instead of immediate blocking.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <CardTitle>Security & Environment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">Sandbox Mode</Label>
                <p className="text-xs text-muted-foreground">Use test data and simulate network signals.</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">Two-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">Enforce 2FA for all dashboard administrators.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
