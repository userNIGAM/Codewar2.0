import BackgroundElements from "./BackgroundElements";

export default function BackgroundLayer() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <BackgroundElements />
    </div>
  );
}