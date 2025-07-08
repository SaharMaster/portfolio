'use client';

import React, { useRef, useEffect } from 'react';
import styles from './BackgroundAnimation.module.scss';

// --- Subtle color palette ---
const analogousPalette = [
  'rgba(123, 0, 255, 0.15)',
  'rgba(80, 80, 255, 0.2)',
  'rgba(0, 0, 150, 0.15)',
  'rgba(200, 50, 200, 0.15)',
  'rgba(255, 150, 255, 0.1)'
];

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollY = useRef(0);
  const mouse = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stacks: SquareStack[] = [];
    const SQUARE_SIZE = 10;
    const GAP = 2;

    // --- Handles scroll for parallax effect ---
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // --- Mouse move listener for interactivity ---
    const handleMouseMove = (e: MouseEvent) => {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- SquareStack Class ---
    class SquareStack {
      x: number;
      y: number;
      vy: number; // Only vertical velocity
      squares: { yOffset: number; color: string }[] = [];
      stackHeight: number;

      constructor(initialX?: number, initialY?: number) {
        this.x = initialX ?? Math.random() * window.innerWidth;
        const stackCount = Math.floor(Math.random() * 4) + 1; // 1 to 4 squares
        
        this.stackHeight = stackCount * SQUARE_SIZE + (stackCount - 1) * GAP;
        this.y = initialY ?? window.innerHeight + this.stackHeight + Math.random() * 200;

        for (let i = 0; i < stackCount; i++) {
          this.squares.push({
            yOffset: i * (SQUARE_SIZE + GAP),
            color: analogousPalette[Math.floor(Math.random() * analogousPalette.length)],
          });
        }
        
        this.vy = -(Math.random() * 0.1 + 0.1); // Slow upward velocity
      }

      reset() {
        this.y = window.innerHeight + this.stackHeight;
        this.x = Math.random() * window.innerWidth;
      }

      update() {
        this.y += this.vy - (scrollY.current * 0.4); // Parallax effect applied here

        if (this.y < -this.stackHeight) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;

        this.squares.forEach(square => {
            const currentSquareX = this.x;
            const currentSquareY = this.y + square.yOffset;
            const dist = Math.hypot(currentSquareX - mouse.current.x, currentSquareY - mouse.current.y);
            const isNear = dist < 50;

            ctx.save();
            ctx.translate(currentSquareX, currentSquareY);
            
            if (isNear) {
                // Apply outline effect when cursor is close
                ctx.strokeStyle = `rgba(123, 0, 255, 0.5)`;
                ctx.lineWidth = 1;
                ctx.strokeRect(0, 0, SQUARE_SIZE, SQUARE_SIZE);
            } else {
                // Draw the simple filled square
                ctx.fillStyle = square.color;
                ctx.fillRect(0, 0, SQUARE_SIZE, SQUARE_SIZE);
            }
            
            ctx.restore();
        });
      }
    }
    
    // --- Animation Setup & Loop ---
    const handleResize = () => {
      if (!canvas || !ctx) return;

      const dpr = window.devicePixelRatio || 1;

      // Set the canvas rendering resolution to match the device's pixel ratio
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      // Set the CSS size of the canvas to fill the viewport
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        stacks = [];
        const stackCount = Math.floor(window.innerWidth / 40);
        for (let i = 0; i < stackCount; i++) {
            const initialY = Math.random() * (window.innerHeight + 400);
            stacks.push(new SquareStack(undefined, initialY));
        }
    };
    
    const animate = () => {
      if (!ctx || !canvas) return;
      // Clear the canvas based on CSS pixels; the context scaling handles the rest.
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      stacks.forEach(stack => {
        stack.update();
        stack.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize(); // Initial setup
    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.animationCanvas} />;
};

export default BackgroundAnimation;