export declare const has: (data: object, key: string | number) => boolean;
export declare const debounce: (fn: Function, wait?: number) => (this: unknown) => void;
export declare const getQuery: (search?: string) => {};
export declare const setQuery: (query: {
    [key: string]: string | number;
}) => void;
export declare const ElementGenerator: (innerText: string | undefined, type?: "style" | "script" | undefined) => string | undefined;
export declare const FileLoader: (src: string, type: 'style' | 'script') => Promise<string | undefined>;
export declare const encode: (value: string) => string;
export declare const decode: (value: string) => string;
export declare const define: (obj: object, key: string, cb: () => void) => void;
export declare const isExpectType: (param: any, ...types: string[]) => boolean;
export declare const get: (data: object, strKeys: string) => any;
