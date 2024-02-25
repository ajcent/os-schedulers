import Scheduler, { SCHEDULER_NAME } from "classes/Scheduler";
import FCFS from "classes/FCFS";
import MLQ from "classes/MLQ";
import NPP from "classes/NPP";
import PEP from "classes/PEP";
import RR from "classes/RR";
import SJF from "classes/SJF";
import SRTF from "classes/SRTF";

export const instantiateScheduler = (
  schedulerName: SCHEDULER_NAME
): Scheduler => {
  const schedulerMap: Record<SCHEDULER_NAME, Scheduler> = {
    [SCHEDULER_NAME.FCFS]: new FCFS(),
    [SCHEDULER_NAME.SJF]: new SJF(),
    [SCHEDULER_NAME.NPP]: new NPP(),
    [SCHEDULER_NAME.PEP]: new PEP(),
    [SCHEDULER_NAME.SRTF]: new SRTF(),
    [SCHEDULER_NAME.MLQ]: new MLQ(),
    [SCHEDULER_NAME.RR]: new RR(),
  };

  return schedulerMap[schedulerName];
};

export default instantiateScheduler;
