/** Shared editorial easing used across all entrance/homepage motions. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Spring for the project card pointer tilt. */
export const CARD_SPRING = { stiffness: 200, damping: 20, mass: 0.5 } as const;