import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    trainName: '',
    platformNumber: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/detailOfPlatform');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const res = await fetch('/Values', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error('Failed to add value');
      }
      setFormData({
        trainName: '',
        platformNumber: ''
      });
 
      fetchUsers();
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="App">
      <div>
        <h1>Dashboard for platform</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="trainName"
                placeholder="Train Name"
                value={formData.trainName}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="platformNumber"
                placeholder="Platform Number"
                value={formData.platformNumber}
                onChange={handleChange}
                required
              />
              <button type="submit">Add Value</button>
            </form>
            <ul>
              {users.map((user) => (
                <li key={user.trainName}>
                  {user.trainName} - {user.platformNumber}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
