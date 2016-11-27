"use strict";
var TimeRow_1 = require('../entity/TimeRow');
var TimeTableService = (function () {
    function TimeTableService() {
        this.timeRows = [
            new TimeRow_1.TimeRow('1000', '1800', '0100', '700'),
            new TimeRow_1.TimeRow('1000', '1830', '0100', '730')
        ];
    }
    TimeTableService.prototype.save = function () {
        alert(this.timeRows[0].begin);
    };
    return TimeTableService;
}());
exports.TimeTableService = TimeTableService;
//# sourceMappingURL=TimeTableService.js.map