import { Table } from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";

import Process from "classes/Process";

import EditableCell from "./EditableCell";

import { ColumnData } from "utils/getHiddenCols";
import countFalse from "utils/countFalse";

interface EditableTableProps {
  processes: Process[];
  setProcesses: React.Dispatch<React.SetStateAction<Process[]>>;
  hiddenColumns: ColumnData;
}

const EditableTable = (props: EditableTableProps) => {
  const { processes, hiddenColumns, setProcesses } = props;
  const focusTrapRef = useFocusTrap();

  return (
    <Table.ScrollContainer minWidth={1000 - countFalse(hiddenColumns) * 100}>
      <Table
        stickyHeader
        highlightOnHover
        layout='fixed'
        verticalSpacing='sm'
        ref={focusTrapRef}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Action</Table.Th>
            <Table.Th>Job Name</Table.Th>
            <Table.Th>Arrival</Table.Th>
            <Table.Th>Burst</Table.Th>
            {hiddenColumns[0] && <Table.Th>Priority</Table.Th>}
            {hiddenColumns[1] && <Table.Th>Queue Level</Table.Th>}
            <Table.Th>Turn-around</Table.Th>
            <Table.Th>Waiting</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <EditableCell
            processes={processes}
            setProcesses={setProcesses}
            hiddenColumns={hiddenColumns}
          />
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default EditableTable;
