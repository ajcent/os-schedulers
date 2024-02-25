import Process from "classes/Process";
import Scheduler, { SCHEDULER_NAME } from "classes/Scheduler";
import Comparator from "./Comparator";

import getPreemptedProcess from "utils/getPreemptedProcess";

class PEPScheduler extends Scheduler {
  constructor() {
    super();
  }

  getName(): SCHEDULER_NAME {
    return SCHEDULER_NAME.PEP;
  }

  runProcess(cpuTime: number, nextArrival: number | null): Process[] {
    const doneProcesses: Process[] = [];
    const { getBestPriority } = new Comparator();

    while (this.getProcessesLength()) {
      const process: Process = getBestPriority(this.getProcesses());
      cpuTime += process.getRemainingBurstTime();

      const isThereArrivingProcess =
        nextArrival !== null && nextArrival < cpuTime;

      if (isThereArrivingProcess) {
        this.addProcess(process);
        const excessBurst = cpuTime - nextArrival;
        const usedBurst = process.getRemainingBurstTime() - excessBurst;
        process.setRemainingBurstTime(excessBurst);

        const preempted = getPreemptedProcess(process, nextArrival, usedBurst);
        preempted.getRemainingBurstTime() && doneProcesses.push(preempted); // ignore processes with 0 remaining burst time
        return doneProcesses;
      }

      process.setEndTime(cpuTime);
      process.setTurnAroundTime();
      process.setWaitingTime();
      doneProcesses.push(process);
    }

    return doneProcesses;
  }
}

export default PEPScheduler;
