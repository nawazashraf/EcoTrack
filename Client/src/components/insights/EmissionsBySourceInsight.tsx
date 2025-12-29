import type { EmissionBySource } from "@/types/emissions";

const EmissionsBySourceInsight = ({ data }: { data: EmissionBySource[] }) => {
  if (!data.length) return null;

  const top = data[0];

  return (
    <p className="text-gray-600 text-sm mt-4">
      <strong>{top.category}</strong> is the largest emission source,
      contributing <strong>{top.percentage}%</strong> of total emissions.
      Immediate reduction efforts here will have the highest impact.
    </p>
  );
};

export default EmissionsBySourceInsight;
