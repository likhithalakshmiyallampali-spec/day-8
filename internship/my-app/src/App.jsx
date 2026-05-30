import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import StatisticsPanel from './components/StatisticsPanel';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('stikbook_search') || '');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['Development', 'Marketing', 'HR', 'Support'];

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        const mappedUsers = data.map((user, index) => ({
          ...user,
          department: departments[index % departments.length]
        }));
        
        setUsers(mappedUsers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem('stikbook_search', searchQuery);
  }, [searchQuery]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || user.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="container">
      <header>
        <h1>Stikbook User Directory</h1>
      </header>

      <StatisticsPanel users={users} departments={departments} />

      <div className="filter-section">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="dept-tabs">
          <button 
            className={selectedDept === 'All' ? 'active' : ''} 
            onClick={() => setSelectedDept('All')}
          >
            All
          </button>
          {departments.map(dept => (
            <button 
              key={dept} 
              className={selectedDept === dept ? 'active' : ''} 
              onClick={() => setSelectedDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="status-msg">Loading Users...</div>}
      {error && <div className="status-msg error">{error}</div>}
      {!loading && filteredUsers.length === 0 && <div className="status-msg">No Users Found</div>}
      
      <UserList users={filteredUsers} />
    </div>
  );
}

export default App;