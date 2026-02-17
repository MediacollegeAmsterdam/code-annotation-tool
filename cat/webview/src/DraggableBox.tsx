"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useXarrow } from "react-xarrows";

export const DraggableBox = ({ label, id, color, topoffset, leftoffset, onPositionChange }: { label: string, id: string, color?: string, topoffset?: number, leftoffset?: number, onPositionChange?: (top: number, left: number) => void }) => {
    const updateXarrow = useXarrow();
    const boxRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Update arrows when position changes (e.g., from page swap or after drag)
    useEffect(() => {
        if (!isDragging) {
            // Use a small delay to ensure DOM has updated
            const timer = setTimeout(() => {
                updateXarrow();
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [topoffset, leftoffset, isDragging]);

    return (
        <motion.div
            ref={boxRef}
            id={id}
            drag
            dragElastic={0}
            dragMomentum={false}
            style={{
                x,
                y,
                // Essential sizing and wrapping
                width: "auto",
                maxWidth: "250px",      // Prevents the box from going too wide
                minWidth: "80px",       // Keeps it from looking squashed
                height: "auto",
                
                // Visuals
                backgroundColor: color,
                color: "#000",          // Ensuring text is readable on light highlights
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "grab",
                position: "absolute",
                zIndex: 10,             // Keeps labels above the arrows
                
                // Typography
                fontSize: "12px",
                lineHeight: "1.4",
                fontWeight: "500",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                
                // Text behavior
                whiteSpace: "normal",    // Allows text to wrap to the next line
                wordBreak: "break-word", // Ensures long words don't overflow
                overflowWrap: "anywhere",
                top: topoffset || 0,
                left: leftoffset || 0
            }}
            onDragStart={() => setIsDragging(true)}
            onDrag={updateXarrow}
            onDragEnd={() => {
                setIsDragging(false);
                if (onPositionChange) {
                    // Get current transform values
                    const xVal = x.get();
                    const yVal = y.get();
                    
                    // Calculate new position: original position + drag offset
                    const newLeft = (leftoffset || 0) + xVal;
                    const newTop = (topoffset || 0) + yVal;
                    
                    // Save the new position
                    onPositionChange(newTop, newLeft);
                    
                    // Reset the motion values so next render starts fresh
                    x.set(0);
                    y.set(0);
                    
                    // Update arrows after motion values reset and DOM updates
                    requestAnimationFrame(() => {
                        updateXarrow();
                    });
                }
            }}
            whileTap={{ cursor: "grabbing", scale: 0.98 }}
        >
            {label}
        </motion.div>
    );
};