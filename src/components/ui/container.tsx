import * as React from "react";
import { cn } from "./utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
          className={cn(
            "mx-auto w-full max-w-[1800px] px-4 md:px-8",
            className
          )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Container };
