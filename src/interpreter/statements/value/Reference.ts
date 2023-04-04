import { VariableType, NullType } from '../../elements';
import { StatementArgs } from '../Statement';
import { Value } from './';


export type ReferenceType = "DIRECT" | "INCREMENT" | "DECREMENT"

export type ReferenceArgs = StatementArgs & {
    name: string;
    type: ReferenceType
}

export class Reference extends Value {

    private _name: string;
    private _type: ReferenceType;

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