import React, { useContext, useEffect } from 'react';
import ActiveUserContext from '../../Contexts/ActiveUserContext';

const SingleUserPage: React.FC = () => {
  const { user, loadActiveUser } = useContext(ActiveUserContext);

  useEffect(() => {
    if (!user) {
      loadActiveUser();
    }
  }, [user, loadActiveUser]);

  return (
    <div>
      <h2>Benutzerprofil</h2>
      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Vorname: {user.firstName}</p>
          <p>Nachname: {user.lastName}</p>
          <p>E-Mail: {user.email}</p>
          <h3>Rollen:</h3>
          <ul>
            {user.roles.map((role) => (
              <li key={role.id}>{role.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Du bist nicht eingeloggt.</p>
      )}
    </div>
  );
};

export default SingleUserPage;