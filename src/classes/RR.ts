import Process from "classes/Process";
import Scheduler, { SCHEDULER_NAME } from "classes/Scheduler";

import getPreemptedProcess from "utils/getPreemptedProcess";

class RRScheduler extends Scheduler {
  private quantumLevelTwo: Process[] = [];
  private quantumLevelThree: Process[] = [];
  private quantumTime: number = 0;

  constructor() {
    super();
  }

  getName(): SCHEDULER_NAME {
    return SCHEDULER_NAME.RR;
  }

  runProcess(cpuTime: number, nextArrival: number | null): Process[] {
    const doneProcesses: Process[] = [];

    while (!this.isEmpty()) {
      let process: Process;
      const isThereArrivingProcess =
        nextArrival !== null && nextArrival <= cpuTime;
      if (isThereArrivingProcess) return doneProcesses;

      if (this.getProcessesLength()) {
        process = this.getProcesses().splice(0, 1)[0];
        if (process.getRemainingBurstTime() <= this.quantumTime) {
          cpuTime += process.getRemainingBurstTime();
        } else {
          this.quantumLevelTwo.push(process);
          cpuTime += this.quantumTime;

          process.setRemainingBurstTime(
            process.getRemainingBurstTime() - this.quantumTime
          );

          const preempted = getPreemptedProcess(
            process,
            cpuTime,
            this.quantumTime
          );

          preempted.getRemainingBurstTime() && doneProcesses.push(preempted);
          continue;
        }
      } else if (this.quantumLevelTwo.length) {
        process = this.quantumLevelTwo.splice(0, 1)[0];
        if (process.getRemainingBurstTime() <= this.quantumTime) {
          cpuTime += process.getRemainingBurstTime();
        } else {
          this.quantumLevelThree.push(process);
          cpuTime += this.quantumTime;

          process.setRemainingBurstTime(
            process.getRemainingBurstTime() - this.quantumTime
          );

          const preempted = getPreemptedProcess(
            process,
            cpuTime,
            this.quantumTime
          );

          doneProcesses.push(preempted);
          continue;
        }
      } else {
        process = this.quantumLevelThree.splice(0, 1)[0];
        cpuTime += process.getRemainingBurstTime();
      }

      if (process) {
        process.setEndTime(cpuTime);
        process.setTurnAroundTime();
        process.setWaitingTime();
        doneProcesses.push(process);
      }
    }
    return doneProcesses;
  }

  override isEmpty(): boolean {
    return (
      !this.getProcessesLength() &&
      !this.quantumLevelTwo.length &&
      !this.quantumLevelThree.length
    );
  }

  setQuantumTime(quantumTime: number) {
    this.quantumTime = quantumTime;
    return this;
  }
}

export default RRScheduler;
