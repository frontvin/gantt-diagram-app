import React from 'react';

// ****************************************************************
// cell styled component
export const ColoredCell: React.FC<{
  backgroundColor: string;
  onClick: () => void;
}> = ({ children, backgroundColor, onClick }) => {
  return (
    <td style={{ backgroundColor }} onClick={onClick}>
      {children}
    </td>
  );
};