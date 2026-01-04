interface Item { title: string; description: string }
interface Props { items: Item[] }

export default function NumberedFeatures({ items }: Props) {
  return (
    <div
      className="
        grid gap-4 my-8
      "
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      }}
    >
      {items.map((it, idx) => (
        <div
          key={idx}
          // old version className="rounded-lg p-6 flex gap-4 items-start bg-black/40 backdrop-blur border border-white/10"
          className="rounded-lg p-6 flex gap-4 items-start"
          style={{ backgroundColor: 'rgb(43, 44, 40)'}}
          
        >
          <div
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-black"
            style={{ backgroundColor: 'SILVER' }}
          >
            {idx + 1}
          </div>
          <div>
            <div className="text-lg font-bold mb-1" style={{ color: '#dfe1e5ff' }}>
              {it.title}
            </div>
            <div className="text-white/70 text-sm leading-relaxed">
              {it.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
