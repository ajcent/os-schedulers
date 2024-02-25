import Process from "classes/Process";
import Scheduler, { SCHEDULER_NAME } from "classes/Scheduler";

import Comparator from "./Comparator";

class SJFScheduler extends Scheduler {
  constructor() {
    super();
  }

  getName(): SCHEDULER_NAME {
    return SCHEDULER_NAME.SJF;
  }

  runProcess(cpuTime: number, nextArrival: number | null): Process[] {
    const doneProcesses: Process[] = [];
    const { getBestBurst } = new Comparator();

    while (this.getProcessesLength() > 0) {
      if (nextArrival !== null && cpuTime >= nextArrival) return doneProcesses;

      const process: Process = getBestBurst(this.getProcesses());
      cpuTime += process.getBurstTime();

      process.setEndTime(cpuTime);
      process.setTurnAroundTime();
      process.setWaitingTime();
      doneProcesses.push(process);
    }

    return doneProcesses;
  }
}

export default SJFScheduler;
