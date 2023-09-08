import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import Eventpage from "../components/pages/EventPage/Eventpage";
import EventForm from "../components/molecules/UserForm/EventForm";
import { eventData } from "../types/models/Event.model";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />


      <Route
        path={"/users"}
        element={<PrivateRoute authorities={[]} element={<UserTable />} />}
      />
      <Route
        path="/useredit"
        element={
          <PrivateRoute authorities={[]} element={<UserPage />}></PrivateRoute>
        }
      />
      <Route
        path="/event"
        element={
          <PrivateRoute authorities={[]} element={<Eventpage />}></PrivateRoute>
        }
      />
      <Route
        path="/addevent"
        element={
          <PrivateRoute authorities={[]} element={<EventForm event={{
            id: "",
            guestList: "",
            eventName: "",
            date: "",
            location: ""
          }} submitActionHandler={function (values: eventData): void {
            throw new Error("Function not implemented.");
          } } />}></PrivateRoute>
        }
      />
      <Route
        path="/useredit/:userId"
        element={
          <PrivateRoute authorities={[]} element={<UserPage />}></PrivateRoute>
        }
      />

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
