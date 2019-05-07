import React from "react";

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
