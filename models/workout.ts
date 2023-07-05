import { Exercise } from "./exercise";

export interface Workout {
  id: string;
  name: string;
  splits: Split[];
}

export interface Split {
  id: string;
  title: string;
  exercises: Exercise[]
}

export const SPLIT_TYPES = [
  {
    id: 0,
    title: "A",
    label: "Single-split workout. Focus on a single muscle group per week.",
    divisions: 1,
  },
  {
    id: 1,
    title: "AB",
    label: "Two-split workout. Train each muscle group 2x or 3x per week.",
    divisions: 2,
  },
  {
    id: 2,
    title: "ABC",
    label: "Three-split workout. Train each muscle group 1x or 2x per week.",
    divisions: 3,
  },
  {
    id: 3,
    title: "ABCD",
    label: "Four-split workout. Train each muscle group 1x  per week.",
    divisions: 4,
  },
];

export const SPLIT_ORDER = ["A", "B", "C", "D"];
