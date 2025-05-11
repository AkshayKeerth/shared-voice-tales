
import React from "react";
import { DialogContent, DialogOverlay, Dialog } from "@/components/ui/dialog";
import { Phone, PhoneOff } from "lucide-react";

interface CallAlertProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  caller: {
    username: string;
  };
}

const CallAlert: React.FC<CallAlertProps> = ({
  isOpen,
  onAccept,
  onDecline,
  caller,
}) => {
  return (
    <Dialog open={isOpen} modal={true}>
      <DialogOverlay className="bg-background/80 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-md glass border-none !p-0 overflow-hidden animate-scale-in">
        <div className="relative overflow-hidden">
          {/* Background pulsing animation */}
          <div className="absolute inset-0 bg-gradient-purple opacity-10"></div>
          
          <div className="relative p-6 pt-8">
            <div className="bg-talkmatch-purple/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="bg-talkmatch-purple/50 w-16 h-16 rounded-full flex items-center justify-center animate-pulse-gentle">
                <div className="bg-talkmatch-purple w-12 h-12 rounded-full flex items-center justify-center">
                  <Phone className="text-white" />
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-medium text-center mb-2">
              Incoming Call
            </h3>
            
            <p className="text-center mb-8">
              <span className="font-medium">{caller.username}</span> wants to talk to you about a shared topic.
            </p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={onDecline}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              >
                <PhoneOff size={20} />
              </button>
              <button
                onClick={onAccept}
                className="bg-talkmatch-purple hover:bg-talkmatch-purple-dark text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              >
                <Phone size={20} />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallAlert;
