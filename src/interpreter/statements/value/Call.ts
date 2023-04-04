import { VariableType, NullType } from '../../elements';
import { StatementArgs } from '../Statement';
import { SubroutineCall } from '../subroutines/SubroutineCall';
import { Value } from './';


export type CallType = "DIRECT" | "INCREMENT" | "DECREMENT"

export type CallArgs = StatementArgs & {
    call: SubroutineCall
}

export class Call extends Value {


    private _call: SubroutineCall;

    constructor({ call, ...args }: CallArgs) {
        super(args);

        this._call = call;
    }

    get type(): VariableType | NullType {
        // Execute the call and return the type
        throw new Error('Method not implemented.');
    }
    get value(): any {
        // Execute the call and return the value
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