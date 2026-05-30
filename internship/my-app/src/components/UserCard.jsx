import React, { useState } from 'react';

function UserCard({ user }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card">
      <div className="card-header">
        <h3>{user.name}</h3>
        <span className="badge">{user.department}</span>
      </div>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      
      <button className="btn-details" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show Less' : 'View Details'}
      </button>

      {isExpanded && (
        <div className="expanded-content">
          <hr />
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>City:</strong> {user.address.city}</p>
        </div>
      )}
    </div>
  );
}

export default UserCard;