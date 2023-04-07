import { PrimitiveT } from '../../elements';
import { StatementArgs } from '../Statement';
import { Value } from './';


type LiteralType = PrimitiveT

export type LiteralArgs = StatementArgs & {
    type: LiteralType,
    value: any
}

export class Literal extends Value {

    public type: LiteralType;
    public value: any;

    constructor({ type, value, ...args }: LiteralArgs) {
        super(args);
        this.type = type;
        this.value = value;
    }


    public evaluate() {
        throw new Error('Method not implemented.');
    }
}