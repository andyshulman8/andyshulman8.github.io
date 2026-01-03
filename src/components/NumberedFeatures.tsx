// import React from 'react';

interface Item { title: string; description: string }
interface Props { items: Item[] }

export default function NumberedFeatures({ items }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {items.map((it, idx) => (
        <div key={idx} className="rounded-lg p-6 flex gap-4 items-start" style={{ backgroundColor: '#2B2C28' }}>
          <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#333' }}>
            {idx + 1}
          </div>
          <div>
            <div className="text-lg font-bold mb-1" style={{ color: '#dfe1e5ff' }}>{it.title}</div>
            <div className="text-white/70 text-sm leading-relaxed">{it.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
