export enum PaidOffType {
  ALL = 'ALL',
  AM  = 'AM',
  PM  = 'PM'
}
$.extend(PaidOffType, {
  keys: () => Object.keys(PaidOffType).filter(o => typeof(PaidOffType[o]) != 'function'),
  toLabel: (paidOffType:string) => ({
    ALL: '全休',
    AM:  'AM休',
    PM:  'PM休'
  }[paidOffType])
});
