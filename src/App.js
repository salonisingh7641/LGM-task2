
import Loading from './Loading';
import React, { useState } from 'react';
import axios from "axios";
import './App.css'

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = () => {
    setLoading(true);
    axios.get("https://reqres.in/api/users?page=1")
      .then((response) => setUsers(response.data.data))
      .then((response) => new Promise((resolve) => setTimeout(() => resolve(response), 2000)))
      .then(() => setLoading(false));
  };

  return (<>
    <nav>
      <img src={require("./pic.png")} alt="" />
      <h1>E-Cell Team Members</h1>
      <button onClick={loadUsers}>View</button>
    </nav>
    <div className="members">
      {loading ? <Loading />
        : users.length > 0 ? users.map(({ id, first_name, last_name, email, avatar }) => (
          <li key={id}>
            <div className="photo">
              <img src={avatar} alt="" /><br />
              <div className="info">
                Name: {first_name} {last_name} <br />
                Email: {email} <br />
              </div>
            </div>
          </li>
        )) : null}
    </div>
  </>
  )
}
export default App;