import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-xs whitespace-nowrap rounded-lg text-body font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] outline-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-black-solid text-white border-none hover:opacity-strong dark:bg-primary dark:text-background",
        secondary: "bg-surface-raised text-primary border border-border hover:bg-surface",
        tertiary: "bg-transparent text-secondary hover:text-primary hover:bg-surface-raised",
        ghost: "bg-transparent border-none p-2 rounded-lg min-w-[40px] min-h-[40px] hover:bg-surface-raised",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        default: "px-md py-sm",
        sm: "px-sm py-xs text-caption min-h-[32px]",
        lg: "px-lg py-md text-h2 min-h-[52px]",
        icon: "size-10 p-0",
      },
      rounded: {
        default: "rounded-lg",
        pill: "rounded-pill",
        avatar: "rounded-avatar",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
        rounded: "pill",
      },
    },
  );

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
