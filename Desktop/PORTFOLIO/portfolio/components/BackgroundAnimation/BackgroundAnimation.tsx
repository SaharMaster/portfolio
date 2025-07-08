'use client';

import React, { useRef, useEffect } from 'react';
import styles from './BackgroundAnimation.module.scss';

// --- The analogous color palette ---
const analogousPalette = [
  'rgba(123, 0, 255, 0.4)', // Primary accent purple
  'rgba(80, 80, 255, 0.6)',   // Vibrant blue-purple
  'rgba(0, 0, 150, 0.5)',    // Deep, calming blue
  'rgba(200, 50, 200, 0.5)', // Soft, warm pink-purple
  'rgba(255, 150, 255, 0.2)'     // Light, airy pink
];

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let squares: Square[] = [];
    const mouse = { x: -200, y: -200 };

    // --- Square Class ---
    class Square {
      x: number;
      y: number;
      size: number;
      angle: number;
      vx: number; // x velocity
      vy: number; // y velocity
      rotationSpeed: number;
      color: string;
      hasBorder: boolean;

      constructor() {
        this.size = Math.random() * 10 + 10;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.angle = Math.random() * 360;
        this.vx = (Math.random() - 0.5) * 0.5; // slow horizontal drift
        this.vy = -(Math.random() * 0.2 + 0.3); // upward velocity
        this.rotationSpeed = (Math.random() - 0.5) * 0.5;
        
        // Randomly select a color from the palette
        this.color = analogousPalette[Math.floor(Math.random() * analogousPalette.length)];
        
        this.hasBorder = Math.random() > 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.rotationSpeed;

        // Reset square when it goes off-screen
        if (this.y < -this.size || this.x < -this.size || this.x > window.innerWidth + this.size) {
            this.y = window.innerHeight + this.size;
            this.x = Math.random() * window.innerWidth;
            this.angle = Math.random() * 360;
            this.vy = -(Math.random() * 0.7 + 0.3);
        }
      }

      draw() {
        if (!ctx) return;
        const dist = Math.hypot(this.x - mouse.x, this.y - mouse.y);
        const isNear = dist < 80;
        
        ctx.save();
        ctx.translate(this.x, this.y);

        // --- Interactivity Logic ---
        if (isNear) {
          ctx.rotate(0); // Straighten the square
          const scale = 1 + (1 - dist / 150) * 0.3; // Grow bigger when closer
          ctx.scale(scale, scale);
        } else {
          ctx.rotate(this.angle * Math.PI / 180);
        }

        // Draw border only when near, otherwise draw fill + conditional border
        if (isNear) {
          ctx.strokeStyle = `rgba(123, 0, 255, 0.5)`;
          ctx.lineWidth = 1;
          ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else {
          ctx.fillStyle = this.color;
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
          if (this.hasBorder) {
            ctx.strokeStyle = `rgba(123, 0, 255, 0.3)`;
            ctx.lineWidth = 1;
            ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
          }
        }
        ctx.restore();
      }
    }
    
    // --- Animation Setup & Loop ---
    const handleResize = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        squares = [];
        for (let i = 0; i < 10; i++) {
            squares.push(new Square());
        }
    };
    
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      squares.forEach(square => {
        square.update();
        square.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize(); // Initial setup
    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.animationCanvas} />;
};

export default BackgroundAnimation;