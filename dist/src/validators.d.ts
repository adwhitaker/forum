export declare type Validator = {
    getError: (value: any) => string;
    validate: (value: any) => boolean;
};
export declare const required: Validator;
