import type { Topic } from "@/config/content";

const paths: Record<Topic["icon"], React.ReactNode> = {
  time: (
    <>
      <circle cx="16" cy="16" r="10" />
      <path d="M16 10v6l4 2.5" />
    </>
  ),
  hourglass: (
    <>
      <path d="M10 5h12M10 27h12" />
      <path d="M11 5c0 6 10 7 10 11s-10 5-10 11M21 5c0 6-10 7-10 11s10 5 10 11" />
    </>
  ),
  snow: (
    <>
      <path d="M16 5v22M6.5 10.5l19 11M6.5 21.5l19-11" />
      <path d="M13 7l3 2.5L19 7M13 25l3-2.5 3 2.5" />
    </>
  ),
  repeat: (
    <>
      <path d="M8 13a9 9 0 0 1 15.5-3.5L26 12" />
      <path d="M26 6v6h-6" />
      <path d="M24 19a9 9 0 0 1-15.5 3.5L6 20" />
      <path d="M6 26v-6h6" />
    </>
  ),
  heart: <path d="M16 26s-9-5.5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 12-9 12z" />,
  embryo: (
    <>
      <circle cx="16" cy="16" r="10" />
      <circle cx="13" cy="14" r="3.2" />
      <circle cx="19" cy="14" r="3.2" />
      <circle cx="16" cy="19.5" r="3.2" />
    </>
  ),
};

export function TopicIcon({ name, className = "h-8 w-8" }: { name: Topic["icon"]; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}

export function Sparkle({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden>
      <path d="M6 0l1.3 4.7L12 6l-4.7 1.3L6 12 4.7 7.3 0 6l4.7-1.3z" fill="currentColor" />
    </svg>
  );
}
