import { Statement } from '../Statement';
import { NullType, VariableType } from '../../elements';

export abstract class Value extends Statement {

    abstract get type(): VariableType | NullType;
    abstract get value(): any;

}