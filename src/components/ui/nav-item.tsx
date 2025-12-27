type NavItemProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export function NavItem({ label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
className={`
          relative inline-flex items-center justify-center px-2.5 py-1 text-sm font-medium
          rounded-lg transition-colors
        ${isActive ? "text-nav-pill-text" : "text-primary"}
      `}
    >
      <span
        className={`
          absolute inset-0 rounded-lg border
          ${isActive
            ? "border-nav-pill-border bg-nav-pill-bg"
            : "border-transparent bg-transparent"}
        `}
        aria-hidden="true"
      />
      <span className="relative">{label}</span>
    </button>
  );
}
