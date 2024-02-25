import { SCHEDULER_NAME } from "classes/Scheduler";
import Process from "classes/Process";

// This function hides the unnecessary columns based on the chosen scheduler

export type ColumnData = [boolean, boolean, boolean];

const getHiddenCols = (
  schedulers: SCHEDULER_NAME[],
  processes: Process[]
): ColumnData => {
  const columnData: ColumnData = [false, false, false];

  const isNPP = (idx: number) => schedulers[idx] === SCHEDULER_NAME.NPP;
  const isPEP = (idx: number) => schedulers[idx] === SCHEDULER_NAME.PEP;
  columnData[0] = isNPP(0) || isPEP(0);

  if (schedulers[0] === SCHEDULER_NAME.MLQ) {
    columnData[1] = true;
    for (let idx = 1; idx < 4; idx++) {
      columnData[0] = isNPP(idx) || isPEP(idx);
      if (columnData[0]) break;
    }
  }

  for (const process of processes) {
    if (process?.getTurnAroundTime() !== 0 || process?.getWaitingTime() !== 0) {
      columnData[2] = true;
      break;
    }
  }

  return columnData;
};

export default getHiddenCols;
