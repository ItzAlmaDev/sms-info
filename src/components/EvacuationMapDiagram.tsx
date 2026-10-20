import React, { useState } from 'react';
import { Shield, Eye, MapPin, Compass } from 'lucide-react';

export const EvacuationMapDiagram: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'routes' | 'equipment' | 'exits'>('all');

  return (
    <div className="bg-[#0F2C47] border border-[#336E95]/40 rounded-2xl p-4 sm:p-6 shadow-2xl text-white">
      {/* Top Header & Layer Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1A456F]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#62B5DA] font-bold">
              Sample Deliverable
            </span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-xs text-slate-300">Level 2 Facility Schematic</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
            Architectural Emergency Evacuation Diagram
          </h3>
        </div>

        {/* Interactive Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-[#1A456F]/70 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveLayer('all')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeLayer === 'all'
                ? 'bg-[#F4974C] text-[#0F2C47] font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            All Layers
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('routes')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeLayer === 'routes'
                ? 'bg-[#F4974C] text-[#0F2C47] font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Escape Routes
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('equipment')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeLayer === 'equipment'
                ? 'bg-[#F4974C] text-[#0F2C47] font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Equipment
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('exits')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeLayer === 'exits'
                ? 'bg-[#F4974C] text-[#0F2C47] font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Exits & Assembly
          </button>
        </div>
      </div>

      {/* Main SVG Floor Plan Canvas */}
      <div className="relative my-4 bg-[#0B1B2B] rounded-xl border border-[#1A456F] overflow-hidden p-2 sm:p-4">
        <svg 
          viewBox="0 0 800 500" 
          className="w-full h-auto max-h-[520px] select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="archGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1A456F" strokeWidth="0.5" opacity="0.3" />
            </pattern>

            {/* Glowing Escape Route Arrow Marker */}
            <marker id="greenArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10B981" />
            </marker>

            <marker id="secondaryArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#62B5DA" />
            </marker>
          </defs>

          {/* Background Blueprint Grid */}
          <rect width="800" height="500" fill="url(#archGrid)" />

          {/* Outer Boundary Walls */}
          <rect x="50" y="40" width="700" height="420" fill="#0F2C47" fillOpacity="0.5" stroke="#336E95" strokeWidth="6" rx="4" />

          {/* Internal Room Partitions & Labels */}
          {/* Room 1: Conference Room */}
          <rect x="50" y="40" width="220" height="150" fill="#1A456F" fillOpacity="0.4" stroke="#275079" strokeWidth="3" />
          <text x="160" y="115" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="600">CONFERENCE ROOM</text>
          <text x="160" y="132" textAnchor="middle" fill="#62B5DA" fontSize="9">Max Cap: 20 Persons</text>
          {/* Door */}
          <path d="M 230 190 A 30 30 0 0 0 260 160" stroke="#62B5DA" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <line x1="230" y1="190" x2="260" y2="190" stroke="#0B1B2B" strokeWidth="4" />

          {/* Room 2: Server & UPS Room */}
          <rect x="270" y="40" width="160" height="120" fill="#1A456F" fillOpacity="0.6" stroke="#275079" strokeWidth="3" />
          <text x="350" y="95" textAnchor="middle" fill="#F4974C" fontSize="11" fontWeight="700">SERVER ROOM</text>
          <text x="350" y="112" textAnchor="middle" fill="#EF4444" fontSize="9">CO2 Suppressed</text>
          {/* Door */}
          <line x1="330" y1="160" x2="360" y2="160" stroke="#0B1B2B" strokeWidth="4" />

          {/* Room 3: Executive Suite */}
          <rect x="430" y="40" width="170" height="120" fill="#1A456F" fillOpacity="0.4" stroke="#275079" strokeWidth="3" />
          <text x="515" y="105" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="600">DIRECTOR OFFICE</text>

          {/* Main Workstation Open Floor */}
          <rect x="230" y="220" width="370" height="150" fill="#0F2C47" fillOpacity="0.7" stroke="#275079" strokeWidth="2" strokeDasharray="4 4" />
          <text x="415" y="290" textAnchor="middle" fill="#E2E8F0" fontSize="14" fontWeight="700" letterSpacing="1">OPEN WORKSTATION ZONE</text>
          <text x="415" y="310" textAnchor="middle" fill="#62B5DA" fontSize="11">Desks 01–32</text>

          {/* Pantry & Cafeteria */}
          <rect x="50" y="280" width="140" height="180" fill="#1A456F" fillOpacity="0.4" stroke="#275079" strokeWidth="3" />
          <text x="120" y="365" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="600">PANTRY</text>
          <text x="120" y="385" textAnchor="middle" fill="#62B5DA" fontSize="9">Fire Blanket Mounted</text>

          {/* Restrooms */}
          <rect x="630" y="240" width="120" height="220" fill="#1A456F" fillOpacity="0.4" stroke="#275079" strokeWidth="3" />
          <text x="690" y="350" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="600">FACILITIES</text>

          {/* STAIRCASE EXITS */}
          {/* Exit A (North-East Main Exit) */}
          <g>
            <rect x="630" y="40" width="120" height="120" fill="#065F46" fillOpacity="0.3" stroke="#10B981" strokeWidth="3" />
            <rect x="640" y="50" width="100" height="24" fill="#10B981" rx="4" />
            <text x="690" y="66" textAnchor="middle" fill="#064E3B" fontSize="11" fontWeight="800">EXIT A (STAIRS)</text>
            {/* Stair Steps */}
            <line x1="640" y1="85" x2="740" y2="85" stroke="#10B981" strokeWidth="2" />
            <line x1="640" y1="100" x2="740" y2="100" stroke="#10B981" strokeWidth="2" />
            <line x1="640" y1="115" x2="740" y2="115" stroke="#10B981" strokeWidth="2" />
            <line x1="640" y1="130" x2="740" y2="130" stroke="#10B981" strokeWidth="2" />
          </g>

          {/* Exit B (South Emergency Fire Stair) */}
          <g>
            <rect x="230" y="400" width="140" height="60" fill="#065F46" fillOpacity="0.3" stroke="#10B981" strokeWidth="3" />
            <rect x="240" y="420" width="120" height="24" fill="#10B981" rx="4" />
            <text x="300" y="436" textAnchor="middle" fill="#064E3B" fontSize="11" fontWeight="800">EXIT B (FIRE ESCAPE)</text>
          </g>

          {/* LAYER 1: ESCAPE ROUTES (Drawn when layer is 'all' or 'routes') */}
          {(activeLayer === 'all' || activeLayer === 'routes') && (
            <g id="escape-routes">
              {/* Primary Escape Corridor Line to Exit A */}
              <path 
                d="M 270 200 L 610 200 L 630 140" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="4" 
                strokeDasharray="8 6" 
                markerEnd="url(#greenArrow)" 
              />
              <path 
                d="M 415 220 L 415 200" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="3.5" 
                strokeDasharray="6 4" 
                markerEnd="url(#greenArrow)" 
              />
              {/* Secondary Escape Corridor Line to Exit B */}
              <path 
                d="M 415 370 L 415 415 L 370 415" 
                fill="none" 
                stroke="#62B5DA" 
                strokeWidth="3.5" 
                strokeDasharray="6 4" 
                markerEnd="url(#secondaryArrow)" 
              />
              {/* Pantry Escape vector */}
              <path 
                d="M 120 280 L 120 200 L 230 200" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="3.5" 
                strokeDasharray="6 4" 
                markerEnd="url(#greenArrow)" 
              />
            </g>
          )}

          {/* LAYER 2: YOU ARE HERE LOCATION PIN */}
          <g id="you-are-here">
            {/* Ripple Animation */}
            <circle cx="340" cy="200" r="18" fill="#F4974C" fillOpacity="0.2">
              <animate attributeName="r" values="10;24;10" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="340" cy="200" r="8" fill="#F4974C" stroke="#FFFFFF" strokeWidth="2" />
            <rect x="290" y="162" width="100" height="22" rx="4" fill="#F4974C" stroke="#0F2C47" strokeWidth="1" />
            <text x="340" y="177" textAnchor="middle" fill="#0F2C47" fontSize="10" fontWeight="800">YOU ARE HERE</text>
          </g>

          {/* LAYER 3: SAFETY EQUIPMENT ICONS (Drawn when 'all' or 'equipment') */}
          {(activeLayer === 'all' || activeLayer === 'equipment') && (
            <g id="equipment-markers">
              {/* FE-01: Extinguisher at Corridor Intersection */}
              <g transform="translate(470, 185)">
                <rect x="0" y="0" width="28" height="28" rx="4" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                <text x="14" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900">FE</text>
                <text x="14" y="38" textAnchor="middle" fill="#F87171" fontSize="9" fontWeight="700">ABC-4kg</text>
              </g>

              {/* FE-02: CO2 Extinguisher outside Server Room */}
              <g transform="translate(390, 145)">
                <rect x="0" y="0" width="28" height="28" rx="4" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1.5" />
                <text x="14" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">CO2</text>
                <text x="14" y="38" textAnchor="middle" fill="#F87171" fontSize="9" fontWeight="700">2kg</text>
              </g>

              {/* FA-01: First-Aid Box in Main Floor */}
              <g transform="translate(240, 230)">
                <rect x="0" y="0" width="26" height="26" rx="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                <path d="M 13 6 L 13 20 M 6 13 L 20 13" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
                <text x="13" y="36" textAnchor="middle" fill="#34D399" fontSize="8" fontWeight="700">FIRST AID</text>
              </g>

              {/* MCP-01: Manual Call Point */}
              <g transform="translate(600, 185)">
                <circle cx="13" cy="13" r="13" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                <rect x="8" y="8" width="10" height="10" fill="#FFFFFF" />
                <text x="13" y="38" textAnchor="middle" fill="#F87171" fontSize="8" fontWeight="700">ALARM MCP</text>
              </g>
            </g>
          )}

          {/* Compass Rose in Corner */}
          <g transform="translate(80, 70)">
            <circle cx="20" cy="20" r="18" fill="#1A456F" stroke="#62B5DA" strokeWidth="1" />
            <path d="M 20 6 L 24 20 L 20 17 L 16 20 Z" fill="#EF4444" />
            <path d="M 20 34 L 24 20 L 20 23 L 16 20 Z" fill="#94A3B8" />
            <text x="20" y="2" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="800">N</text>
          </g>

          {/* Assembly Point Outdoor Indicator */}
          <g transform="translate(650, 410)">
            <rect x="0" y="0" width="90" height="40" rx="6" fill="#1A456F" stroke="#62B5DA" strokeWidth="1.5" />
            <text x="45" y="16" textAnchor="middle" fill="#62B5DA" fontSize="9" fontWeight="700">OUTDOOR</text>
            <text x="45" y="30" textAnchor="middle" fill="#F4974C" fontSize="10" fontWeight="800">ASSEMBLY 1</text>
          </g>
        </svg>
      </div>

      {/* Map Legend & Practical Reading Notes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs border-t border-[#1A456F]">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-[#10B981] inline-block shrink-0" />
          <span className="text-slate-300">Primary Escape Route</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-[#62B5DA] inline-block shrink-0" />
          <span className="text-slate-300">Secondary Escape Route</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-[#EF4444] inline-block shrink-0" />
          <span className="text-slate-300">Fire Extinguisher Station</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-[#F4974C] inline-block shrink-0" />
          <span className="text-slate-300">Current Viewer Position</span>
        </div>
      </div>
    </div>
  );
};
