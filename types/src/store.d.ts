interface pluginsObject {
    [key: string]: pluginsFunc;
}
interface pluginsFunc {
    (...key: any): number;
}
interface KeyValueObject {
    [key: string]: any;
}
declare class Sprage {
    protected autoClear: boolean;
    protected exclude: string[];
    static plugins: pluginsObject;
    constructor(option?: KeyValueObject);
    private init;
    static install(name: string, descriptor: any): void;
}
export default Sprage;
