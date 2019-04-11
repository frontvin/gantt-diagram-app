import React from 'react';
import { Table } from "semantic-ui-react";


export const Task: React.FC = () => {

       const tasks = [
         { tastName: "Task 1", timelineLenght: 2 },
         { tastName: "Task 2", timelineLenght: 2 },
         { tastName: "Task 3", timelineLenght: 2 },
         { tastName: "Task 4", timelineLenght: 2 },
         { tastName: "Task 5", timelineLenght: 2 },
         { tastName: "Task 6", timelineLenght: 2 },
         { tastName: "Task 7", timelineLenght: 2 }
       ]; 

         return (
           <Table.Body>
               {tasks.map((task, index) => {
                 return (
                   <Table.Row>
                     <Table.Cell
                       key={index}
                       tastName={task.tastName}
                     >
                       {task.tastName}
                     </Table.Cell>
                     <Table.Cell />
                     <Table.Cell />
                     <Table.Cell />
                     <Table.Cell />
                     <Table.Cell />
                     <Table.Cell />
                     <Table.Cell />
                     <Table.Cell />
                     <Table.Cell />
                     <Table.Cell />
                     <Table.Cell />
                     <Table.Cell />
                   </Table.Row>
                 );
               })}
           </Table.Body>
         );
       };