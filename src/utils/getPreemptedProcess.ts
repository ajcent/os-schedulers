import Process from "classes/Process";

// This function returns a preempted process with the value used deducted.

const getPreemptedProcess = (
  process: Process,
  endTime: number,
  burst: number
): Process => {
  const preemptedProcess: Process = new Process(
    process.getJobName(),
    process.getArrivalTime(),
    process.getBurstTime(),
    process.getPriority(),
    process.getQueueLevel()
  );
  preemptedProcess.setRemainingBurstTime(burst);
  preemptedProcess.setEndTime(endTime);
  return preemptedProcess;
};

export default getPreemptedProcess;
