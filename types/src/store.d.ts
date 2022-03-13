declare const date: any;
declare const utils: any;
interface KeyValueObject {
    [key: string]: any;
}
interface tokenObject {
    _Val: string | object;
    _token_: number;
    _count_: number;
}
interface func {
    (key: string, value: string | KeyValueObject): void;
}
interface pluginsFunc {
    (...key: any): number;
}
interface pluginsObject {
    [key: string]: pluginsFunc;
}
declare class Sprage {
    static plugins: pluginsObject;
    constructor();
    get(param: string): any;
    private getFirst;
    set(param: string | KeyValueObject, val?: string | KeyValueObject, expiration?: number): boolean;
    has(key: string): boolean;
    remove(param: string | string[]): boolean;
    private removeItem;
    clear(): void;
    setCount(params: KeyValueObject, count: number): void;
    setOnce(params: KeyValueObject): void;
    setTime(params: KeyValueObject, expiration: number | string): void;
    getAll(): KeyValueObject[];
    forEach(fn: func): void;
    static install(name: string, descriptor: any): void;
}
