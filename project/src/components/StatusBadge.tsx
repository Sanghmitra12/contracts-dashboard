import React from 'react';

interface StatusBadgeProps {
  status: 'Active' | 'Expired' | 'Renewal Due';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
  
  const statusClasses = {
    Active: 'bg-green-100 text-green-800',
    Expired: 'bg-red-100 text-red-800',
    'Renewal Due': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;