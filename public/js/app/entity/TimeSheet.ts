import { TimeRow } from '../entity/TimeRow';

export class TimeSheetUser {
  userId: String
  userName: String
  timeSheet: Array<TimeRow>
}
