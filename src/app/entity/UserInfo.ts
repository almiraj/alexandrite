import { TimeSheet } from '../entity/TimeSheet';
import { UserConfig } from '../entity/UserConfig';

export class UserInfo {
  userId:string
  userConfig:UserConfig
  timeSheets:Array<TimeSheet>
}
