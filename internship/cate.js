import React, { useState } from 'react';

const UserProfile = ({ user, onDelete }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div style={{ 
      border: '1px solid #ddd', padding: '20px', margin: '15px 0', 
      borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', fontFamily: 'sans-serif' 
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#0073b1' }}>{user.name}</h3>
      <p><strong>Job:</strong> {user.jobTitle}</p>
      <p><strong>Company:</strong> {user.company}</p>

      {showMore && (
        <div style={{ marginTop: '10px', background: '#f9f9f9', padding: '10px' }}>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}

      <div style={{ marginTop: '15px' }}>
        <button onClick={() => setShowMore(!showMore)} style={{ marginRight: '10px' }}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
        <button onClick={() => onDelete(user.id)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Arjun Dev", jobTitle: "Lead Engineer", company: "Tech Corp", email: "arjun@example.com", phone: "98765-43210" },
    { id: 2, name: "Sneha Rao", jobTitle: "UI Designer", company: "Design Studio", email: "sneha@example.com", phone: "91234-56789" },
    { id: 3, name: "Vikram Singh", jobTitle: "Product Manager", company: "Innovate AI", email: "vikram@example.com", phone: "88888-77777" }
  ]);

  const removeUser = (id) => setUsers(users.filter(u => u.id !== id));

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h1>User Connections</h1>
      {users.length > 0 ? (
        users.map(u => <UserProfile key={u.id} user={u} onDelete={removeUser} />)
      ) : (
        <p>No connections remaining.</p>
      )}
    </div>
  );
}