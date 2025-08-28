import React, { useState } from 'react';
import { Competitor } from '../types';

interface MonitoringProps {
  competitors: Competitor[];
}

const Monitoring: React.FC<MonitoringProps> = ({ competitors }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(competitors.map(c => c.id)); // Default: all

  const handleSelect = (id: string) => {
    if (id === 'all') {
      setSelectedIds(competitors.map(c => c.id));
    } else {
      setSelectedIds(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Monitoring</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded ${selectedIds.length === competitors.length ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => handleSelect('all')}
        >
          All Competitors
        </button>
        {competitors.map(comp => (
          <button
            key={comp.id}
            className={`px-3 py-1 rounded ${selectedIds.includes(comp.id) ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleSelect(comp.id)}
          >
            {comp.name}
          </button>
        ))}
      </div>
      {/* Monitoring logic for selected competitors */}
      <div>
        {competitors
          .filter(c => selectedIds.includes(c.id))
          .map(c => (
            <div key={c.id} className="mb-2 p-2 border rounded">
              Monitoring: <strong>{c.name}</strong>
              {/* Add your monitoring details here */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Monitoring;