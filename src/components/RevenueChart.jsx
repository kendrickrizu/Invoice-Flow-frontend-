export default function RevenueChart({ data = [] }) {

  const maxBilled = Math.max(...data.map(item => item.billed), 1);
  
  const scaleMultiplier = 140 / maxBilled;

  return (
    <>
      <div className="text-sm font-semibold mb-1">Revenue, last 6 months</div>
      <div className="text-xs text-gray-500 mb-5">Billed vs. collected, in USD</div>
      
      <svg viewBox="0 0 480 190" width="100%" height="190">
        <line x1="24" y1="20" x2="456" y2="20" stroke="var(--color-line)" strokeWidth="1" />
        <line x1="24" y1="90" x2="456" y2="90" stroke="var(--color-line)" strokeWidth="1" />
        <line x1="24" y1="160" x2="456" y2="160" stroke="var(--color-line-strong)" strokeWidth="1" />
        
        <g>
          {data.map((item, index) => {
            const billedHeight = item.billed * scaleMultiplier;
            const collectedHeight = item.collected * scaleMultiplier;

            const xPos = 24 + (index * 72);
            
            const billedY = 160 - billedHeight;
            const collectedY = 160 - collectedHeight;

            return (
              <g key={item.month}>
                <rect 
                  x={xPos} 
                  y={billedY} 
                  width="48" 
                  height={billedHeight} 
                  fill="var(--color-paper-100)" 
                  stroke="var(--color-line-strong)" 
                />
                
                <rect 
                  x={xPos} 
                  y={collectedY} 
                  width="48" 
                  height={collectedHeight} 
                  fill="var(--color-brand-600)" 
                />
                
                <text 
                  x={xPos + 24} 
                  y="176" 
                  textAnchor="middle" 
                  className="fill-gray-500 font-mono text-[10px]"
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div className="flex gap-5 mt-4 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <i className="w-2 h-2 rounded-full bg-brand-600 inline-block" />Collected
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="w-2 h-2 rounded-full bg-paper-100 border border-line-strong inline-block" />Billed
        </span>
      </div>
    </>

  );
}