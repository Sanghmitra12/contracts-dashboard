import React from 'react';

interface RiskBadgeProps {
  risk: 'Low' | 'Medium' | 'High';
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ risk }) => {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
  
  const riskClasses = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`${baseClasses} ${riskClasses[risk]}`}>
      {risk}
    </span>
  );
};

export default RiskBadge;