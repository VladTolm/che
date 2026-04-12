// Static SVG bezier connection lines between canvas blocks.
// Coordinates are based on the block positions in AgentCanvas.

interface Connection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
}

// Combined Agent+Instructions block: top=50, left=400, w=280, h≈210
const connections: Connection[] = [
  // Triggers (right edge, top=50) → Agent (left edge)
  { from: { x: 320, y: 95 }, to: { x: 400, y: 130 }, color: "#F59E0B" },
  // Agent (right edge) → Toolbox (left edge)
  { from: { x: 680, y: 110 }, to: { x: 760, y: 95 }, color: "#6366F1" },
  // Agent (right edge) → Knowledge (left edge, top=200)
  { from: { x: 680, y: 130 }, to: { x: 760, y: 245 }, color: "#22C55E" },
  // Agent (right edge) → SubAgents (left edge, top=350)
  { from: { x: 680, y: 150 }, to: { x: 760, y: 400 }, color: "#22C55E" },
  // Agent (right edge) → Skills (left edge, top=500)
  { from: { x: 680, y: 170 }, to: { x: 760, y: 555 }, color: "#22C55E" },
];

export default function ConnectionLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: "visible" }}
    >
      {connections.map((conn, i) => {
        const dx = Math.abs(conn.to.x - conn.from.x);
        const cpOffset = Math.max(dx * 0.5, 40);

        const d = `M ${conn.from.x},${conn.from.y} C ${conn.from.x + cpOffset},${conn.from.y} ${conn.to.x - cpOffset},${conn.to.y} ${conn.to.x},${conn.to.y}`;

        return (
          <g key={i}>
            <path
              d={d}
              stroke={conn.color}
              strokeWidth={2}
              strokeDasharray="6 4"
              fill="none"
              opacity={0.6}
            />
            <circle cx={conn.from.x} cy={conn.from.y} r={5} fill="#1F2937" />
            <circle cx={conn.to.x} cy={conn.to.y} r={5} fill="#1F2937" />
          </g>
        );
      })}
    </svg>
  );
}
