import { User } from "./User.model";

// test
export interface eventData {
    id: string;
    guestList: User[];
    eventName: string;
    date: string;
    location: string;
  }

  export type createEventData = Omit<eventData,"id">

  