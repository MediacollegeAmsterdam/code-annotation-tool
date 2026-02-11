"use client";

import React from "react";
import { motion } from "framer-motion";
import { useXarrow } from "react-xarrows";

export const DraggableBox = ({ label, id }: { label: string, id: string }) => {
    const updateXarrow = useXarrow();

    return (
        <motion.div
            id={id} // Don't forget to add the id!
            drag
            dragElastic={0.2}
            dragMomentum={false}
            onDrag={updateXarrow} // Add this to update arrows while dragging
            className="draggable-box"
            style={{
                width: "fit-content",
                height: "fit-content",
                backgroundColor: "darkgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                cursor: "grab",
                position: "absolute"
            }}
        >
            {label}
        </motion.div>
    );
};