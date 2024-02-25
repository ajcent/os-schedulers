import Process from "classes/Process";

class Comparator {
  getBestPriority(process: Process[]): Process {
    let bestIdx: number = 0,
      tempIdx: number = 0;

    for (let nextIdx = 0; nextIdx < process.length; nextIdx++) {
      let currentProcess: Process = process[tempIdx];
      let nextProcess: Process = process[nextIdx];

      if (nextProcess.getArrivalTime() !== currentProcess.getArrivalTime()) {
        tempIdx =
          nextProcess.getArrivalTime() < currentProcess.getArrivalTime()
            ? nextIdx
            : bestIdx;
      }

      if (nextProcess.getBurstTime() !== currentProcess.getBurstTime()) {
        tempIdx =
          nextProcess.getBurstTime() < currentProcess.getBurstTime()
            ? nextIdx
            : bestIdx;
      }

      if (nextProcess.getPriority() !== currentProcess.getPriority()) {
        tempIdx =
          nextProcess.getPriority() < currentProcess.getPriority()
            ? nextIdx
            : bestIdx;
      }

      bestIdx = tempIdx;
    }

    return process.splice(bestIdx, 1)[0];
  }

  getBestRemainingBurst(process: Process[]): Process {
    let bestIdx: number = 0,
      tempIdx: number = 0;

    for (let nextIdx = 0; nextIdx < process.length; nextIdx++) {
      let currentProcess: Process = process[tempIdx];
      let nextProcess: Process = process[nextIdx];

      if (nextProcess.getArrivalTime() !== currentProcess.getArrivalTime()) {
        tempIdx =
          nextProcess.getArrivalTime() < currentProcess.getArrivalTime()
            ? nextIdx
            : bestIdx;
      }

      if (
        nextProcess.getRemainingBurstTime() !==
        currentProcess.getRemainingBurstTime()
      ) {
        tempIdx =
          nextProcess.getRemainingBurstTime() <
          currentProcess.getRemainingBurstTime()
            ? nextIdx
            : bestIdx;
      }

      bestIdx = tempIdx;
    }

    return process.splice(bestIdx, 1)[0];
  }

  getBestBurst(process: Process[]): Process {
    let bestIdx: number = 0,
      tempIdx: number = 0;

    for (let nextIdx = 0; nextIdx < process.length; nextIdx++) {
      let currentProcess: Process = process[tempIdx];
      let nextProcess: Process = process[nextIdx];

      if (nextProcess.getArrivalTime() !== currentProcess.getArrivalTime()) {
        tempIdx =
          nextProcess.getArrivalTime() < currentProcess.getArrivalTime()
            ? nextIdx
            : bestIdx;
      }

      if (nextProcess.getBurstTime() !== currentProcess.getBurstTime()) {
        tempIdx =
          nextProcess.getBurstTime() < currentProcess.getBurstTime()
            ? nextIdx
            : bestIdx;
      }

      bestIdx = tempIdx;
    }

    return process.splice(bestIdx, 1)[0];
  }
}

export default Comparator;
