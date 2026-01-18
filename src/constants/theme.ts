/**
 * Theme and UI color constants
 */

export const THEME_COLOR = '#424141';
export const INFO_COLOR = '#2B2C28';
export const BACK_COLOR = '#141515';
export const SILVER = '#dfe1e5ff';
export const TEXT_SECONDARY = '#a8adb3';
export const TEXT_TERTIARY = '#868b92';
export const TEXT_MUTED = '#9ca3af';

/**
 * Train component colors
 */
export const TRAIN_BODY_COLOR = THEME_COLOR;
export const TRAIN_BORDER_COLOR = SILVER;
export const TRAIN_WHEEL_COLOR = '#111827';

/**
 * Border opacities (as decimal 0-1)
 */
export const BORDER_OPACITY = {
  subtle: 0.1,
  default: 0.2,
  hover: 0.3,
};

/**
 * Shadow opacities
 */
export const SHADOW_OPACITY = {
  light: 0.1,
  medium: 0.2,
  heavy: 0.3,
};

/**
 * Animation timings (in milliseconds)
 */
export const ANIMATION = {
  sparkFly: 500,
  processImageDelay: 500,
  transitionFast: 300,
  transitionMedium: 500,
  pulseDelay: {
    light1: 0,
    light2: 0.5,
    light3: 1,
    light4: 1.5,
  },
};

/**
 * UI thresholds and numeric values
 */
export const UI = {
  backToTopThreshold: 320,
  observerThreshold: 0.3,
  sparkCount: 8,
  sparkDistance: { min: 20, max: 30 },
  sparkDuration: { min: 0.5, max: 1 },
  sparkAngle: 45,
  borderRadius: {
    default: 'rounded-xl',
    lg: 'rounded-2xl',
    md: 'rounded-md',
  },
  borderOpacities: {
    default: 0.1,
    hover: 0.2,
    active: 0.3,
  },
  shadowOpacities: {
    subtle: 0.1,
    default: 0.2,
    prominent: 0.3,
  },
  animationDelays: {
    staggerSmall: 0.5,
    staggerMedium: 1.0,
    staggerLarge: 1.5,
  },
  cornerAccentLights: {
    size: 12,
    glowIntensity: 10,
  },
  infoBoxShadow: {
    x: 0,
    y: 4,
    blur: 24,
  },
  testimonialGap: 32,
  imageLoadingDuration: 500,
};

/**
 * Analytics
 */
export const GA_ID = 'G-5KXX19NNJM';