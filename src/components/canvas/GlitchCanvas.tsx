"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulseOffset: number;
}

export default function GlitchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (default off-screen)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    // Color palette based on Spider-Verse neon aesthetic
    const colors = ["#00f0ff", "#ff0055", "#ffe600", "#9d4edd"];

    // Node count adjusted for viewport size to preserve Lighthouse 60fps
    const isMobile = width < 768;
    const nodeCount = isMobile ? 32 : 65;
    const maxDistance = isMobile ? 110 : 150;
    const mouseRadius = isMobile ? 130 : 180;

    // Create web nodes
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 1.8 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    // Handle high-DPI displays
    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Static fallback render when reduced motion is preferred
      if (shouldReduceMotion) {
        drawStaticGrid();
      }
    };

    // Static grid renderer for prefers-reduced-motion
    const drawStaticGrid = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      // Subtle comic halftone dot grid
      const dotSpacing = 36;
      ctx.fillStyle = isDark
        ? "rgba(0, 240, 255, 0.08)"
        : "rgba(0, 150, 214, 0.12)";
      for (let x = 18; x < width; x += dotSpacing) {
        for (let y = 18; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Static dimensional web constellation
      ctx.strokeStyle = isDark
        ? "rgba(0, 240, 255, 0.12)"
        : "rgba(0, 150, 214, 0.18)";
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        ctx.fillStyle = n1.color;
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Pointer event listeners on window
    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);

    // Initial sizing
    handleResize();

    // If reduced motion is active, do not start dynamic requestAnimationFrame
    if (shouldReduceMotion) {
      drawStaticGrid();
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("mouseleave", handlePointerLeave);
        window.removeEventListener("resize", handleResize);
      };
    }

    // Dynamic animation loop
    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Occasional Spider-Verse micro-glitch (subtle chromatic flash every ~180 frames)
      const isGlitchFrame = tick % 220 >= 218;
      const glitchOffset = isGlitchFrame ? (Math.random() - 0.5) * 4 : 0;

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges smoothly
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Gentle mouse interaction (spider web tension)
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * 0.8;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
          }
        }

        // Draw node
        const pulse = Math.sin(tick * 0.03 + node.pulseOffset) * 0.4 + 1;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(
          node.x + glitchOffset,
          node.y,
          node.radius * pulse,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Connect nodes with glowing web strands
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = node.x - nodeB.x;
          const dy = node.y - nodeB.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(node.x + glitchOffset, node.y);
            ctx.lineTo(nodeB.x + (isGlitchFrame ? -glitchOffset : 0), nodeB.y);

            // Alternate neon colors for strands
            const isDark = document.documentElement.classList.contains("dark");
            ctx.strokeStyle =
              i % 2 === 0
                ? isDark
                  ? `rgba(0, 240, 255, ${alpha})`
                  : `rgba(0, 160, 220, ${alpha * 1.1})`
                : isDark
                  ? `rgba(255, 0, 85, ${alpha * 0.9})`
                  : `rgba(220, 0, 80, ${alpha * 1.1})`;
            ctx.lineWidth = alpha * 1.5;
            ctx.stroke();
          }
        }

        // Connect nodes to mouse pointer as anchor
        if (mouse.active) {
          const mdx = mouse.x - node.x;
          const mdy = mouse.y - node.y;
          const mDist = Math.hypot(mdx, mdy);

          if (mDist < mouseRadius) {
            const mAlpha = (1 - mDist / mouseRadius) * 0.6;
            const isDark = document.documentElement.classList.contains("dark");
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDark
              ? `rgba(0, 240, 255, ${mAlpha})`
              : `rgba(0, 160, 220, ${mAlpha * 1.2})`;
            ctx.lineWidth = mAlpha * 2;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full bg-[#f6f7fb] dark:bg-[#06070c] transition-colors duration-300"
      style={{
        opacity: 0.85,
      }}
    />
  );
}
