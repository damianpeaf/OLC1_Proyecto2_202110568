import { Subroutine, SubroutineArgs, Symbols, TypeWiseValueType } from '.';
import { Context, Returnable } from '../context';
import { Statement } from '../statements';
import { Expression } from '../statements/expression';

export type DefaultSubroutineArgs = Omit<SubroutineArgs, 'body'> & {
    customCall: (args: CustomArgsI) => any
}

interface CustomArgsI {
    args: Expression[],
    context: Context
}

export class DefaultSubroutine extends Subroutine implements Returnable {

    public customCall: (args: CustomArgsI) => any;

    constructor({ customCall, ...args }: DefaultSubroutineArgs) {
        super({ ...args, body: [] });
        this.customCall = customCall;
    }

    public call(args: Expression[], source: Statement): any {
        const validArgs = this.validateParameters(args, source);

        if (!validArgs) {
            return Symbols.NULL;
        }

        // Note: because is builtin function, we don't need to create a new scope
        const returnValue = this.customCall({
            args,
            context: this.context
        });
        this.return = true;

        if (this.type == 'function') {
            this.returnValue = returnValue;
            this.returnValueType = this.returnType;
            return returnValue;
        } else {
            this.returnValue = Symbols.VOID;
            this.returnValueType = this.returnType;
            return Symbols.VOID;
        }
    }

}