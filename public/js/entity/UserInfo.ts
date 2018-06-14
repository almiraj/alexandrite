import { TimeSheet } from '../entity/TimeSheet';
import { UserConfig } from '../entity/UserConfig';

export class UserInfo {
  constructor(
    public userId:string,
    public userName:string,
    public userConfig:UserConfig,
    public timeSheets:Array<TimeSheet>
  ) {}
}
