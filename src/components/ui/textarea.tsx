import * as React from "react";

import { cn } from "./utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
              "flex min-h-[100px] w-full rounded-md border border-border bg-surface px-md py-sm text-body transition-all placeholder:text-secondary outline-none disabled:cursor-not-allowed disabled:opacity-50 shadow-inset",
              className
            )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
