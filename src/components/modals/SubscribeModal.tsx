"use client";

import { useState } from "react";
import { Sparkles, Loader2, CheckCircle } from "lucide-react";
import { Modal } from "./Modal";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      setEmail("");
      toast.success("Successfully subscribed!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset state when closing
    setTimeout(() => {
      setEmail("");
      setError(null);
      setIsSuccess(false);
    }, 200);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Subscribe to newsletter">
      <div className="p-xl pt-lg">
        {/* Icon */}
        <div className="flex justify-center mb-md">
          <div className="size-12 flex items-center justify-center bg-ui-2 rounded-full">
            {isSuccess ? (
              <CheckCircle className="size-6 text-green-500" />
            ) : (
              <Sparkles className="size-6 text-text" />
            )}
          </div>
        </div>

        {isSuccess ? (
            <div className="text-center">
              <h2 className="text-h1 mb-xs">
                You&apos;re subscribed!
              </h2>
              <p className="text-body text-grey mb-lg">
                Thanks for subscribing. You&apos;ll receive our weekly curated software picks in your inbox.
              </p>
              <Button
                onClick={handleClose}
                className="w-full rounded-xl"
              >
                Done
              </Button>
            </div>
          ) : (
            <>
              {/* Heading */}
              <h2 className="text-h1 text-center mb-xs">
                Weekly inspiration
              </h2>
    
              {/* Description */}
              <p className="text-body text-grey text-center mb-lg">
                Stay up to date on the latest software discoveries and get the best apps delivered to your email inbox every week.
              </p>
    
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-md">
                  <div className="space-y-xs">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null);
                      }}
                      placeholder="you@example.com"
                      className={`rounded-xl ${error ? "border-red-500" : ""}`}
                      disabled={isLoading}
                      autoComplete="email"
                    />
                    {error && (
                      <p className="text-caption text-red-500 ml-xs">{error}</p>
                    )}
                  </div>

    
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-xs" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
  
              {/* Footer text */}
              <p className="text-caption text-grey text-center mt-md">
                No spam — just curated software
              </p>
            </>
          )}
      </div>
    </Modal>
  );
}
