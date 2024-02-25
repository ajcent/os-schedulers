import Process from "classes/Process";
import Scheduler from "classes/Scheduler";

const runScheduler = (
  processes: Process[],
  scheduler: Scheduler
): Process[] => {
  processes.sort((a, b) => a.getArrivalTime() - b.getArrivalTime());

  let ganttChart: Process[] = [];
  let arrivalPointer: number = 0;
  let cpuTime: number = 0;

  while (!scheduler.isEmpty() || !(arrivalPointer >= processes.length)) {
    const hasArrivingProcess: boolean = arrivalPointer < processes.length;
    const isProcessNotArriving: boolean =
      processes[arrivalPointer]?.getArrivalTime() > cpuTime;

    // handles idle state
    if (hasArrivingProcess && scheduler.isEmpty() && isProcessNotArriving) {
      const idle = new Process("IDLE", cpuTime, 0, 0, undefined);
      cpuTime = processes[arrivalPointer].getArrivalTime();
      idle.setEndTime(cpuTime);
      ganttChart.push(idle);
    }

    // gets the available processes according to cpu time
    for (let i = arrivalPointer; arrivalPointer < processes.length; i++) {
      if (processes[i].getArrivalTime() > cpuTime) break;
      if (processes[i].getBurstTime()) {
        scheduler.addProcess(processes[i]);
      } else {
        ganttChart.push(processes[i]);
      }
      arrivalPointer++;
    }

    const nextArrival =
      arrivalPointer < processes.length
        ? processes[arrivalPointer].getArrivalTime()
        : null;
    const doneProcesses = scheduler.runProcess(cpuTime, nextArrival);

    ganttChart.push(...doneProcesses);
    cpuTime += doneProcesses.reduce(
      (sum, p) => sum + p.getRemainingBurstTime(),
      0
    );
  }

  return ganttChart;
};

export default runScheduler;
