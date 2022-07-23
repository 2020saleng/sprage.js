declare class TimeInver {
    private unitList;
    private timeList;
    constructor();
    formatTimeInvert(param: string): any;
    getIndex(param: string): number | undefined;
    afterTime(param: string, index: number): number;
    afterTimeInvert(param: string): number;
    timeInvert(params: string): any;
    timeInvertFn(params: string): any;
}
