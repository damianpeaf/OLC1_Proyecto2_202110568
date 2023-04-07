import { TypeWiseVariableType } from '../../elements';
import { StatementArgs } from '../Statement';
import { Expression } from '../expression';
import { Value } from './';


export type ReferenceT = "DIRECT" | "INCREMENT" | "DECREMENT"

export type ReferenceArgs = StatementArgs & {
    name: string;
    type: ReferenceT;
    index?: Expression | null;
}

export class Reference extends Value {

    private _name: string;
    private _type: ReferenceT;
    private _index: Expression | null;

    constructor({ name, type, index = null, ...args }: ReferenceArgs) {
        super(args);

        this._name = name;
        this._type = type;
        this._index = index;
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