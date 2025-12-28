"use client";

import { useState } from "react";
import { Upload, Loader2, CheckCircle } from "lucide-react";
import { Modal } from "./Modal";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface SubmitAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { value: "", label: "Select a category" },
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "productivity", label: "Productivity" },
  { value: "security", label: "Security" },
  { value: "automation", label: "Automation" },
  { value: "communication", label: "Communication" },
  { value: "utilities", label: "Utilities" },
];

const platforms = [
  { value: "ios", label: "iOS" },
  { value: "macos", label: "MacOS" },
  { value: "mcp", label: "MCP" },
  { value: "n8n", label: "n8n" },
  { value: "shortcut", label: "iOS Shortcut" },
  { value: "web", label: "Web App" },
];

interface FormData {
  appUrl: string;
  category: string;
  platforms: string[];
  email: string;
}

export function SubmitAppModal({ isOpen, onClose }: SubmitAppModalProps) {
  const [formData, setFormData] = useState<FormData>({
    appUrl: "",
    category: "",
    platforms: [],
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.appUrl.trim()) {
      newErrors.appUrl = "App URL is required";
    } else if (!isValidUrl(formData.appUrl)) {
      newErrors.appUrl = "Please enter a valid URL";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (formData.platforms.length === 0) {
      newErrors.platforms = ["Please select at least one platform"];
    }

    if (formData.email && !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      setFormData({
        appUrl: "",
        category: "",
        platforms: [],
        email: "",
      });
      toast.success("App submitted successfully!");
    } catch (err) {
      setErrors({
        appUrl: err instanceof Error ? err.message : "Something went wrong",
      });
      toast.error("Failed to submit app. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlatformChange = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
    setErrors((prev) => ({ ...prev, platforms: undefined }));
  };

  const handleClose = () => {
    setTimeout(() => {
      setFormData({
        appUrl: "",
        category: "",
        platforms: [],
        email: "",
      });
      setErrors({});
      setIsSuccess(false);
    }, 200);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Submit an app">
      <div className="p-6 pt-4 md:pt-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center bg-ui-2 rounded-full">
            {isSuccess ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Upload className="w-6 h-6 text-text" />
            )}
          </div>
        </div>

        {isSuccess ? (
            <div className="text-center">
              <h2 className="text-xl text-text mb-2">
                Submission received!
              </h2>
              <p className="text-grey mb-6">
                Thanks for sharing! We&apos;ll review your submission and add it to our directory if it meets our quality standards.
              </p>
              <Button
                onClick={handleClose}
                className="w-full h-12 rounded-xl"
              >
                Done
              </Button>
            </div>
          ) : (
            <>
              {/* Heading */}
              <h2 className="text-xl text-text text-center mb-2">
                Submit Software
              </h2>
  
              {/* Description */}
              <p className="text-grey text-center mb-6">
                Know a great software application? Share it with the community.
              </p>
  
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* App URL */}
                <div>
                  <label htmlFor="appUrl" className="block text-sm text-grey mb-1">
                    App URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="appUrl"
                    type="text"
                    value={formData.appUrl}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, appUrl: e.target.value }));
                      setErrors((prev) => ({ ...prev, appUrl: undefined }));
                    }}
                    placeholder="https://example.com"
                    className={`w-full min-h-[44px] px-4 py-3 rounded-xl border bg-ui-3 ${
                      errors.appUrl ? "border-red-500" : "border-border-1"
                    } focus:outline-none focus:ring-2 focus:ring-text/20 focus:border-transparent text-text placeholder:text-grey`}
                    disabled={isLoading}
                  />
                  {errors.appUrl && (
                    <p className="mt-1 text-sm text-red-500">{errors.appUrl}</p>
                  )}
                </div>
  
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm text-grey mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, category: e.target.value }));
                      setErrors((prev) => ({ ...prev, category: undefined }));
                    }}
                    className={`w-full min-h-[44px] px-4 py-3 rounded-xl border bg-ui-3 ${
                      errors.category ? "border-red-500" : "border-border-1"
                    } focus:outline-none focus:ring-2 focus:ring-text/20 focus:border-transparent text-text`}
                    disabled={isLoading}
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                  )}
                </div>
  
                {/* Platforms */}
                <div>
                  <label className="block text-sm text-grey mb-2">
                    Platform <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                      <label
                        key={platform.value}
                        className={`inline-flex items-center justify-center min-h-[44px] px-3 py-2 rounded-xl border cursor-pointer transition-colors ${
                          formData.platforms.includes(platform.value)
                            ? "bg-text text-page border-text"
                            : "bg-ui-3 text-grey border-border-1 hover:bg-ui-2"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.platforms.includes(platform.value)}
                          onChange={() => handlePlatformChange(platform.value)}
                          className="sr-only"
                          disabled={isLoading}
                        />
                        <span className="text-sm">{platform.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.platforms && (
                    <p className="mt-1 text-sm text-red-500">{errors.platforms[0]}</p>
                  )}
                </div>
  
                {/* Email (optional) */}
                <div>
                  <label htmlFor="email" className="block text-sm text-grey mb-1">
                    Your email <span className="text-grey">(optional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, email: e.target.value }));
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    className={`w-full min-h-[44px] px-4 py-3 rounded-xl border bg-ui-3 ${
                      errors.email ? "border-red-500" : "border-border-1"
                    } focus:outline-none focus:ring-2 focus:ring-text/20 focus:border-transparent text-text placeholder:text-grey`}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
  
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl"
                  >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit App"
                )}
              </Button>
            </form>


            {/* Footer text */}
            <p className="text-sm text-grey text-center mt-4">
              We verify every submission
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}
