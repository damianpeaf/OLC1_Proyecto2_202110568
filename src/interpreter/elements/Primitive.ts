import { VariableArgs } from './Variable';
import { Variable } from './';

export type PrimitiveT = "INT" | "DOUBLE" | "STRING" | "BOOLEAN" | "CHAR"
export class PrimitiveType {

    public static readonly INT: PrimitiveT = "INT";
    public static readonly DOUBLE: PrimitiveT = "DOUBLE";
    public static readonly STRING: PrimitiveT = "STRING";
    public static readonly BOOLEAN: PrimitiveT = "BOOLEAN";
    public static readonly CHAR: PrimitiveT = "CHAR";
}

export type PrimitiveArgs = VariableArgs & {
    type: PrimitiveT;
}
export class Primitive extends Variable {

    public type: PrimitiveT;

    constructor({
        ...args
    }: PrimitiveArgs) {
        super(args);
        this.type = args.type;
    }

}