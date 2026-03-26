export function MymyLogo({ className }: { className?: string }) {
  return (
    <span
      className={`font-nunito font-black leading-none tracking-tight ${className ?? ""}`}
      aria-label="Mymy"
    >
      <span style={{ color: "#E07B74" }}>m</span>
      <span style={{ color: "#7B9DD4" }}>y</span>
      <span style={{ color: "#8C9E5E" }}>m</span>
      <span style={{ color: "#9B7EC8" }}>y</span>
    </span>
  );
}
