import Process from "classes/Process";

const getProcessTable = (processes: Process[]) => {
  return processes
    .filter(
      (process) =>
        (process.getTurnAroundTime() !== 0 ||
          process.getWaitingTime() !== 0 ||
          !process.getBurstTime()) &&
        process.getJobName() !== "IDLE"
    )
    .sort((processOne, processTwo) =>
      processOne
        .getJobName()
        .toLowerCase()
        .localeCompare(processTwo.getJobName().toLowerCase())
    );
};

export default getProcessTable;
