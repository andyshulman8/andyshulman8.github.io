/**
 * TrainCar Component
 * // Purpose: Represents a single visual unit within the train animation.
 * 
 * Variant System: Supports 'rear', 'middle', and 'front' configurations, each 
 * with distinct geometry and functional rendering logic [2, 6].
 * 
 * Visual Design Decisions:
 * - Windows: Rear cars feature 2 windows, middle cars have 5, and the front 
 *   engine features 1 large window [6, 7].
 * - Geometry: Uses conditional rounding (e.g., 'rounded-l-3xl' for rear, 
 *   'rounded-r-3xl' for front) to define the train's silhouette [7, 8].
 * - Connection Pieces: Rendered on all but the front car using a 'clipPath' 
 *   polygon to simulate mechanical coupling [7, 9].
 * 
 * Animation & Effects:
 * - Red Light: The rear car includes a pulsing red light indicator [7, 10].
 * - Front Engine: Includes a specific "EXPRESS" top label and front light [9].
// Interaction: Hover and interaction states are attached to the entire train
// container, not to a specific car position. In the main app, hovering over the train triggers a 'generateSparks' animation [11].
 * 
 * Style Dependencies:
 * - Relies on theme-specific constants: 'TRAIN_BODY_COLOR', 'TRAIN_BORDER_COLOR', 
 *   and 'TRAIN_WHEEL_COLOR' [6, 7].
 */
import {
  TRAIN_BODY_COLOR,
  TRAIN_BORDER_COLOR,
  TRAIN_WHEEL_COLOR,
} from '../../constants/theme';

interface TrainCarProps {
  variant?: 'rear' | 'middle' | 'front';
}

export const TrainCar = ({ variant = 'middle' }: TrainCarProps) => {
  const isRear = variant === 'rear';
  const isFront = variant === 'front';
  const isMiddle = variant === 'middle';

  // Rear car has 2 windows, middle cars have 5 windows, front car has 1 large window
  const windowCount = isRear ? 2 : isFront ? 1 : 5;
  const hasRedLight = isRear;

  return (
    <div
      className={`relative w-16 h-10 border-2 shadow-lg flex-shrink-0 ${
        isRear ? 'rounded-l-3xl' : isFront ? 'rounded-r-3xl' : ''
      } ${isMiddle ? 'border-y-2 border-r-2' : ''}`}
      style={{
        backgroundColor: TRAIN_BODY_COLOR,
        borderColor: TRAIN_BORDER_COLOR,
      }}
    >
      {/* Side lights */}
      {(!isRear && !isFront) && (
      <div className="absolute top-2 left-3 bottom-3 w-0.5 bg-yellow-400/60" />
      )}
      {(!isRear && !isFront) && (
        <div className="absolute top-2 right-3 bottom-3 w-0.5 bg-yellow-400/60" />
      )}

      {/* Windows */}
      {!isFront && (
        <div className={`absolute top-2 ${isRear ? 'left-3 right-1' : 'left-1 right-1'} h-5 flex ${isRear ? 'gap-0.5' : isMiddle ? 'gap-0.5' : 'gap-0'}`}>
          {Array.from({ length: windowCount }).map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 border border-white/30 bg-white/10 ${
                // Round all rear windows + front's single window
                (isRear || (isFront && i === 0)) ? 'rounded-md' : ''
              }`}
            />
          ))}
          {isMiddle && (
            <>
              <div className="w-1 bg-current opacity-20" />
              <div className="flex-1 border border-white/30 bg-white/10" />
              <div className="w-1 bg-current opacity-20" />
              <div className="flex-1 border border-white/30 bg-white/10" />
            </>
          )}
        </div>
      )}


      {/* Red light indicator (rear only) */}
      {hasRedLight && (
        <div className="absolute top-7 left-2 w-2 h-2 bg-red-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
      )}

      {/* Wheels */}
      <div
        className="absolute -bottom-1.5 left-3 w-2.5 h-2.5 rounded-full border-2"
        style={{
          backgroundColor: TRAIN_WHEEL_COLOR,
          borderColor: TRAIN_BORDER_COLOR,
        }}
      />
      <div
        className={`absolute -bottom-1.5 ${isFront ? 'right-4' : 'right-2.5'} w-${isFront ? '3' : '2.5'} h-${isFront ? '3' : '2.5'} rounded-full border-2`}
        style={{
          backgroundColor: TRAIN_WHEEL_COLOR,
          borderColor: TRAIN_BORDER_COLOR,
          width: '10px',
          height: '10px',
        }}
      />

      {/* Connection piece */}
      {!isFront && (
        <div
          className="absolute -right-1 top-2 bottom-2 w-2 bg-black/40 border-y border-white/20"
          style={{
            clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)',
          }}
        />
      )}

      {/* Front car specific: top label and front light */}
      {isFront && (
        <>
          <div className="absolute top-0 left-0 right-0 h-2 bg-orange-700 flex items-center justify-center rounded-tr-3xl overflow-hidden">
            <div className="text-[8px] font-bold text-white">EXPRESS</div>
          </div>

          <div className="absolute top-3 left-2 right-3 h-4 rounded-md border border-white/40 bg-gradient-to-b from-sky-300/20 to-white/5 shadow-inner" />

          <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2.5 h-2.5 bg-yellow-300 rounded-full shadow-lg animate-pulse border border-yellow-500" />
        </>
      )}
    </div>
  );
};
