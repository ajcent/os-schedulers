import Process, { QUEUE_LEVEL } from "classes/Process";
import { SCHEDULER_NAME } from "classes/Scheduler";

export const initSchedulers: SCHEDULER_NAME[] = [
  SCHEDULER_NAME.FCFS,
  SCHEDULER_NAME.SJF,
  SCHEDULER_NAME.NPP,
  SCHEDULER_NAME.PEP,
  SCHEDULER_NAME.SRTF,
];

export const initQueueLevels: [number, QUEUE_LEVEL][] = [
  [1, QUEUE_LEVEL.LOW],
  [2, QUEUE_LEVEL.MID],
  [3, QUEUE_LEVEL.HIGH],
];

export const initProcesses: Process[] = [
  new Process("A", 0, 9, 0, QUEUE_LEVEL.LOW),
  new Process("B", 6, 11, 0, QUEUE_LEVEL.LOW),
  new Process("C", 11, 10, 0, QUEUE_LEVEL.LOW),
  new Process("D", 24, 11, 0, QUEUE_LEVEL.LOW),
  new Process("E", 35, 6, 0, QUEUE_LEVEL.LOW),
  new Process("F", 20, 17, 0, QUEUE_LEVEL.LOW),
  new Process("G", 29, 9, 0, QUEUE_LEVEL.LOW),
  new Process("H", 15, 14, 0, QUEUE_LEVEL.LOW),
  new Process("I", 37, 4, 0, QUEUE_LEVEL.LOW),
  new Process("J", 18, 12, 0, QUEUE_LEVEL.LOW),
];

export const processKeys = Object.keys(initProcesses[0]) as (keyof Process)[];

// Test Cases
const mlq2Processes: Process[] = [
  new Process("A", 5, 7, 1, QUEUE_LEVEL.LOW),
  new Process("B", 12, 9, 3, QUEUE_LEVEL.HIGH),
  new Process("C", 0, 8, 1, QUEUE_LEVEL.LOW),
  new Process("D", 17, 5, 3, QUEUE_LEVEL.HIGH),
  new Process("E", 8, 7, 2, QUEUE_LEVEL.HIGH),
];

const mlqProcesses: Process[] = [
  new Process("A", 12, 8, 1, QUEUE_LEVEL.MID),
  new Process("B", 5, 7, 3, QUEUE_LEVEL.HIGH),
  new Process("C", 25, 6, 1, QUEUE_LEVEL.LOW),
  new Process("D", 14, 5, 3, QUEUE_LEVEL.MID),
  new Process("E", 0, 8, 2, QUEUE_LEVEL.MID),
  new Process("F", 20, 4, 1, QUEUE_LEVEL.HIGH),
  new Process("G", 8, 7, 2, QUEUE_LEVEL.HIGH),
  new Process("H", 17, 3, 1, QUEUE_LEVEL.LOW),
];

const rrProcesses: Process[] = [
  new Process("A", 0, 10, 0, QUEUE_LEVEL.HIGH),
  new Process("B", 20, 7, 0, QUEUE_LEVEL.HIGH),
  new Process("C", 6, 8, 0, QUEUE_LEVEL.LOW),
  new Process("D", 29, 11, 0, QUEUE_LEVEL.HIGH),
  new Process("E", 10, 12, 0, QUEUE_LEVEL.LOW),
  new Process("F", 26, 14, 0, QUEUE_LEVEL.HIGH),
  new Process("G", 16, 8, 0, QUEUE_LEVEL.HIGH),
  new Process("H", 34, 14, 0, QUEUE_LEVEL.MID),
];

const rr2Processes: Process[] = [
  new Process("A", 0, 9, 0, QUEUE_LEVEL.HIGH),
  new Process("B", 6, 11, 0, QUEUE_LEVEL.HIGH),
  new Process("C", 11, 10, 0, QUEUE_LEVEL.LOW),
  new Process("D", 24, 11, 0, QUEUE_LEVEL.HIGH),
  new Process("E", 35, 6, 0, QUEUE_LEVEL.LOW),
  new Process("F", 20, 17, 0, QUEUE_LEVEL.HIGH),
  new Process("G", 29, 9, 0, QUEUE_LEVEL.HIGH),
  new Process("H", 15, 14, 0, QUEUE_LEVEL.MID),
  new Process("I", 37, 4, 0, QUEUE_LEVEL.MID),
  new Process("J", 18, 12, 0, QUEUE_LEVEL.MID),
];

