//import React from 'react';
import { motion } from 'framer-motion';

// Define the valid dot types
type DotType = 'endpoint' | 'transfer' | 'service';

// Define the valid label positions
type LabelPosition = 
  | 'top' | 'bottom' | 'left' | 'right' 
  | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface DotConfig {
  outer: number;
  inner: number;
  hasInner: boolean;
}

interface StationDotProps {
  // New props needed for your subway line
  // index?: number; 
  // lineColor?: string;
  // backColor?: string;
  
  // Existing props
  x?: number; // Made optional since they aren't used in your button list
  y?: number; // Made optional
  type?: DotType;
  active?: boolean;
  onClick?: () => void;
  label?: string;
  sublabel?: string;
  labelPosition?: LabelPosition;
}

const dotTypes: Record<DotType, DotConfig> = {
  endpoint: { outer: 20, inner: 10, hasInner: true },
  transfer: { outer: 16, inner: 8, hasInner: true },
  service: { outer: 12, inner: 0, hasInner: false }
};

export default function StationDot({ 
  index,
  lineColor,
  backColor,
  x = 0, 
  y = 0, 
  type = 'service', 
  active = false, 
  onClick,
  label,
  sublabel,
  labelPosition = 'bottom'
}: StationDotProps) {
  const config = dotTypes[type] || dotTypes.service;
  
  const labelOffsets: Record<LabelPosition, { x: number; y: number; anchor: "start" | "middle" | "end" }> = {
    top: { x: 0, y: -30, anchor: 'middle' },
    bottom: { x: 0, y: 35, anchor: 'middle' },
    left: { x: -20, y: 5, anchor: 'end' },
    right: { x: 20, y: 5, anchor: 'start' },
    'top-left': { x: -15, y: -20, anchor: 'end' },
    'top-right': { x: 15, y: -20, anchor: 'start' },
    'bottom-left': { x: -15, y: 30, anchor: 'end' },
    'bottom-right': { x: 15, y: 30, anchor: 'start' }
  };
  
  const offset = labelOffsets[labelPosition] || labelOffsets.bottom;
  
  return (
    <g 
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      {/* Pulse animation for active state */}
      {active && (
        <motion.circle
          cx={x}
          cy={y}
          r={config.outer + 5}
          fill="none"
          stroke="white"
          strokeWidth="2"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Outer circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={config.outer}
        fill={active ? '#FFD54F' : 'white'}
        stroke="#1a1a1a"
        strokeWidth="3"
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 400 }}
      />
      
      {/* Inner circle for transfer/endpoint */}
      {config.hasInner && (
        <circle
          cx={x}
          cy={y}
          r={config.inner}
          fill="#1a1a1a"
        />
      )}
      
      {/* Label */}
      {label && (
        <g>
          <text
            x={x + offset.x}
            y={y + offset.y}
            textAnchor={offset.anchor}
            className="fill-white text-sm font-semibold"
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            {label}
          </text>
          {sublabel && (
            <text
              x={x + offset.x}
              y={y + offset.y + 16}
              textAnchor={offset.anchor}
              className="fill-gray-400 text-xs"
              style={{ fontSize: '11px', fontStyle: 'italic' }}
            >
              {sublabel}
            </text>
          )}
        </g>
      )}
    </g>
  );
}
