"use client";

import { useEffect, useState } from "react";
import { Activity, HelpCircle, Layers, Zap } from "lucide-react";

type NodeType = "input" | "output" | "dep";
type NodeStatus = "active" | "spent" | "locked";

type CellNode = {
  id: string;
  label: string;
  type: NodeType;
  capacity: string;
  x: number;
  y: number;
  pulseSpeed: number;
  status: NodeStatus;
};

type Connection = {
  from: string;
  to: string;
};

type Packet = {
  id: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
};

const initialNodes: CellNode[] = [
  { id: "in-1", label: "Input Cell", type: "input", capacity: "126 CKB", x: 16, y: 35, pulseSpeed: 2, status: "spent" },
  { id: "in-2", label: "Input Cell", type: "input", capacity: "84 CKB", x: 22, y: 65, pulseSpeed: 3, status: "active" },
  { id: "dep-1", label: "Secp256k1 Dep", type: "dep", capacity: "dep_group", x: 48, y: 20, pulseSpeed: 1.5, status: "locked" },
  { id: "out-1", label: "Recipient Output", type: "output", capacity: "100 CKB", x: 80, y: 32, pulseSpeed: 1.8, status: "active" },
  { id: "out-2", label: "Change Output", type: "output", capacity: "~change", x: 84, y: 62, pulseSpeed: 2.2, status: "active" }
];

const connections: Connection[] = [
  { from: "in-1", to: "out-1" },
  { from: "in-2", to: "out-1" },
  { from: "in-2", to: "out-2" },
  { from: "dep-1", to: "in-1" },
  { from: "dep-1", to: "in-2" }
];

