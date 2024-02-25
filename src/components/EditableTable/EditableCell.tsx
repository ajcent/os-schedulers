import { useState } from "react";
import { processKeys } from "../..";

import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Input,
  Modal,
  NumberInput,
  Stack,
  Table,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Process, { QUEUE_LEVEL } from "classes/Process";

import DropDown from "components/DropDown/DropDown";
import UnstyledNumberInput from "components/Input/UnstyledNumberInput/UnstyledNumberInput";

import getSelectOptions from "utils/getSelectOptions";
import mergeObjectProto from "utils/mergeObjectProto";
import { getUniqueKey } from "utils/getUniqueKey";
import { ColumnData } from "utils/getHiddenCols";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

interface EditableCellProps {
  processes: Process[];
  setProcesses: React.Dispatch<React.SetStateAction<Process[]>>;
  hiddenColumns: ColumnData;
}

function EditableCell(props: EditableCellProps) {
  const { processes, hiddenColumns, setProcesses } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const [processId, setProcessId] = useState(processes[0].getJobId());
  let process = processes.find((process) => processId === process.getJobId())!;

  function handleInput<T>(
    value: T,
    fieldType: keyof Process,
    process: Process
  ) {
    let newValue: Partial<Process> = { [fieldType]: value };

    setProcesses((prevProcesses) =>
      prevProcesses.map((prevProcess) =>
        process.getJobId() === prevProcess.getJobId()
          ? mergeObjectProto(prevProcess, newValue)
          : prevProcess
      )
    );
  }

  const removeProcess = (id: string): void => {
    if (processes.length === 1) return;

    setProcesses((prevProcesses) => {
      let pos = processes.findIndex(
        (process) => process.getJobId() === processId
      );
      pos += pos >= processes.length - 1 ? -1 : 1;

      setProcessId(processes[pos].getJobId());
      return prevProcesses.filter(
        (prevProcess) => prevProcess.getJobId() !== id
      );
    });
  };

  function swapObjects(id: string, adder: number): void {
    const position: number = processes.findIndex(
      (process) => process.getJobId() === id
    );

    // Check if the position is valid
    if (position + adder < 0 || position + adder >= processes.length) {
      console.log("Invalid position");
      return;
    }

    setProcesses((prevProcesses) => {
      const newArray = [...prevProcesses];
      const temp = newArray[position];
      newArray[position] = newArray[position + adder];
      newArray[position + adder] = temp;
      return newArray;
    });
  }

  const insertProcess = (id: string) => {
    setProcesses((processes) => {
      const index = processes.findIndex((process) => id === process.getJobId());
      const firstHalf = processes.slice(0, index + 1);
      const secondHalf = processes.slice(index + 1);

      return [
        ...firstHalf,
        new Process(
          `PRCS${getUniqueKey().substring(6, 9)}`,
          0,
          0,
          0,
          QUEUE_LEVEL.LOW
        ),
        ...secondHalf,
      ];
    });
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title={`Row ${
          processes.findIndex((process) => processId === process.getJobId())! +
          1
        }`}>
        <Stack>
          <Stack>
            <TextInput
              label='Job Name'
              data-autofocus
              error={
                !process.getJobName()
                  ? "Unnamed process receives random name"
                  : ""
              }
              value={process.getJobName()}
              onChange={(event) =>
                handleInput(event.currentTarget.value, processKeys[1], process)
              }
              onBlur={() =>
                !process.getJobName() &&
                handleInput(
                  `PRCS${getUniqueKey().substring(6, 9)}`,
                  processKeys[1],
                  process
                )
              }
            />
            <Input.Wrapper label='Arrival Time'>
              <NumberInput
                allowNegative={false}
                allowDecimal={false}
                thousandSeparator=','
                value={process.getArrivalTime()}
                onChange={(value) =>
                  handleInput(value, processKeys[2], process)
                }
                onBlur={() =>
                  !process.getArrivalTime() &&
                  handleInput(0, processKeys[2], process)
                }
              />
            </Input.Wrapper>
            <Input.Wrapper label='Burst Time'>
              <NumberInput
                allowNegative={false}
                allowDecimal={false}
                thousandSeparator=','
                value={process.getBurstTime()}
                onChange={(value) =>
                  handleInput(value, processKeys[3], process)
                }
              />
            </Input.Wrapper>
            {hiddenColumns[0] && (
              <Input.Wrapper label='Priority'>
                <NumberInput
                  allowNegative={false}
                  allowDecimal={false}
                  thousandSeparator=','
                  value={process.getPriority()}
                  onChange={(value) =>
                    handleInput(value, processKeys[5], process)
                  }
                />
              </Input.Wrapper>
            )}
            {hiddenColumns[1] && (
              <Input.Wrapper label='Queue Level'>
                <DropDown
                  label=''
                  data={getSelectOptions(QUEUE_LEVEL)}
                  onChange={(value) =>
                    handleInput(value, processKeys[4], process)
                  }
                  defaultValue={process.getQueueLevel()!}
                />
              </Input.Wrapper>
            )}
          </Stack>
          <Grid gutter='xs'>
            <Grid.Col span={6}>
              <Button
                fw={100}
                fullWidth
                variant='light'
                aria-label='Up'
                color='indigo'
                onClick={() => swapObjects(process.getJobId(), -1)}>
                Up
              </Button>
            </Grid.Col>

            <Grid.Col span={6}>
              <Button
                fw={100}
                fullWidth
                variant='light'
                aria-label='Down'
                color='indigo'
                onClick={() => swapObjects(process.getJobId(), 1)}>
                Down
              </Button>
            </Grid.Col>

            <Grid.Col span={12}>
              <Button
                fw={100}
                fullWidth
                variant='light'
                aria-label='Add'
                color='teal'
                onClick={() => insertProcess(process.getJobId())}>
                Add Process
              </Button>
            </Grid.Col>

            <Grid.Col span={12}>
              <Button
                disabled={processes.length === 1}
                fw={100}
                fullWidth
                variant='light'
                aria-label='Remove'
                color='red'
                onClick={() => removeProcess(process.getJobId())}>
                Remove Process
              </Button>
            </Grid.Col>

            <Grid.Col span={12}>
              <Button
                fw={100}
                fullWidth
                variant='filled'
                aria-label='Done'
                color='indigo'
                onClick={close}>
                Done
              </Button>
            </Grid.Col>
          </Grid>
        </Stack>
      </Modal>

      {processes.map((process) => (
        <Table.Tr key={process.getJobId()}>
          <Table.Td>
            <Flex gap={4}>
              <Tooltip label='Edit'>
                <ActionIcon
                  variant='light'
                  aria-label='Edit'
                  color='indigo'
                  onClick={() => {
                    setProcessId(() => process.getJobId());
                    open();
                  }}>
                  <MdEdit />
                </ActionIcon>
              </Tooltip>

              <Tooltip label='Move up'>
                <ActionIcon
                  variant='light'
                  aria-label='Move Up'
                  color='indigo'
                  onClick={() => swapObjects(process.getJobId(), -1)}>
                  <FaArrowUp size={14} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label='Move down'>
                <ActionIcon
                  variant='light'
                  aria-label='Move Down'
                  color='indigo'
                  onClick={() => swapObjects(process.getJobId(), 1)}>
                  <FaArrowDown size={14} />
                </ActionIcon>
              </Tooltip>
            </Flex>
          </Table.Td>

          <Table.Td>
            <Tooltip label='Click to edit'>
              <Input
                data-autofocus
                required
                variant='unstyled'
                value={process.getJobName()}
                onChange={(event) =>
                  handleInput(
                    event.currentTarget.value,
                    processKeys[1],
                    process
                  )
                }
                onBlur={() =>
                  !process.getJobName() &&
                  handleInput(
                    `PRCS${getUniqueKey().substring(6, 9)}`,
                    processKeys[1],
                    process
                  )
                }
              />
            </Tooltip>
          </Table.Td>

          <Table.Td>
            <UnstyledNumberInput
              value={process.getArrivalTime()}
              onChange={(value) => handleInput(value, processKeys[2], process)}
              onBlur={() =>
                !process.getArrivalTime() &&
                handleInput(0, processKeys[2], process)
              }
            />
          </Table.Td>

          <Table.Td>
            <UnstyledNumberInput
              value={process.getBurstTime()}
              onChange={(value) => handleInput(value, processKeys[3], process)}
            />
          </Table.Td>

          {hiddenColumns[0] && (
            <Table.Td>
              <UnstyledNumberInput
                value={process.getPriority()}
                onChange={(value) =>
                  handleInput(value, processKeys[5], process)
                }
              />
            </Table.Td>
          )}

          {hiddenColumns[1] && (
            <Table.Td>
              <DropDown
                label=''
                data={getSelectOptions(QUEUE_LEVEL)}
                onChange={(value) =>
                  handleInput(value, processKeys[4], process)
                }
                defaultValue={process.getQueueLevel()!}
                unstyled={true}
              />
            </Table.Td>
          )}

          <Table.Td>
            <Text>{!hiddenColumns[2] ? "?" : process.getTurnAroundTime()}</Text>
          </Table.Td>

          <Table.Td>
            <Text>{!hiddenColumns[2] ? "?" : process.getWaitingTime()}</Text>
          </Table.Td>
        </Table.Tr>
      ))}
    </>
  );
}

export default EditableCell;
