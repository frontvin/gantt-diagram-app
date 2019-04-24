import React from 'react';

export const ColoredCell: React.FC<{ backgroundColor: string }> = ({
  children,
  backgroundColor
}) => {
  return <td style={{ backgroundColor }}>{children}</td>;
};
