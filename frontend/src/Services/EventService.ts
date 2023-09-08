import api from "../config/Api";

export type eventData = {
  id: number,
  guestList: string,
  eventName: string,
  date: string,
  location: string
};

const EventService = {
  getEvent: async () => {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      console.error("Fehler beim Abrufen der Events: ", error);
      return [];
    }
  },

  getById: async (id: string | number) => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error("Fehler beim Abrufen des Events nach ID: ", error);
      throw error;
    }
  },

  deleteEventById: async (id: string | number) => {
    try {
      await api.delete(`/events/${id}`);
      console.log("Event erfolgreich gelöscht");
    } catch (error) {
      console.error("Fehler beim Löschen des Events: ", error);
      throw error;
    }
  },

  createEvent: async (params: eventData) => {
    try {
      const res = await api.post("/events", params);
      if (res && res.status === 200) {
        console.log("Event erfolgreich erstellt");
      }
    } catch (error) {
      console.error("Fehler beim Erstellen des Events: ", error);
      throw error;
    }
  },

  updateEvent: async (params: eventData) => {
    try {
      const res = await api.put(`/events/${params.id}`, params);
      if (res && res.status === 200) {
        console.log("Event erfolgreich aktualisiert");
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Events: ", error);
      throw error;
    }
  },
};

export default EventService;
