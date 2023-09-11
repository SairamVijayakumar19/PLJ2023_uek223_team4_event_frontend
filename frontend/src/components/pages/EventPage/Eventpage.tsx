import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { eventData } from '../../../types/models/Event.model';
import EventService from '../../../Services/EventService';

export default function SimplePaper() {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('../addevent/');
  };

  const [events, setEvents] = useState<eventData[]>([]);

  useEffect(() => {
    // Load events when the component mounts
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await EventService.getEvent();
      setEvents(data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Events: ', error);
    }
  };

  const deleteEvent = async (id: string | number) => {
    try {
      await EventService.deleteEventById(id);
      // Reload events after deleting
      loadEvents();
      console.log('Event successfully deleted');
    } catch (error) {
      console.error('Fehler beim Löschen des Events: ', error);
    }
  };

  return (
    <div>
      <h1>Events</h1>

      <Button size="small" color="success" variant="contained" onClick={handleAdd}>
        Add
      </Button>{' '}
      <Box>
        <Grid container spacing={1}>
          {events.map((event, index) => (
            <Grid item key={index} xs={2} marginTop="10px" marginLeft="45px">
              <Paper elevation={5} sx={{ padding: 2 }}>
                <h2>{event.eventName}</h2>
                <div>Location: {event.location}</div>
                <div>Date: {event.date}</div>
                <br />
                <button onClick={() => navigate(`/editevent/${event.id}`)}>Edit Event</button>
                <button onClick={() => deleteEvent(event.id)}>Delete Event</button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
