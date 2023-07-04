export interface Exercise {
  id: string;
  name: string;
  restIntervalInSeconds: number;
  equipmentNumber?: number;
  reps: number;
  sets: number;
  weight?: number;
}
