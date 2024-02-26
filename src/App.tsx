import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  MantineProvider,
  Title,
  Group,
  Button,
  ScrollArea,
  Stack,
  NumberInput,
  Flex,
  Modal,
  Text,
  Badge,
  Blockquote,
  Tabs,
} from "@mantine/core";
import "@mantine/core/styles.css";

import { SCHEDULER_NAME } from "classes/Scheduler";
import Process, { QUEUE_LEVEL } from "classes/Process";

import fixRemainingBurst from "utils/fixRemainingBurst";
import manageScheduler from "utils/manageScheduler";
import getHiddenCols from "utils/getHiddenCols";
import mergeObjectProto from "utils/mergeObjectProto";
import getGanttChart from "utils/getGanttChart";
import getProcessTable from "utils/getProcessTable";
import getSelectOptions from "utils/getSelectOptions";

import GanttChart from "components/GanttChart/GanttChart";
import DropDown from "components/DropDown/DropDown";
import EditableTable from "components/EditableTable/EditableTable";
import ThemeButton from "components/Button/ThemeButton/ThemeButton";
import IconText from "components/IconText/IconText";

import {
  initProcesses,
  initSchedulers,
  initQueueLevels,
  processKeys,
} from "./index";

import { IoMdSettings } from "react-icons/io";
import { SiOpslevel } from "react-icons/si";
import { IoPlaySharp } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { FaChartPie } from "react-icons/fa";
import { FaTable } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [modalOpened, { open, close }] = useDisclosure(true);

  const [processes, setProcesses] = useState<Process[]>(initProcesses);
  const [quantumTime, setQuantumTime] = useState<[number, number]>([0, 0]);
  const [ganttChart, setGanttChart] = useState<Process[] | undefined>(
    undefined
  );

  const queueLevels: [number, QUEUE_LEVEL][] = initQueueLevels;
  const [schedulers, setSchedulers] =
    useState<SCHEDULER_NAME[]>(initSchedulers);

  const hiddenColumns = getHiddenCols(schedulers, processes);

  const calculate = () => {
    let result: Process[] | undefined;
    result = manageScheduler(
      schedulers,
      fixRemainingBurst([...processes]),
      quantumTime
    );
    setGanttChart(() => (result ? getGanttChart(result) : undefined));

    if (result) {
      const sortedByJobName = getProcessTable(result);
      setProcesses(() => sortedByJobName);
    }
  };

  const resetCalculation = () => {
    setGanttChart(() => undefined);

    let newValue: Partial<Process> = {
      [processKeys[2]]: 0,
      [processKeys[3]]: 0,
      [processKeys[4]]: QUEUE_LEVEL.LOW,
      [processKeys[5]]: 0,
      [processKeys[6]]: 0,
      [processKeys[7]]: 0,
      [processKeys[8]]: 0,
      [processKeys[9]]: 0,
    };

    setProcesses((prevProcesses) =>
      prevProcesses.map((prevProcess) =>
        mergeObjectProto(prevProcess, newValue)
      )
    );
  };

  const handleSelect = (value: SCHEDULER_NAME, pos: number): void => {
    if (pos < 0 || pos > schedulers.length)
      throw new Error("Position is out of bounds");

    setSchedulers((prev) => [
      ...prev.slice(0, pos),
      value,
      ...prev.slice(pos + 1),
    ]);
  };

  return (
    <div className='App'>
      <MantineProvider
        theme={{
          fontFamily: "Poppins, Verdana, sans-serif",
          fontFamilyMonospace: "Poppins, Monaco, Courier, monospace",
          headings: { fontFamily: "Poppins, Greycliff CF, sans-serif" },
        }}>
        <Modal
          centered
          opened={modalOpened}
          onClose={close}
          title={
            <Text style={{ fontWeight: 600, fontSize: "1.5rem" }}>
              {"Welcome!"}
            </Text>
          }>
          <Stack w='100%'>
            <Text style={{ fontWeight: 300, textAlign: "justify" }}>
              The name is{" "}
              <span style={{ fontWeight: 600 }}>John Lloyd Centeno</span>. I
              hope this can help that person. Talking about you, no one in
              particular! 👀
            </Text>

            <Stack gap={0}>
              <Blockquote
                iconSize={30}
                color='indigo'
                icon={<IoMdInformationCircleOutline size={20} />}
                mt='md'
                cite='– Some Wise Man?'>
                Different learning reference might teach variations in how a
                scheduling algorithm works.
              </Blockquote>
            </Stack>

            <Text style={{ fontWeight: 300, textAlign: "justify" }}>
              With that, please keep in mind that this algorithm is designed
              based on how I was taught.
            </Text>

            <Group gap='sm' mt='md'>
              <Badge
                color='indigo'
                size='lg'
                style={{ textTransform: "none", fontWeight: 400 }}>
                TypeScript
              </Badge>
              <Badge
                color='indigo'
                size='lg'
                style={{ textTransform: "none", fontWeight: 400 }}>
                React Vite
              </Badge>
              <Badge
                color='indigo'
                size='lg'
                style={{ textTransform: "none", fontWeight: 400 }}>
                Mantine UI
              </Badge>
            </Group>
          </Stack>
        </Modal>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 320,
            breakpoint: "md",
            collapsed: { mobile: !opened },
          }}
          padding='md'>
          <AppShell.Header p='md'>
            <Flex align='center' style={{ height: "100%" }}>
              <Burger
                p={0}
                opened={opened}
                onClick={toggle}
                hiddenFrom='md'
                size='sm'
              />
              <Title order={1} size='1.25rem' mr='auto' visibleFrom='sm'>
                Scheduler Calculator
              </Title>
              <Title order={1} size='h5' mr='auto' hiddenFrom='sm'>
                Scheduler Calculator
              </Title>
              <ThemeButton />
            </Flex>
          </AppShell.Header>

          <AppShell.Navbar p='md'>
            <ScrollArea scrollbarSize={8} scrollHideDelay={500}>
              <Group w='100%'>
                <Stack w='100%' gap='5'>
                  <IconText text='Options' icon={<IoMdSettings />} />
                  <Group w='100%' gap='xs'>
                    <DropDown
                      label={
                        <Text
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 400,
                            opacity: 0.6,
                          }}>
                          Select a Scheduler
                        </Text>
                      }
                      data={getSelectOptions(SCHEDULER_NAME)}
                      onChange={(data) => handleSelect(data, 0)}
                      defaultValue={schedulers[0]}
                    />
                    <Group grow w='100%' gap='xs' mb={15}>
                      <>
                        <Button
                          visibleFrom='md'
                          leftSection={<GrPowerReset />}
                          variant='light'
                          color='red'
                          onClick={resetCalculation}>
                          Reset
                        </Button>

                        <Button
                          hiddenFrom='md'
                          leftSection={<GrPowerReset />}
                          variant='light'
                          color='red'
                          onClick={() => {
                            resetCalculation();
                            toggle();
                          }}>
                          Reset
                        </Button>
                      </>

                      <>
                        <Button
                          visibleFrom='md'
                          leftSection={<IoPlaySharp />}
                          onClick={() => {
                            calculate();
                          }}>
                          Calculate
                        </Button>

                        <Button
                          hiddenFrom='md'
                          leftSection={<IoPlaySharp />}
                          onClick={() => {
                            calculate();
                            toggle();
                          }}>
                          Calculate
                        </Button>
                      </>
                    </Group>
                  </Group>
                </Stack>

                {schedulers[0] === SCHEDULER_NAME.MLQ && (
                  <Stack gap='5' w='100%'>
                    <IconText text='Queue Level' icon={<SiOpslevel />} />
                    <Group w='100%' mb={15} gap='xs'>
                      {queueLevels.map(([pos, queueLevel]) => {
                        return (
                          <DropDown
                            key={pos + queueLevel}
                            label={
                              <Text
                                style={{
                                  fontSize: "0.85rem",
                                  fontWeight: 400,
                                  opacity: 0.6,
                                }}>{`Select ${queueLevel}`}</Text>
                            }
                            data={getSelectOptions(SCHEDULER_NAME, [
                              SCHEDULER_NAME.MLQ,
                            ])}
                            onChange={(data) => handleSelect(data, pos)}
                            defaultValue={schedulers[pos]}
                          />
                        );
                      })}
                    </Group>
                  </Stack>
                )}

                {schedulers.some(
                  (scheduler) => scheduler === SCHEDULER_NAME.RR
                ) && (
                  <Stack gap='5' w='100%'>
                    <IconText text='Quantum Time' icon={<IoTime />} />
                    <NumberInput
                      placeholder={`Saved Value : ${quantumTime[0]}`}
                      min={0}
                      max={50}
                      w='100%'
                      label={
                        <Text
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 400,
                            opacity: 0.6,
                          }}>
                          Insert Quantum Time
                        </Text>
                      }
                      value={quantumTime[0]}
                      allowNegative={false}
                      allowDecimal={false}
                      onChange={(value) =>
                        typeof value === "number" &&
                        setQuantumTime((prev) => [value, prev[1]])
                      }
                    />
                  </Stack>
                )}
              </Group>
            </ScrollArea>
          </AppShell.Navbar>

          <AppShell.Main>
            <Tabs defaultValue='table'>
              <Tabs.List>
                <Tabs.Tab value='table' leftSection={<FaTable />}>
                  Table
                </Tabs.Tab>
                <Tabs.Tab value='gantt-chart' leftSection={<FaChartPie />}>
                  Gantt Chart
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value='gantt-chart'>
                {ganttChart && (
                  <Stack mt='xl'>
                    <GanttChart processes={ganttChart} />
                  </Stack>
                )}
              </Tabs.Panel>

              <Tabs.Panel value='table'>
                <Stack mt='xl'>
                  <EditableTable
                    processes={processes}
                    setProcesses={setProcesses}
                    hiddenColumns={hiddenColumns}
                  />
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </div>
  );
}

export default App;
