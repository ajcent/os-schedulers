import Process from "classes/Process";
import Scheduler, { SCHEDULER_NAME } from "classes/Scheduler";

class FCFSScheduler extends Scheduler {
  constructor() {
    super();
  }

  getName(): SCHEDULER_NAME {
    return SCHEDULER_NAME.FCFS;
  }

  runProcess(cpuTime: number, nextArrival: number | null): Process[] {
    const doneProcesses: Process[] = [];

    while (this.getProcessesLength() > 0) {
      if (nextArrival !== null && cpuTime >= nextArrival) {
        return doneProcesses;
      }

      const currentProcess: Process = this.getProcesses().shift()!;
      cpuTime += currentProcess.getBurstTime();

      currentProcess.setEndTime(cpuTime);
      currentProcess.setTurnAroundTime();
      currentProcess.setWaitingTime();
      doneProcesses.push(currentProcess);
    }

    return doneProcesses;
  }
}

export default FCFSScheduler;
