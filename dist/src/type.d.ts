export declare type PublicResourcesType = {
    cssLibs?: string[];
    jsLibs?: string[];
    css?: string;
    js?: string;
};
export declare type FileType = {
    type: string;
    defaultValue?: string;
    cssLibs?: PublicResourcesType['cssLibs'];
    jsLibs?: PublicResourcesType['jsLibs'];
    css?: PublicResourcesType['css'];
    js?: PublicResourcesType['js'];
    urlField?: string;
};
export declare type LoadersType = {
    [key: string]: Array<(context: string) => string>;
};
export declare type DefaultConfigType = {
    theme?: 'light' | 'dark';
    autoRun?: boolean;
    autoRunInterval?: number;
    height?: string;
    editorWidth?: string;
    draggable?: boolean;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
};
export declare type EventsType = {
    onFocus: () => void;
    onBlur: () => void;
    onChange: () => void;
    onLoad: () => void;
};
export declare type OptionsType = {
    el: string | HTMLDivElement;
    files?: {
        [filename: string]: FileType;
    };
    loaders: LoadersType;
    publicResources?: PublicResourcesType;
    defaultConfig?: DefaultConfigType;
    events?: EventsType;
};
