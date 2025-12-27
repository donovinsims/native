import * as React from "react";

import { cn } from "./utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
        <input
          type={type}
            className={cn(
              "flex min-h-[44px] w-full rounded-md border border-border bg-surface px-md py-sm text-body transition-all file:border-0 file:bg-transparent file:text-caption file:font-medium placeholder:text-secondary outline-none disabled:cursor-not-allowed disabled:opacity-50 shadow-inset",
              className
            )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
