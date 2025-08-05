import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Users, Plus } from "lucide-react";

const AdminRoleManager = () => {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "employee">("employee");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkAdminPermission();
    }
  }, [user]);

  const checkAdminPermission = async () => {
    try {
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user?.id)
        .eq("role", "admin")
        .single();

      if (roleError || !roleData) {
        toast({
          title: "Access Denied",
          description: "Admin privileges required.",
          variant: "destructive",
        });
        return;
      }

      fetchUserRoles();
    } catch (error: any) {
      toast({
        title: "Error checking permissions",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchUserRoles = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select(`
          id,
          user_id,
          role,
          created_at
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUserRoles(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching user roles",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const assignRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, check if user exists in auth.users by attempting to invite them
      // Note: In a real app, you'd have a proper user lookup system
      
      // For now, we'll assume the email corresponds to an existing user
      // In production, you'd want to implement a proper user lookup
      
      const { error } = await supabase
        .from("user_roles")
        .insert({
          user_id: email, // This should be replaced with actual user ID lookup
          role: selectedRole,
          created_by: user?.id
        });

      if (error) throw error;

      toast({
        title: "Role Assigned Successfully",
        description: `${selectedRole} role assigned to ${email}`,
      });

      setEmail("");
      setSelectedRole("employee");
      fetchUserRoles();
    } catch (error: any) {
      toast({
        title: "Error assigning role",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeRole = async (roleId: string) => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("id", roleId);

      if (error) throw error;

      toast({
        title: "Role Removed",
        description: "User role has been removed successfully.",
      });

      fetchUserRoles();
    } catch (error: any) {
      toast({
        title: "Error removing role",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Role Manager
            </CardTitle>
            <CardDescription>
              Manage user roles and permissions for SheCure platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={assignRole} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">User Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter user email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={selectedRole} onValueChange={(value: "admin" | "employee") => setSelectedRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Assigning..." : "Assign Role"}
                <Plus className="h-4 w-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Current User Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userRoles.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No user roles assigned yet.
                </p>
              ) : (
                userRoles.map((userRole) => (
                  <div key={userRole.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">User ID: {userRole.user_id}</p>
                      <p className="text-sm text-muted-foreground">
                        Role: <span className="capitalize font-medium">{userRole.role}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Assigned: {new Date(userRole.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeRole(userRole.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRoleManager;