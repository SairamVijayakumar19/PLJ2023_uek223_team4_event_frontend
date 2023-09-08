import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EventService, { eventData } from '../../Services/EventService';

export default function SimplePaper() {
  const [events, setEvents] = React.useState<eventData[]>([]);

  React.useEffect(() => {
      try {
        EventService.getEvent()
        .then((data)=> {setEvents(data); console.log(data)})

        console.log(events);
      } catch (error) {
        console.error("Fehler beim Abrufen der Events: ", error);
      }
    },
  
 []);

  return (
    <div>
      <h1>Test</h1>
      <Box>
        <Grid container spacing={1}>
          {events.map((event, index) => (
            <Grid item key={index} xs={2} marginTop={"10px"} marginLeft={"45px"}>
              <Paper elevation={0} sx={{ padding: 2 }}>
                <div>{event.eventName}</div>
                <div>{event.guestList}</div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
