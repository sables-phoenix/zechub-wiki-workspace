import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill border text-sm font-medium transition-[transform,box-shadow,background-color,color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-ink bg-gold text-gold-ink shadow-stamp hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--shadow-color)]",
        secondary:
          "border-ink bg-paper text-ink shadow-stamp hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--shadow-color)]",
        dark:
          "border-vault bg-vault text-vault-text shadow-stamp hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--shadow-color)]",
        ghost: "border-transparent bg-transparent text-ink hover:bg-paper-2",
        danger:
          "border-rust bg-rust text-white shadow-stamp hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--shadow-color)]",
        link: "h-auto border-transparent bg-transparent p-0 text-ink underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-12 px-5",
        lg: "h-14 px-7 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
