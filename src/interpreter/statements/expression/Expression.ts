import { VariableType } from "../../elements";
import { Statement, StatementArgs } from "../Statement";
import { SymbolType } from '../../elements/Symbol';

export type ExpressionReturnType = VariableType | SymbolType;

export type ExpressionArgs = StatementArgs

export abstract class Expression extends Statement {

    constructor({ ...args }: ExpressionArgs) {
        super(args);
    }

    // TODO: Unify this on an object
    abstract get returnType(): ExpressionReturnType;
    abstract get value(): any;
}
