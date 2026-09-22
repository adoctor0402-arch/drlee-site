export type ButtonVariant = "primary" | "ghost" | "light";
export type ButtonSize = "md" | "sm";

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold cursor-pointer";
  const sizes = { md: "px-7 py-3.5 text-[15px]", sm: "px-5 py-2 text-sm" };
  const variants = {
    primary: "bg-deep text-ivory hover:bg-deep-2 shadow-[0_8px_24px_-12px_rgba(23,54,93,0.6)]",
    ghost: "border border-deep/25 text-deep hover:border-deep/60 hover:bg-white/60",
    light: "bg-ivory text-deep hover:bg-white",
  };
  return `${base} ${sizes[size]} ${variants[variant]}`;
}
