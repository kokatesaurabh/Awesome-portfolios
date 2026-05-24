import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  type: "server" | "db" | "api" | "cache" | "node" | "lb" | "k8s";
  r: number;
}

interface Edge {
  a: number;
  b: number;
  pulse: number;
  speed: number;
}

const LABELS: { label: string; type: Node["type"] }[] = [
  { label: "API", type: "api" },
  { label: "DB", type: "db" },
  { label: "Cache", type: "cache" },
  { label: "Server", type: "server" },
  { label: "LB", type: "lb" },
  { label: "K8s", type: "k8s" },
  { label: "Auth", type: "api" },
  { label: "Queue", type: "cache" },
  { label: "CDN", type: "lb" },
  { label: "Node", type: "node" },
  { label: "Root", type: "node" },
  { label: "Redis", type: "cache" },
  { label: "Kafka", type: "server" },
  { label: "Nginx", type: "lb" },
  { label: "gRPC", type: "api" },
  { label: "S3", type: "db" },
  { label: "Worker", type: "node" },
  { label: "Proxy", type: "lb" },
  { label: "DNS", type: "api" },
  { label: "Pod", type: "k8s" },
  { label: "ETL", type: "server" },
  { label: "WAF", type: "server" },
  { label: "VPC", type: "k8s" },
  { label: "ML", type: "node" },
];

const TYPE_COLORS: Record<Node["type"], string> = {
  api: "#FF6600",
  db: "#82f1f4",
  cache: "#a78bfa",
  server: "#34d399",
  lb: "#fbbf24",
  k8s: "#60a5fa",
  node: "#f472b6",
};

export function ContactTreeBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Node[] = [];
    let edges: Edge[] = [];

    function init() {
      const W = canvas!.width;
      const H = canvas!.height;
      nodes = LABELS.map((item) => ({
        x: 40 + Math.random() * (W - 80),
        y: 40 + Math.random() * (H - 80),
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        label: item.label,
        type: item.type,
        r: 16 + Math.random() * 8,
      }));
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        const numEdges = 1 + Math.floor(Math.random() * 2);
        for (let k = 0; k < numEdges; k++) {
          const j = Math.floor(Math.random() * nodes.length);
          if (j !== i) {
            edges.push({ a: i, b: j, pulse: Math.random(), speed: 0.003 + Math.random() * 0.005 });
          }
        }
      }
    }

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      init();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      ctx!.clearRect(0, 0, W, H);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < node.r) { node.x = node.r; node.vx *= -1; }
        if (node.x > W - node.r) { node.x = W - node.r; node.vx *= -1; }
        if (node.y < node.r) { node.y = node.r; node.vy *= -1; }
        if (node.y > H - node.r) { node.y = H - node.r; node.vy *= -1; }
      }

      for (const edge of edges) {
        edge.pulse = (edge.pulse + edge.speed) % 1;
        const na = nodes[edge.a];
        const nb = nodes[edge.b];
        const color = TYPE_COLORS[na.type];

        const grad = ctx!.createLinearGradient(na.x, na.y, nb.x, nb.y);
        grad.addColorStop(0, color + "11");
        grad.addColorStop(Math.max(0, edge.pulse - 0.12), color + "11");
        grad.addColorStop(edge.pulse, color + "cc");
        grad.addColorStop(Math.min(1, edge.pulse + 0.12), color + "11");
        grad.addColorStop(1, color + "11");

        ctx!.beginPath();
        ctx!.moveTo(na.x, na.y);
        ctx!.lineTo(nb.x, nb.y);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      for (const node of nodes) {
        const color = TYPE_COLORS[node.type];
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx!.fillStyle = color + "18";
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx!.strokeStyle = color + "55";
        ctx!.lineWidth = 1;
        ctx!.stroke();

        ctx!.font = `bold ${Math.floor(node.r * 0.72)}px 'Space Grotesk', monospace`;
        ctx!.fillStyle = color + "aa";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(node.label, node.x, node.y);
      }

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
    />
  );
}
