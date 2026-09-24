import React from 'react';
import { Train, GraduationCap, ShoppingCart, UtensilsCrossed, Trees, MapPin, CheckCircle, Info } from 'lucide-react';
import { OneMapAmenities, AmenityItem } from '../types/property';

interface AmenitiesPanelProps {
  amenities: OneMapAmenities;
  town: string;
  postalCode: string;
  onemapStatus?: string;
}

export const AmenitiesPanel: React.FC<AmenitiesPanelProps> = ({
  amenities,
  town,
  postalCode,
  onemapStatus
}) => {
  const {
    mrt_stations = [],
    primary_schools_1km = [],
    primary_schools_2km = [],
    supermarkets = [],
    hawker_centers = [],
    parks = []
  } = amenities;

  const getDistanceColor = (meters: number) => {
    if (meters <= 500) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (meters <= 1000) return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    return 'text-slate-400 bg-slate-800 border-slate-700';
  };

  const getWalkingTime = (meters: number) => {
    // Average walking speed ~ 80 meters/min
    const minutes = Math.max(1, Math.round(meters / 80));
    return `~${minutes} min walk`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              OneMap Spatial Proximity Radar
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              SVY21 Geocoded
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Measured proximity for schools (MOE Phase 2C ballot), transit, groceries, and dining
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>Postal {postalCode} • {town}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Category 1: MRT & Transit */}
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Train className="w-4 h-4" />
              </div>
              <span>MRT & Transit Stations</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {mrt_stations.length} nearby
            </span>
          </div>

          <div className="space-y-2">
            {mrt_stations.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">No MRT stations recorded within 2km</p>
            ) : (
              mrt_stations.map((mrt, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition"
                >
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    {mrt.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                      {getWalkingTime(mrt.distance_meters)}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs font-mono font-semibold border ${getDistanceColor(
                        mrt.distance_meters
                      )}`}
                    >
                      {mrt.distance_meters}m
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Category 2: Primary Schools (1km & 2km MOE priority) */}
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span>Primary Schools (MOE Phase 2C)</span>
            </div>
            <span className="text-xs font-semibold text-amber-400">
              {primary_schools_1km.length} within 1km
            </span>
          </div>

          <div className="space-y-2">
            {primary_schools_1km.length === 0 && primary_schools_2km.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">No primary schools within 2km radius</p>
            ) : (
              <>
                {primary_schools_1km.map((sch, idx) => (
                  <div
                    key={`1km-${idx}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/30 transition"
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-amber-200 block">
                        {sch.name}
                      </span>
                      <span className="text-[10px] text-amber-400/80 font-semibold uppercase">
                        Within 1km (Highest Ballot Priority)
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-xs font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 shrink-0">
                      {sch.distance_meters}m
                    </span>
                  </div>
                ))}

                {primary_schools_2km.slice(0, 2).map((sch, idx) => (
                  <div
                    key={`2km-${idx}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition"
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-slate-300 block">
                        {sch.name}
                      </span>
                      <span className="text-[10px] text-slate-400">Within 1-2km Radius</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-xs font-mono font-semibold bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                      {sch.distance_meters}m
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Category 3: Hawker Centers & Wet Markets */}
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span>Hawker Centers & Food Markets</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Heartland Dining</span>
          </div>

          <div className="space-y-2">
            {hawker_centers.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">Food centers available in wider precinct</p>
            ) : (
              hawker_centers.map((hwk, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition"
                >
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    {hwk.name}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-mono font-semibold border ${getDistanceColor(
                      hwk.distance_meters
                    )} shrink-0`}
                  >
                    {hwk.distance_meters}m
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Category 4: Supermarkets & Daily Groceries */}
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span>Supermarkets & Groceries</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Daily Essentials</span>
          </div>

          <div className="space-y-2">
            {supermarkets.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">Supermarkets available in town centre</p>
            ) : (
              supermarkets.map((sup, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-medium text-slate-200">
                      {sup.name}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-mono font-semibold border ${getDistanceColor(
                      sup.distance_meters
                    )} shrink-0`}
                  >
                    {sup.distance_meters}m
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
