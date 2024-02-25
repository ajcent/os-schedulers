import { getUniqueKey } from "utils/getUniqueKey";

export enum QUEUE_LEVEL {
  HIGH = "HIGH",
  MID = "MID",
  LOW = "LOW",
}

class Process {
  private jobId: string;
  private jobName: string;
  private arrivalTime: number;
  private burstTime: number;
  private queueLevel: QUEUE_LEVEL | undefined;
  private priority: number;
  private remainingBurstTime: number;
  private endTime: number;
  private turnAroundTime: number;
  private waitingTime: number;

  constructor(
    jobName: string,
    arrivalTime: number,
    burstTime: number,
    priority: number,
    queueLevel: QUEUE_LEVEL | undefined
  ) {
    this.jobId = getUniqueKey();
    this.jobName = jobName;
    this.arrivalTime = arrivalTime;
    this.burstTime = burstTime;
    this.remainingBurstTime = burstTime;
    this.priority = priority;
    this.queueLevel = queueLevel;
    this.endTime = 0;
    this.turnAroundTime = 0;
    this.waitingTime = 0;
  }

  public getJobId(): string {
    return this.jobId;
  }

  public setPriority(value: number): void {
    this.priority = value;
  }

  public getJobName(): string {
    return this.jobName;
  }

  public getArrivalTime(): number {
    return this.arrivalTime;
  }

  public getBurstTime(): number {
    return this.burstTime;
  }

  public getRemainingBurstTime(): number {
    return this.remainingBurstTime;
  }

  public setRemainingBurstTime(remainingBurstTime: number): void {
    this.remainingBurstTime = remainingBurstTime;
  }

  public getQueueLevel(): QUEUE_LEVEL | undefined {
    return this.queueLevel;
  }

  public setQueueLevel(queueLevel: QUEUE_LEVEL | undefined): void {
    this.queueLevel = queueLevel;
  }

  public getPriority(): number {
    return this.priority;
  }

  public getEndTime(): number {
    return this.endTime;
  }

  public setEndTime(endTime: number): void {
    this.endTime = endTime;
  }

  public getTurnAroundTime(): number {
    return this.turnAroundTime;
  }

  public setTurnAroundTime(): void {
    this.turnAroundTime = this.getEndTime() - this.getArrivalTime();
  }

  public getWaitingTime(): number {
    return this.waitingTime;
  }

  public setWaitingTime(): void {
    this.waitingTime = this.getTurnAroundTime() - this.getBurstTime();
  }
}

export default Process;
