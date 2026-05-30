import React from 'react';

function StatisticsPanel({ users, departments }) {
  return (
    <div className="stats-container">
      <div className="stat-box">
        <strong>Total Users</strong>
        <span>{users.length}</span>
      </div>
      {departments.map(dept => (
        <div key={dept} className="stat-box">
          <strong>{dept}</strong>
          <span>{users.filter(u => u.department === dept).length}</span>
        </div>
      ))}
    </div>
  );
}

export default StatisticsPanel;