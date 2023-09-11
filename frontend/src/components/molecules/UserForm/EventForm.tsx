import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import EventService from "../../../Services/EventService";

export default function EventForm() {
  const { EventId } = useParams();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: "",
      guestList: "",
      eventName: '', 
      date: '',
      location: '',
    },

    onSubmit: (values) => {
      handleSubmit(values.eventName, values.date, values.location);
    },
  });

  const handleSubmit = (eventName: string, date: string, location: string) => {
    EventService.createEvent({
      eventName: eventName,
      date: date,
      location: location,
      id: "",
      guestList: "",
    })
      .then((response) => {
        console.log("response", response);
        navigate("/event");
      })
      .catch((e) => {
        postMessage(e.response.data);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <h1>New Event</h1>

        <label htmlFor="eventName">Event Name</label>

        <input
          id="eventName"
          name="eventName" 
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.eventName}
        />
      </div>

      <div>
        <label htmlFor="date">Date</label>

        <input
          id="date"// Field name should match your initialValues
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
        />
      </div>

      <div>
        <label htmlFor="location">Location</label>

        <input
          id="location"
          name="location" // Field name should match your initialValues
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.location}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
