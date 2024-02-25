import runScheduler from "utils/runScheduler";
import instantiateScheduler from "utils/instantiateScheduler";

import { SCHEDULER_NAME } from "classes/Scheduler";
import Process from "classes/Process";
import MLQ from "classes/MLQ";
import RR from "classes/RR";

const manageScheduler = (
  schedulers: SCHEDULER_NAME[],
  processes: Process[],
  quantumTime: [number, number]
) => {
  let result: Process[] = [];
  let scheduler = instantiateScheduler(schedulers[0]);
  const roundRobins: (RR | undefined)[] = [undefined, undefined, undefined];

  for (let i = 1; i < 4; i++) {
    if (schedulers[i] === SCHEDULER_NAME.RR) {
      roundRobins[i - 1] = new RR();
    }
  }

  if (scheduler?.getName() === SCHEDULER_NAME.MLQ) {
    const low = instantiateScheduler(schedulers[1]);
    const mid = instantiateScheduler(schedulers[2]);
    const high = instantiateScheduler(schedulers[3]);

    const mlqScheduler = new MLQ();
    mlqScheduler.setLow(
      !roundRobins[0] ? low : roundRobins[0].setQuantumTime(quantumTime[0])
    );
    mlqScheduler.setMid(
      !roundRobins[1] ? mid : roundRobins[1].setQuantumTime(quantumTime[0])
    );
    mlqScheduler.setHigh(
      !roundRobins[2] ? high : roundRobins[2].setQuantumTime(quantumTime[0])
    );

    return runScheduler(processes, mlqScheduler);
  }

  if (scheduler?.getName() === SCHEDULER_NAME.RR) {
    const rrScheduler = new RR().setQuantumTime(quantumTime[0]);
    return runScheduler(processes, rrScheduler);
  }

  if (!scheduler) return result;
  return runScheduler(processes, scheduler);
};

export default manageScheduler;
