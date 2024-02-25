import Process from "classes/Process";

export enum SCHEDULER_NAME {
  FCFS = "FCFS",
  SJF = "SJF",
  NPP = "NPP",
  PEP = "PEP",
  SRTF = "SRTF",
  MLQ = "MLQ",
  RR = "RR",
}

abstract class Scheduler {
  private processes: Process[] = [];

  constructor() {
    this.processes = [];
  }

  abstract runProcess(cpuTime: number, nextArrival: number | null): Process[];
  abstract getName(): SCHEDULER_NAME;

  addProcess(process: Process): void {
    this.processes.push(process);
  }

  getProcesses(): Process[] {
    return this.processes;
  }

  getProcessesLength(): number {
    return this.processes.length;
  }

  isEmpty(): boolean {
    return !this.getProcesses().length;
  }
}

export default Scheduler;
