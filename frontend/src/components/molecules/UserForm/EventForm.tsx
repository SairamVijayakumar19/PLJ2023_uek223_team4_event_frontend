import { useFormik } from 'formik';
import { eventData } from '../../../types/models/Event.model';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

interface EventProps {
  event: eventData;
  submitActionHandler: (values: eventData) => void;
}

const EventForm = ({ event, submitActionHandler }: EventProps) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
        id: event.id,
        eventName: event.eventName || '',
        date: event.date || '',
        location: event.location || '',
        guestList: ''
    },
    validationSchema: object({
      eventName: string().required().min(2).max(50),
      date: string().required(),
      location: string().required(),
    }),
    onSubmit: (values: eventData) => {
      submitActionHandler(values);
    },
    enableReinitialize: true,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ paddingTop: '15px' }}>
          <TextField
            id='eventName'
            label='Event Name'
            variant='outlined'
            sx={{ paddingRight: '10px' }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.eventName && formik.errors.eventName)}
            value={formik.values.eventName}
          />
          {formik.errors.eventName && formik.touched.eventName ? (
            <div style={{ color: 'red' }}>{formik.errors.eventName}</div>
          ) : null}
          <TextField
            id='date'
            label='Date'
            variant='outlined'
            sx={{ paddingRight: '10px' }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.date && formik.errors.date)}
            value={formik.values.date}
          />
          {formik.errors.date && formik.touched.date ? (
            <div style={{ color: 'red' }}>{formik.errors.date}</div>
          ) : null}
          <TextField
            id='location'
            label='Location'
            variant='outlined'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.location && formik.errors.location)}
            value={formik.values.location}
          />

          {formik.errors.location && formik.touched.location ? (
            <div style={{ color: 'red' }}>{formik.errors.location}</div>
          ) : null}
        </Box>
        <div>
          <Button
            sx={{ marginTop: '15px', marginRight: '10px' }}
            variant='contained'
            color='success'
            type='submit'
            disabled={!(formik.dirty && formik.isValid)}
            onClick={() => {
                navigate('/event');
              }}
          >
            {event.id ? 'Save' : 'Add'}
            
          </Button>
          <Button
            sx={{ marginTop: '15px' }}
            variant='contained'
            color='error'
            onClick={() => {
              navigate('/event');
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default EventForm;
