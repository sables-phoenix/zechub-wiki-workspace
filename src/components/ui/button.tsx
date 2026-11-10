import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill border font-medium transition-[background-color,color,border-color,transform] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-gold bg-gold text-gold-ink hover:border-[#ffc947] hover:bg-[#ffc947] active:translate-y-px",
        secondary:
          "border-line bg-paper text-ink hover:border-ink/30 hover:bg-paper-2 active:translate-y-px",
        dark:
          "border-vault-line bg-vault-2 text-vault-text hover:border-vault-muted/40 hover:bg-vault-line active:translate-y-px",
        ghost: "border-transparent bg-transparent text-ink hover:bg-paper-2",
        danger: "border-rust bg-rust text-white hover:opacity-90 active:translate-y-px",
        link: "h-auto border-transparent bg-transparent p-0 text-blue underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
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
