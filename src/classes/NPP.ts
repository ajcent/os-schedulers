import Process from "classes/Process";
import Scheduler, { SCHEDULER_NAME } from "classes/Scheduler";
import Comparator from "./Comparator";

class NPPScheduler extends Scheduler {
  constructor() {
    super();
  }

  getName(): SCHEDULER_NAME {
    return SCHEDULER_NAME.NPP;
  }

  runProcess(cpuTime: number, nextArrival: number | null): Process[] {
    const doneProcesses: Process[] = [];
    const { getBestPriority } = new Comparator();

    while (this.getProcessesLength() > 0) {
      if (nextArrival !== null && cpuTime >= nextArrival) return doneProcesses;

      const currentProcess: Process = getBestPriority(this.getProcesses());
      cpuTime += currentProcess.getBurstTime();

      currentProcess.setEndTime(cpuTime);
      currentProcess.setTurnAroundTime();
      currentProcess.setWaitingTime();
      doneProcesses.push(currentProcess);
    }

    return doneProcesses;
  }
}

export default NPPScheduler;
