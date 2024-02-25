import Process from "classes/Process";

// This is a temporary fix for Gantt Chart

const fixRemainingBurst = (processes: Process[]): Process[] => {
  processes.forEach((process) => {
    process.setRemainingBurstTime(process.getBurstTime());
  });
  return processes;
};

export default fixRemainingBurst;
