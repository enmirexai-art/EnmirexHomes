import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Integration with n8n AI agent will be added here
      console.log("Message to n8n:", message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-white shadow-lg z-50 border-2 border-secondary"
          data-testid="button-open-chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
          <CardHeader className="bg-primary text-white rounded-t-lg p-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Enmirex Homes Assistant</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-secondary hover:bg-primary/80"
              data-testid="button-close-chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-4 flex flex-col">
            {/* Chat Messages Area */}
            <div className="flex-1 mb-4 border rounded-lg p-3 bg-gray-50 overflow-y-auto">
              <div className="text-center text-gray-500 text-sm">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p>Hi! I'm here to help you sell your home quickly for cash.</p>
                <p className="text-xs mt-2">
                  <em>AI Assistant integration coming soon...</em>
                </p>
              </div>
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1"
                data-testid="input-chat-message"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-primary hover:bg-primary/90 text-white"
                data-testid="button-send-message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <Chatbox />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
