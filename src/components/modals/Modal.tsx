"use client";

import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/components/ui/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  className = "",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      closeButtonRef.current?.focus();
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Handle tab key for focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    },
    []
  );

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle swipe to close on mobile
  const touchStartY = useRef<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchEndY - touchStartY.current;
      
      // If swiped down more than 100px, close the modal
      if (diff > 100) {
        onClose();
      }
      touchStartY.current = null;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-md sm:p-lg"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onKeyDown={handleKeyDown}
    >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 animate-in fade-in duration-200"
          onClick={handleBackdropClick}
        />

          {/* Modal content */}
              <div
                ref={modalRef}
                className={cn(
                  "relative w-full max-w-md bg-background rounded-[32px] shadow-2xl ring-1 ring-white/5 animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto border border-border",
                  className
                )}
                onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
          {/* Swipe indicator for mobile */}
          <div className="md:hidden flex justify-center pt-sm pb-xs">
            <div className="w-10 h-1 bg-border rounded-full" />
          </div>

          {/* Close button */}
          {showCloseButton && (
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-md right-md size-10 flex items-center justify-center rounded-full hover:bg-surface-raised transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="size-5 text-secondary" />
            </button>
          )}

        {children}
      </div>
    </div>
  );
}
