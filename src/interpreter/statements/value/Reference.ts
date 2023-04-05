import { VariableType, NullType } from '../../elements';
import { StatementArgs } from '../Statement';
import { Value } from './';


export type ReferenceT = "DIRECT" | "INCREMENT" | "DECREMENT"

export type ReferenceArgs = StatementArgs & {
    name: string;
    type: ReferenceT
}

export class Reference extends Value {

    private _name: string;
    private _type: ReferenceT;

    constructor({ name, type, ...args }: ReferenceArgs) {
        super(args);

        this._name = name;
        this._type = type;
    }

    get type(): VariableType | NullType {
        // Search for the variable type in the context
        throw new Error('Method not implemented.');
    }
    get value(): any {
        // Search for the variable value in the context
        throw new Error('Method not implemented.');
    }

    public getGrahpvizLabel(): string {
        return `Referencia: ${this._name}`;
    }

    public evaluate() {
        throw new Error('Method not implemented.');
    }
}

export class ReferenceType {
    public static readonly DIRECT: ReferenceT = "DIRECT";
    public static readonly INCREMENT: ReferenceT = "INCREMENT";
    public static readonly DECREMENT: ReferenceT = "DECREMENT";
}