import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import EventService from '../../../Services/EventService';
import { createEventData, eventData } from '../../../types/models/Event.model';
import { User } from '../../../types/models/User.model';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';

export default function EventForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(ActiveUserContext)


  const [event, setEvent] = useState<eventData>({
    id: '',
    eventName: '',
    date: '',
    location: '',
    author: user,
    guestList: []
  });

  const formik = useFormik({
    initialValues: {
      id: event.id,
      eventName: event.eventName,
      date: event.date,
      location: event.location,
      author: event.author,
      guestList: event.guestList
    },
    validationSchema: object({
      eventName: string().required().min(2).max(50),
      date: string().required(),
      location: string().required(),
      guestList: string(),
    }),
    onSubmit: (values: eventData) => {
      handleSubmit(values);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const handleSubmit = async (values: eventData) => {
    try {
      if (eventId) {
        await EventService.updateEvent({ ...values, id: eventId });
        console.log('Event erfolgreich aktualisiert');
      } else {
        await EventService.createEvent(values);
        console.log('Event erfolgreich hinzugefügt');
        console.log(values)
      }
      navigate('/event');
    } catch (error) {
      console.error('Fehler beim Speichern des Events: ', error);
    }
  };

  return (
    <div>
      <h1>{eventId ? 'Event bearbeiten' : 'Neues Event erstellen'}</h1>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <TextField
            name="eventName"
            label="Event Name"
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={handleInputChange}
            error={Boolean(formik.touched.eventName && formik.errors.eventName)}
            value={formik.values.eventName}
          />
          {formik.errors.eventName && formik.touched.eventName ? (
            <div style={{ color: 'red' }}>{formik.errors.eventName}</div>
          ) : null}
          <TextField
            name="date"
            label="Date"
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={handleInputChange}
            error={Boolean(formik.touched.date && formik.errors.date)}
            value={formik.values.date}
          />
          {formik.errors.date && formik.touched.date ? (
            <div style={{ color: 'red' }}>{formik.errors.date}</div>
          ) : null}
          <TextField
            name="location"
            label="Location"
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={handleInputChange}
            error={Boolean(formik.touched.location && formik.errors.location)}
            value={formik.values.location}
          />
          {formik.errors.location && formik.touched.location ? (
            <div style={{ color: 'red' }}>{formik.errors.location}</div>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!formik.isValid}
          >
            {eventId ? 'Event aktualisieren' : 'Event erstellen'}
          </Button>
        </Box>
      </form>
    </div>
  );
}
