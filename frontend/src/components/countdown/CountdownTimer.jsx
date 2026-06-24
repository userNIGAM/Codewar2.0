import useCountdown from "../../hooks/useCountdown";
import CountdownBlock from "./CountdownBlock";

export default function CountdownTimer({ targetDate }) {
  const timeLeft = useCountdown(targetDate);

  const blocks = [
    ["DAYS", timeLeft.days],
    ["HOURS", timeLeft.hours],
    ["MINUTES", timeLeft.minutes],
    ["SECONDS", timeLeft.seconds]
  ];

  return (
    <section className="mt-20">
      <div className="grid grid-cols-4 gap-4">
        {blocks.map(([label, value]) => (
          <CountdownBlock
            key={label}
            value={value}
            label={label}
          />
        ))}
      </div>
    </section>
  );
}