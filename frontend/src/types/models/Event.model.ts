import { User } from "./User.model";
export interface eventData {
    id: string;
    eventName: string;
    date: string;
    location: string;
  }

  export type createEventData = Omit<eventData,"id">
