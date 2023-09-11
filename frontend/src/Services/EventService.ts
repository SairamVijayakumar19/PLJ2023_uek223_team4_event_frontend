import api from "../config/Api";
import { eventData } from "../types/models/Event.model";

const EventService = {
  getEvent: async () => {
    try {
      const response = await api.get("/api/events");

      return response.data;
    } catch (error) {
      console.error("ERRORRRRRRRR", error);

      return [];
    }
  },

  getById: async (eventID: string): Promise<eventData> => {
    const { data } = await api.get<eventData>(`/api/${eventID}`);

    return data;
  },

  deleteEventById: async (id: string | number) => {
    return api.delete(`/api/events/${id}`);
  },

  createEvent: async (params: eventData) => {
    const res = await api.post("/api/events", params);

    if (res && res.status === 200) {
      console.log("event successfully created");
    }
  },

  updateEvent: async (params: eventData) => {
    return api.put(`/api/events/${params.id}`, params);
  },
};

export default EventService;
