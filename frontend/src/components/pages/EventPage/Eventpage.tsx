import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EventService from '../../../Services/EventService';
import UserService from '../../../Services/UserService'; // Importiere den UserService
import { eventData } from '../../../types/models/Event.model';
import { User } from '../../../types/models/User.model';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';

export default function SimplePaper() {
  const navigate = useNavigate();
  const context = useContext(ActiveUserContext);

  const handleAdd = () => {
    navigate('../addevent/');
  };

  const [events, setEvents] = useState<eventData[]>([]);

  useEffect(() => {
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

  const loadUsersForEvents = async () => {
    const eventsWithUsers: eventData[] = [];

    for (const event of events) {
      if (event.author) {
        try {
          const user = await UserService.getUser(event.author.id);
          event.author = user;
        } catch (error) {
          console.error('Fehler beim Laden von Benutzerdaten: ', error);
        }
      }

      eventsWithUsers.push(event);
    }

    setEvents(eventsWithUsers);
  };

  useEffect(() => {
    if (context.user) {
      loadUsersForEvents();
    }
  }, [context.user]);

  function userCanEditEvent(post: eventData, user: User) {
    if (post.author) {
      return user.id === post.author.id;
    }
    return false;
  }

  const deleteEvent = async (id: string | number) => {
    try {
      await EventService.deleteEventById(id);
      loadEvents();
      console.log('Event erfolgreich gelöscht');
    } catch (error) {
      console.error('Fehler beim Löschen des Events: ', error);
    }
  };

  const handleEdit = (id: string) => {
    navigate('/editevent' + id);
  };

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          navigate('/landingsite');
        }}>
        Home
      </Button>

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
          {event.author && (
            <div>
              Author: {event.author.firstName} {event.author.lastName}
            </div>
          )}
          {event.guestList && event.guestList.length > 0 && (
            <div>
              Guests:
              <ul>
                {event.guestList.map((guest, guestIndex) => (
                  <li key={guestIndex}>
                    {guest.firstName} {guest.lastName}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <br />
          {context.user && userCanEditEvent(event, context.user) && (
            <button onClick={() => navigate(`/editevent/${event.id}`)}>Edit Event</button>
          )}
          {context.user && userCanEditEvent(event, context.user) && (
            <button onClick={() => deleteEvent(event.id)}>Delete Event</button>
          )}
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>
    </div>
  );
}