const fcfsProcesses: Process[] = [
  new Process("A", 0, 9, 0, QUEUE_LEVEL.HIGH),
  new Process("B", 6, 11, 0, QUEUE_LEVEL.HIGH),
  new Process("C", 11, 10, 0, QUEUE_LEVEL.HIGH),
  new Process("D", 24, 11, 0, QUEUE_LEVEL.HIGH),
  new Process("E", 35, 6, 0, QUEUE_LEVEL.HIGH),
  new Process("F", 20, 17, 0, QUEUE_LEVEL.HIGH),
  new Process("G", 29, 9, 0, QUEUE_LEVEL.HIGH),
  new Process("H", 15, 14, 0, QUEUE_LEVEL.HIGH),
  new Process("I", 37, 4, 0, QUEUE_LEVEL.HIGH),
  new Process("J", 18, 12, 0, QUEUE_LEVEL.HIGH),
];

const sjfProcesses: Process[] = [
  new Process("A", 7, 5, 0, QUEUE_LEVEL.HIGH),
  new Process("B", 4, 6, 0, QUEUE_LEVEL.HIGH),
  new Process("C", 16, 8, 0, QUEUE_LEVEL.HIGH),
  new Process("D", 0, 12, 0, QUEUE_LEVEL.HIGH),
  new Process("E", 18, 2, 0, QUEUE_LEVEL.HIGH),
  new Process("F", 12, 7, 0, QUEUE_LEVEL.HIGH),
  new Process("G", 24, 3, 0, QUEUE_LEVEL.HIGH),
  new Process("H", 4, 8, 0, QUEUE_LEVEL.HIGH),
];

const nppProcesses: Process[] = [
  new Process("A", 0, 8, 5, QUEUE_LEVEL.HIGH),
  new Process("B", 0, 6, 5, QUEUE_LEVEL.HIGH),
  new Process("C", 12, 7, 3, QUEUE_LEVEL.HIGH),
  new Process("D", 22, 6, 1, QUEUE_LEVEL.HIGH),
  new Process("E", 7, 4, 1, QUEUE_LEVEL.HIGH),
  new Process("F", 27, 3, 3, QUEUE_LEVEL.HIGH),
  new Process("G", 17, 7, 2, QUEUE_LEVEL.HIGH),
  new Process("H", 3, 6, 4, QUEUE_LEVEL.HIGH),
  new Process("I", 32, 4, 1, QUEUE_LEVEL.HIGH),
];

const pepProcesses: Process[] = [
  new Process("A", 0, 8, 5, QUEUE_LEVEL.HIGH),
  new Process("B", 0, 6, 5, QUEUE_LEVEL.HIGH),
  new Process("C", 12, 7, 3, QUEUE_LEVEL.HIGH),
  new Process("D", 22, 6, 1, QUEUE_LEVEL.HIGH),
  new Process("E", 7, 4, 1, QUEUE_LEVEL.HIGH),
  new Process("F", 27, 3, 3, QUEUE_LEVEL.HIGH),
  new Process("G", 17, 7, 2, QUEUE_LEVEL.HIGH),
  new Process("H", 3, 6, 4, QUEUE_LEVEL.HIGH),
  new Process("I", 32, 4, 1, QUEUE_LEVEL.HIGH),
];

const srtfProcesses: Process[] = [
  new Process("A", 0, 10, 0, QUEUE_LEVEL.HIGH),
  new Process("B", 20, 7, 0, QUEUE_LEVEL.HIGH),
  new Process("C", 6, 8, 0, QUEUE_LEVEL.HIGH),
  new Process("D", 29, 11, 0, QUEUE_LEVEL.HIGH),
  new Process("E", 10, 12, 0, QUEUE_LEVEL.HIGH),
  new Process("F", 26, 14, 0, QUEUE_LEVEL.HIGH),
  new Process("G", 16, 8, 0, QUEUE_LEVEL.HIGH),
  new Process("H", 34, 14, 0, QUEUE_LEVEL.HIGH),
];
