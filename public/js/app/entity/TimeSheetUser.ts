import { TimeSheet } from '../entity/TimeSheet';

export class TimeSheetUser {
  userId: String
  userName: String
  timeSheet: Array<TimeSheet>
}