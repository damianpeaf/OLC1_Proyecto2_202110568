import { TypeWiseValueType } from "../../elements";
import { StatementArgs } from "../Statement";
import { Expression } from "../expression";
import { Value } from "./";

export type InitializerT = 'list' | 'vector'

interface InitializerI {
    values?: Expression[] | null;
    primitive?: TypeWiseValueType;
    reserve?: Expression | null
}


export type InitializerArgs = StatementArgs & {
    initializer: InitializerI
    objectType: InitializerT
};

export class Initializer extends Value {

    public objectType: InitializerT;
    public initializer: Required<InitializerI>;

    constructor({
        objectType,
        initializer: { values = null, primitive = null, reserve = null },
        ...args
    }: InitializerArgs) {
        super(args);
        this.objectType = objectType;
        this.initializer = {
            values,
            primitive,
            reserve
        };

        // TODO: COMPUTE TYPE

        /*
            VECTOR: only values
                    primitive and reserv
            LIST:   primitive
        */
    }

    public getGrahpvizLabel(): string {
        return `Inicializador: \n ${this.type}`;
    }

    public getGrahpvizEdges(): string {
        return '';
    }

    public evaluate() {
        throw new Error("Method not implemented.");
    }
}


export class InitializerType {
    public static readonly VECTOR: InitializerT = 'vector';
    public static readonly LIST: InitializerT = 'list';
}