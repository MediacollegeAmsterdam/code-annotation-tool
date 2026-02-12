"use client";

import React from "react";
import { motion } from "framer-motion";
import { useXarrow } from "react-xarrows";

export const DraggableBox = ({ label, id, color, topoffset, leftoffset }: { label: string, id: string, color?: string, topoffset?: number, leftoffset?: number }) => {
    const updateXarrow = useXarrow();

    return (
        <motion.div
            id={id}
            drag
            dragElastic={0.2}
            dragMomentum={false}
            onDrag={updateXarrow}
            style={{
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
            whileTap={{ cursor: "grabbing", scale: 0.98 }}
        >
            {label}
        </motion.div>
    );
};