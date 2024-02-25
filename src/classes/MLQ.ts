import Process from "classes/Process";
import Scheduler, { SCHEDULER_NAME } from "classes/Scheduler";

export enum QUEUE_LEVEL {
  HIGH = "HIGH",
  MID = "MID",
  LOW = "LOW",
}

type QueueLevel = Scheduler | undefined;

class MLQScheduler extends Scheduler {
  private low: QueueLevel = undefined;
  private mid: QueueLevel = undefined;
  private high: QueueLevel = undefined;

  constructor() {
    super();
  }

  getName(): SCHEDULER_NAME {
    return SCHEDULER_NAME.MLQ;
  }

  runProcess(cpuTime: number, nextArrival: number): Process[] {
    while (this.getProcessesLength() > 0) {
      const newProcess = this.getProcesses().shift()!;
      switch (newProcess.getQueueLevel()) {
        case QUEUE_LEVEL.HIGH:
          if (this.high) this.high.addProcess(newProcess);
          break;
        case QUEUE_LEVEL.MID:
          if (this.mid) this.mid.addProcess(newProcess);
          break;
        case QUEUE_LEVEL.LOW:
          if (this.low) this.low.addProcess(newProcess);
          break;
      }
    }

    if (this.high && !this.high.isEmpty())
      return this.high.runProcess(cpuTime, nextArrival);
    if (this.mid && !this.mid.isEmpty())
      return this.mid.runProcess(cpuTime, nextArrival);
    if (this.low && !this.low.isEmpty())
      return this.low.runProcess(cpuTime, nextArrival);
    return [];
  }

  override isEmpty(): boolean {
    let isEmptyValue = true;
    isEmptyValue = this.high
      ? this.high.isEmpty() && isEmptyValue
      : isEmptyValue;
    isEmptyValue = this.mid ? this.mid.isEmpty() && isEmptyValue : isEmptyValue;
    isEmptyValue = this.low ? this.low.isEmpty() && isEmptyValue : isEmptyValue;
    return isEmptyValue;
  }

  setLow(low: Scheduler): void {
    this.low = low;
  }

  setMid(mid: Scheduler): void {
    this.mid = mid;
  }

  setHigh(high: Scheduler): void {
    this.high = high;
  }
}

export default MLQScheduler;
