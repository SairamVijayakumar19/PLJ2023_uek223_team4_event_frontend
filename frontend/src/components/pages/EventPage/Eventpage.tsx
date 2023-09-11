import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { eventData } from "../../../types/models/Event.model";
import EventService from "../../../Services/EventService";

export default function SimplePaper() {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("../addevent/");
  };

  const [events, setEvents] = React.useState<eventData[]>([]);

  React.useEffect(() => {
    try {
      EventService.getEvent().then((data) => {
        setEvents(data);
        console.log(data);
      });

      console.log(events);
    } catch (error) {
      console.error("Fehler beim Abrufen der Events: ", error);
    }
  }, []);

  const submitActionHandler = (values: eventData) => {
    EventService.createEvent(values).then(() => {
      navigate("/users");
    });
  };

  return (
    <div>
      <h1>Events</h1>
      
      <Button
        size="small"
        color="success"
        variant="contained"
        onClick={handleAdd}
      >
        Add

      </Button>{" "}
      <Box>
        <Grid container spacing={1}>
          {events.map((event, index) => (
            <Grid
              item
              key={index}
              xs={2}
              marginTop={"10px"}
              marginLeft={"45px"}
            >
              <Paper elevation={5} sx={{ padding: 2 }}>
                <h2>{event.eventName}</h2>
                <div>Location: {event.location}</div>
                <div>Date: {event.date}</div>
                <br />
                <button>Edit Event</button>
                <button>Delete Event</button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
