import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginTypeDialog = ({ open, onOpenChange }: LoginTypeDialogProps) => {
  const navigate = useNavigate();

  const handleLoginType = (type: 'employee' | 'admin') => {
    onOpenChange(false);
    if (type === 'employee') {
      navigate("/auth");
    } else {
      navigate("/admin-auth");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">Select Login Type</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="h-16 flex flex-col items-center gap-2 hover:bg-primary-soft hover:border-primary"
            onClick={() => handleLoginType('employee')}
          >
            <User className="h-6 w-6" />
            <span className="font-medium">Employee Login</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-16 flex flex-col items-center gap-2 hover:bg-health-success/10 hover:border-health-success"
            onClick={() => handleLoginType('admin')}
          >
            <Shield className="h-6 w-6" />
            <span className="font-medium">Admin Login</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginTypeDialog;