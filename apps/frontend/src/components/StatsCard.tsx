import { memo } from "react";

interface StatsCardProps {
  title: string;
  value: number;
}

const StatsCard = memo(function StatsCard({ title, value }: StatsCardProps) {
  console.log(`${title} rendered`);
  return (
    <div className="col-12 col-md-4 mb-3">
      <div className="card shadow-sm p-3">
        <h5 className="text-secondary">{title}</h5>
        <h3 className="fw-bold">{value}</h3>
      </div>
    </div>
  );
});

export default StatsCard;
