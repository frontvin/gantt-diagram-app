import React from "react";
import { Table } from 'semantic-ui-react'

// ****************************************************************
// cell styled component
export const ColoredCell: React.FC<{
  backgroundColor: string;
  onClick: () => void;
}> = ({ children, backgroundColor, onClick }) => {
  return (
    <Table.Cell style={{ backgroundColor }} onClick={onClick}>
      {children}
    </Table.Cell>
  );
};
