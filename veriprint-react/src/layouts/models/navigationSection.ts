import type { navigationItem } from "./navigationItem";

export interface navigationSection {
  id: number;
  text: string;
  icon: string;
  items: navigationItem[];
}