import React, { useEffect, useRef } from "react";

interface NetworkBackgroundProps {
  isLightMode?: boolean;
}

export const NetworkBackground: React.FC<NetworkBackgroundProps> = ({ isLightMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle nodes configuration
    const numNodes = Math.min(Math.floor((width * height) / 18000), 75);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
    }> = [];

    const colors = isLightMode
      ? ["#0284c7", "#2563eb", "#0891b2", "#4f46e5"]
      : ["#00BFFF", "#4F46E5", "#06B6D4", "#38BDF8"];

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    const maxConnectDistance = 140;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background gradient matching mode
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        0,
        50,
        width / 2,
        height / 2,
        Math.max(width, height)
      );

      if (isLightMode) {
        bgGrad.addColorStop(0, "#e0f2fe");
        bgGrad.addColorStop(0.5, "#f8fafc");
        bgGrad.addColorStop(1, "#f1f5f9");
      } else {
        bgGrad.addColorStop(0, "#1e3a8a");
        bgGrad.addColorStop(0.5, "#020617");
        bgGrad.addColorStop(1, "#020617");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw high density dot grid matrix
      ctx.fillStyle = isLightMode ? "rgba(2, 132, 199, 0.12)" : "rgba(56, 189, 248, 0.08)";
      const dotSpacing = 24;
      for (let x = 0; x < width; x += dotSpacing) {
        for (let y = 0; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update & draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.pulse += node.pulseSpeed;
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;

        // Node Glow
        ctx.save();
        ctx.shadowBlur = isLightMode ? 4 : 10;
        ctx.shadowColor = node.color;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.8, currentRadius), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby nodes with lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const alpha = (1 - dist / maxConnectDistance) * 0.28;
            ctx.strokeStyle = isLightMode
              ? `rgba(2, 132, 199, ${alpha * 0.6})`
              : `rgba(0, 191, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLightMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
