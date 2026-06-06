import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Shield, Lock } from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin-setup")({ component: AdminSetup });

function AdminSetup() {
  const nav = useNavigate();
  const [exists, setExists] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.rpc("admin_exists").then(({ data }) => setExists(!!data));
  }, []);

  const claimAfterAuth = async () => {
    const { data, error } = await supabase.rpc("claim_admin");
    if (error) { toast.error(error.message); return false; }
    const r = data as { success: boolean; error?: string };
    if (!r.success) { toast.error(r.error || "Could not claim admin"); return false; }
    return true;
  };

  const signUp = async () => {
    if (exists) { toast.error("Admin already exists. Please sign in instead."); return; }
    setBusy(true);
    const { data: sd, error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/admin`, data: { full_name: name || "Administrator" } },
    });
    if (error) { setBusy(false); return toast.error(error.message); }
    // If autoconfirm off, user may not have session yet
    if (sd.session) {
      const ok = await claimAfterAuth();
      setBusy(false);
      if (ok) { toast.success("Admin account created"); nav({ to: "/admin" }); }
    } else {
      setBusy(false);
      toast.success("Account created. Confirm your email, sign in, then re-open this page to claim admin.");
    }
  };

  const signIn = async () => {
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setBusy(false); return toast.error(error.message); }
    // If no admin yet, claim. If exists, just go to admin page (has_role check there).
    if (!exists) await claimAfterAuth();
    setBusy(false);
    toast.success("Welcome, Administrator");
    nav({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card text-card-foreground shadow-card-elev">
        <Link to="/" className="flex justify-center mb-4"><img src={logo} alt="Logo" className="h-14" /></Link>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-secondary"><Shield className="h-5 w-5" /><span className="font-semibold">Admin Portal</span></div>
          <p className="text-xs text-muted-foreground mt-2">
            {exists === null ? "Checking..." : exists
              ? <span className="inline-flex items-center gap-1"><Lock className="h-3 w-3" /> Admin account already provisioned _ sign in only</span>
              : "First-time setup _ create the administrator account"}
          </p>
        </div>

        {exists === false ? (
          <Tabs defaultValue="signup">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signup">Create admin</TabsTrigger>
              <TabsTrigger value="signin">Sign in</TabsTrigger>
            </TabsList>
            <TabsContent value="signup" className="space-y-3 mt-4">
              <div><Label>Full name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
              <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
              <div><Label>Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} /></div>
              <Button onClick={signUp} disabled={busy} className="w-full bg-brand-gradient">Create administrator account</Button>
            </TabsContent>
            <TabsContent value="signin" className="space-y-3 mt-4">
              <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
              <div><Label>Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} /></div>
              <Button onClick={signIn} disabled={busy} className="w-full bg-brand-gradient">Sign in</Button>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-3">
            <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div><Label>Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} /></div>
            <Button onClick={signIn} disabled={busy} className="w-full bg-brand-gradient">Sign in as administrator</Button>
            <p className="text-xs text-muted-foreground text-center">Signup is permanently disabled because an admin already exists.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