export function ProtocolNetworkViz() {
  const [selectedNode, setSelectedNode] = useState<CellNode>(initialNodes[1]);
  const [networkLoad, setNetworkLoad] = useState(34);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      const connection = connections[Math.floor(Math.random() * connections.length)];
      const from = initialNodes.find((node) => node.id === connection.from);
      const to = initialNodes.find((node) => node.id === connection.to);
      if (!from || !to) return;
      setPackets((current) => [
        ...current,
        { id: Date.now() + Math.random(), fromX: from.x, fromY: from.y, toX: to.x, toY: to.y, progress: 0 }
      ]);
    }, 850);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setPackets((current) => current.map((packet) => ({ ...packet, progress: packet.progress + 1.6 })).filter((packet) => packet.progress < 100));
    }, 32);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  function triggerSimulation() {
    const nextPackets = connections.flatMap((connection, index) => {
      const from = initialNodes.find((node) => node.id === connection.from);
      const to = initialNodes.find((node) => node.id === connection.to);
      if (!from || !to) return [];
      return [{ id: Date.now() + index, fromX: from.x, fromY: from.y, toX: to.x, toY: to.y, progress: 0 }];
    });
    setPackets((current) => [...current, ...nextPackets]);
    setNetworkLoad((current) => Math.min(current + 12, 92));
    window.setTimeout(() => setNetworkLoad((current) => Math.max(current - 12, 28)), 1500);
  }

  return (
    <div className="grid gap-6">
      <div className="relative flex aspect-video w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/85 shadow-2xl md:aspect-[21/9]">
        <div className="flex h-10 items-center justify-between border-b border-white/10 bg-[#1c1b1d] px-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border border-red-500/50 bg-red-500/30" />
            <div className="h-3 w-3 rounded-full border border-yellow-500/50 bg-yellow-500/30" />
            <div className="h-3 w-3 rounded-full border border-green-500/50 bg-green-500/30" />
            <span className="ml-2 font-mono text-xs uppercase tracking-wider text-[#D8C3AD]">cellkit/action-viz</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-white/40">
            <span className="hidden sm:inline">MODE: UNSIGNED</span>
            <span>TESTNET</span>
          </div>
        </div>

        <div className="protocol-grid relative flex-grow overflow-hidden bg-black select-none">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {connections.map((connection, index) => {
              const from = initialNodes.find((node) => node.id === connection.from);
              const to = initialNodes.find((node) => node.id === connection.to);
              if (!from || !to) return null;
              return (
                <path
                  key={`${connection.from}-${connection.to}`}
                  d={`M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2 + (index % 2 === 0 ? 5 : -5)} ${to.x} ${to.y}`}
                  fill="none"
                  stroke={from.type === "dep" ? "rgba(138,176,255,0.22)" : "rgba(255,193,116,0.22)"}
                  strokeWidth="0.42"
                />
              );
            })}

            {packets.map((packet) => (
              <circle
                key={packet.id}
                cx={packet.fromX + (packet.toX - packet.fromX) * (packet.progress / 100)}
                cy={packet.fromY + (packet.toY - packet.fromY) * (packet.progress / 100)}
                r="0.8"
                fill="#ffc174"
              />
            ))}
          </svg>

          {initialNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            const nodeColor = node.type === "input" ? "bg-amber-400" : node.type === "output" ? "bg-moss" : "bg-basin";
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNode(node)}
                className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                aria-label={`Inspect ${node.label}`}
              >
                <span
                  className={`absolute -inset-3 rounded-full border opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                    node.type === "input" ? "border-amber-400/30 bg-amber-400/5" : node.type === "output" ? "border-moss/30 bg-moss/5" : "border-basin/30 bg-basin/5"
                  }`}
                  style={{ animation: isPlaying ? `ping ${node.pulseSpeed}s cubic-bezier(0,0,0.2,1) infinite` : "none" }}
                />
                <span className={`flex h-6 w-6 items-center justify-center rounded-lg border transition-all duration-300 ${isSelected ? "scale-125 border-white bg-white/20" : "border-white/10 bg-black/90 group-hover:border-white/30"}`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${nodeColor} ${isPlaying ? "animate-pulse" : ""}`} />
                </span>
                <span className="pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded border border-white/5 bg-[#0e0e10]/90 px-1 py-0.5 font-mono text-[9px] text-[#D8C3AD]/80 opacity-0 transition-opacity group-hover:opacity-100">
                  {node.capacity}
                </span>
              </button>
            );
          })}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute bottom-4 left-4 z-30 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying((current) => !current)}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#18181B]/80 px-3 py-1 font-mono text-[10px] text-white transition-colors hover:bg-white/10 active:scale-95"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? "animate-pulse bg-moss" : "bg-red-400"}`} />
              {isPlaying ? "ACTIVE SCANNING" : "PAUSED"}
            </button>
            <button
              type="button"
              onClick={triggerSimulation}
              className="flex items-center gap-1 rounded-full border border-copper/20 bg-copper/10 px-3 py-1 font-mono text-[10px] text-copper transition-all hover:bg-copper/20 active:scale-95"
            >
              <Zap className="h-3 w-3" />
              FIRE CELL SIGNAL
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="RPC DRY-RUN" value="Explicit" detail="before broadcast" icon={<Activity className="h-3.5 w-3.5 text-moss" />} tone="moss" />
        <MetricCard label="CELL SELECTION" value={`${networkLoad}%`} detail="visualized" icon={<Layers className="h-3.5 w-3.5 text-copper" />} tone="copper" progress={networkLoad} />
        <div className="flex min-h-28 flex-col justify-between rounded-xl border border-white/15 bg-[#18181B] p-4">
          {selectedNode ? (
            <>
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-basin">CELL INSPECTOR</span>
                <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] uppercase text-[#D8C3AD]/70">{selectedNode.status}</span>
              </div>
              <h4 className="truncate font-mono text-xs font-semibold text-white">{selectedNode.label}</h4>
              <div className="mt-3 flex items-center justify-between border border-white/5 bg-black/40 p-2 font-mono text-xs">
                <span className="text-white/40">VALUE:</span>
                <span className="font-semibold text-copper">{selectedNode.capacity}</span>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center gap-1.5 py-4 font-mono text-xs text-[#D8C3AD]/40">
              <HelpCircle className="h-4 w-4" />
              Select a cell node
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, detail, icon, tone, progress }: { label: string; value: string; detail: string; icon: React.ReactNode; tone: "moss" | "copper"; progress?: number }) {
  const barClass = tone === "moss" ? "bg-moss" : "bg-copper";
  return (
    <div className="flex min-h-28 flex-col justify-between rounded-xl border border-white/10 bg-[#18181B]/60 p-4">
      <div className="mb-2 flex items-center justify-between font-mono text-xs text-[#D8C3AD]/60">
        <span>{label}</span>
        {icon}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-2xl font-bold tracking-normal text-white">{value}</span>
        <span className="font-mono text-xs text-[#D8C3AD]/50">{detail}</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div className={`h-full rounded-full ${barClass} transition-all duration-500`} style={{ width: `${progress ?? 72}%` }} />
      </div>
    </div>
  );
}
