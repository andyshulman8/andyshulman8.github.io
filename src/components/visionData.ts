// visionData.ts
/**
 * visionData.ts
 *
 * Purpose: Centralized data store for the vision evolution timeline used in
 * the "Future" case study [4].
 *
 * Data Structure:
 * - visionTimeline: An array of objects representing different stages of a project's
 *   vision. Each object contains a unique 'id' and a 'text' string [6].
 *
 * Consumption Logic (VisionTimeline.tsx):
 * - beforeItem: The first element (index 0), representing the "Original Vision" [5].
 * - afterItem: The final element in the array, representing the "Revised Vision" [5].
 * - middleItems: Any intermediate items between the first and last, which are
 *   rendered as "The Journey" steps [4, 5].
 *
 * Note: Labels like "Original vision" and "Revised Vision" are intentionally
 * commented out in the data objects but preserved to maintain the structural
 * integrity of the original design intent [4, 6].
 */
export const visionTimeline = [
  {
    id: "original",
    // label: 'Original vision',
    text: `A world in which Brazilians approach the future with a sense of possibility 
and optimism because they have confidence in their ability to learn and apply 
scientific concepts, to collaborate across boundaries, and to think creatively.`,
  },
  {
    id: "revised",
    // label: 'Revised Vision',
    text: `A world in which every Brazilian has confidence in their ability to change the future.`,
  },
];
