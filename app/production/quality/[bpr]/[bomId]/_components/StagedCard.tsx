"use client"

import { ExBprStaging } from '@/types/bprStaging';
import React, { useState, useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const StagedCard = ({ staging }: { staging: ExBprStaging }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null); // Reference to the card for constraints
  const x = useMotionValue(0); // Motion value for x-axis drag

  // Transform the card's background color as the user drags
  const backgroundColor = useTransform(x, [0, 150], ['#e2e8f0', '#22c55e']); // Progress from light gray to green
  const approveOpacity = useTransform(x, [100, 150], [0, 1]); // Show "Approve" progressively as user drags

  // Gesture handling with @use-gesture/react, without directly spreading into motion.div
  const bind = useDrag(({ movement: [mx], active, last }) => {
    x.set(mx); // Update the drag position

    if (!active && last && mx > 100) {
      console.log('success');
      setIsSuccess(true); // Handle success case
    } else if (!active && last && mx <= 100) {
      x.set(0); // Reset position if not dragged far enough
    }
  });

  return (
    <motion.div
      drag="x" // Restrict dragging to the x-axis only
      dragConstraints={cardRef} // Restrict dragging to within the card
      style={{ x, backgroundColor }} // Apply motion values for x-axis and background color
      ref={cardRef} // Reference for the drag constraint
      className={`relative flex flex-col gap-y-4 shadow-zinc-300 shadow-lg rounded-lg p-6 cursor-pointer transition-colors duration-300`}
      onPointerDown={bind().onPointerDown}
      onPointerMove={bind().onPointerMove}
      onPointerUp={bind().onPointerUp}
    >
      {/* Approve text, shown progressively as the card is dragged */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white font-bold text-2xl"
        style={{ opacity: approveOpacity }} // Show "Approve" text progressively
      >
        Approve
      </motion.div>

      <span>{staging.quantity} lb</span>
      <h1>Lot: {staging.lot.lotNumber}</h1>
      <span>Staged By {staging.pulledByUser.name}</span>
    </motion.div>
  );
};

export default StagedCard;

