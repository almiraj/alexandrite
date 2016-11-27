"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var TimeTableService_1 = require('../service/TimeTableService');
var TimeTableComponent = (function () {
    function TimeTableComponent(timeTableService) {
        this.timeRows = timeTableService.timeRows;
    }
    TimeTableComponent.prototype.calculate = function () {
        for (var i = 0; i < this.timeRows.length; i++) {
            var timeRow = this.timeRows[i];
            timeRow.summary = String(Number(timeRow.end) - Number(timeRow.begin) - Number(timeRow.interval));
        }
    };
    TimeTableComponent = __decorate([
        core_1.Component({
            selector: 'TimeTableComponent',
            template: "\n    <div class=\"table-responsive\">\n      <table class=\"table table-bordered table-striped table-responsive\">\n        <thead class=\"thead-default\">\n          <tr id=\"timeHead\">\n            <th>\u65E5\u4ED8</th>\n            <th>\u958B\u59CB</th>\n            <th>\u7D42\u4E86</th>\n            <th>\u4F11\u61A9</th>\n            <th>\u5408\u8A08</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let timeRow of timeRows; let i = index\" id=\"{{'timeRow' + i}}\">\n            <td id=\"{{'timeRow' + i + 'date'}}\">{{i + 1}}</td>\n            <td><input id=\"{{'timeRow' + i + 'begin'}}\" class=\"form-control\" [(ngModel)]=\"timeRow.begin\" (keyup)=\"calculate()\"></td>\n            <td><input id=\"{{'timeRow' + i + 'end'}}\" class=\"form-control\" [(ngModel)]=\"timeRow.end\" (keyup)=\"calculate()\"></td>\n            <td><input id=\"{{'timeRow' + i + 'interval'}}\" class=\"form-control\" [(ngModel)]=\"timeRow.interval\" (keyup)=\"calculate()\"></td>\n            <td><span id=\"{{'timeRow' + i + 'summary'}}\">{{timeRow.summary}}</span></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [TimeTableService_1.TimeTableService])
    ], TimeTableComponent);
    return TimeTableComponent;
}());
exports.TimeTableComponent = TimeTableComponent;
//# sourceMappingURL=TimeTableComponent.js.map