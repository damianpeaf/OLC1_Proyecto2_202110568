import { VariableType, NullType } from '../../elements';
import { StatementArgs } from '../Statement';
import { Value } from './';


type LiteralType = VariableType

export type LiteralArgs = StatementArgs & {
    type: LiteralType,
    value: any
}

export class Literal extends Value {

    private _type: LiteralType;
    private _value: any;

    constructor({ type, value, ...args }: LiteralArgs) {
        super(args);
        this._type = type;
        this._value = value;
    }

    get type(): VariableType | NullType {
        return this._type;
    }
    get value(): any {
        return this._value;
    }

    public graphviz(): string {
        throw new Error('Method not implemented.');
    }
    public getGrahpvizLabel(): string {
        throw new Error('Method not implemented.');
    }
    public getGrahpvizEdges(): string {
        throw new Error('Method not implemented.');
    }
    public evaluate() {
        throw new Error('Method not implemented.');
    }
}