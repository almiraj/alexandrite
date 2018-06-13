import { TimeSheet } from '../entity/TimeSheet';

export class TimeSheetUser {
  userId:string
  userName:string
  timeSheet: Array<TimeSheet>
}