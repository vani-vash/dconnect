import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import FindMentor from './pages/FindMentor';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <>
          <Dashboard user={user} />
          {user.role === 'mentee' && <FindMentor mentee_id={user.user_id} />}
        </>
      )}
    </div>
  );
}
export default App;
