import { Show } from "./Show";

export interface Theatre {
  id: number;
  name: string;
  location: string;
  shows: Show[];
}
