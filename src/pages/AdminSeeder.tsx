import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminSeeder = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const seedAdmins = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("seed-admins", {
        body: {
          users: [
            { email: "zian.surani@gmail.com", password: "shecure@123" },
            { email: "vaishnavisoni1209@gmail.com", password: "shecure@123" },
          ],
        },
      });

      if (error) throw error;
      toast({ title: "Admins seeded", description: "Admin accounts are ready." });
    } catch (e: any) {
      toast({ title: "Seeding failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="p-6 w-full max-w-md text-center space-y-4">
        <h1 className="text-xl font-semibold text-foreground">Seed Admin Users</h1>
        <p className="text-sm text-muted-foreground">Click once to create the two admin accounts.</p>
        <Button onClick={seedAdmins} disabled={loading} variant="health" className="w-full">
          {loading ? "Seeding..." : "Seed Admins"}
        </Button>
      </Card>
    </div>
  );
};

export default AdminSeeder;
