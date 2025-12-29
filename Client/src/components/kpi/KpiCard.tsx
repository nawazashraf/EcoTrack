import type { ReactNode } from "react";

type KpiCardProps = {
  title: string;
  value: ReactNode;
  subtitle?: ReactNode;
};

const KpiCard = ({ title, value, subtitle }: KpiCardProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
      <p className="text-xs text-gray-500 mb-1">
        {title}
      </p>

      <p className="text-lg font-semibold text-gray-900 leading-snug">
        {value}
      </p>

      {subtitle && (
        <p className="mt-0.5 text-xs text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default KpiCard;
