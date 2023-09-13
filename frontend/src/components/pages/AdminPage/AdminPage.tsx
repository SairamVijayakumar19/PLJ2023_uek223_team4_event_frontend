import { Box, Container, Link } from "@mui/material";
import { useStyles } from "./AdminPage.style";

const AdminPage = () => {
    const adminPageStyles= useStyles();
    return (
        <Container fixed >
        <Box className={adminPageStyles.contentBox} >
            <h1>Admin Dashboard</h1>
            <Container maxWidth="md" >
              <Link id="manageusers" href="/useredit">Manage Users</Link>
              <br/>
              <Link id="manageevents" href="event">Manage Events</Link>
            </Container>
        </Box>
      </Container>
    );
}

export default AdminPage;