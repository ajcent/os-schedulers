import Process from "classes/Process";

const getGanttChart = (processes: Process[]) => {
  const ganttChart = processes.filter(
    (process) =>
      process.getRemainingBurstTime() || process.getJobName() === "IDLE"
  );

  const isAllIdle = ganttChart.every(
    (process) => process.getJobName() === "IDLE"
  );

  return isAllIdle || !ganttChart.length ? undefined : ganttChart;
};

export default getGanttChart;
