import React from "react";

type Competitor = {
  name: string;
  features: string[];
};

type FeatureComparisonProps = {
  features: string[];
  competitors: Competitor[];
};

const FeatureComparison: React.FC<FeatureComparisonProps> = ({ features, competitors }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Feature</th>
            {competitors.map((c) => (
              <th key={c.name} className="border border-gray-300 p-2 text-center">
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{feature}</td>
              {competitors.map((c) => (
                <td key={c.name} className="border border-gray-300 p-2 text-center">
                  {c.features.includes(feature) ? "✅" : "❌"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureComparison;
