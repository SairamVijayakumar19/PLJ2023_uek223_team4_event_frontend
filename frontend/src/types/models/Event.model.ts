import { User } from "./User.model";
export interface eventData {
    id: string;
    eventName: string;
    date: string;
    location: string;
    author: User | null;
  }

  export type createEventData = Omit<eventData,"id">
