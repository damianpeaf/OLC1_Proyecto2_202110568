import { Subroutine, SubroutineArgs, TypeWiseValueType } from '.';
import { Expression } from '../statements/expression';

export type DefaultSubroutineArgs = SubroutineArgs & {
    customCall: (args: Expression[]) => TypeWiseValueType
}

export class DefaultSubroutine extends Subroutine {

    public customCall: (args: Expression[]) => TypeWiseValueType;

    constructor({ customCall, ...args }: DefaultSubroutineArgs) {
        super(args);
        this.customCall = customCall;
    }

    public call(args: Expression[]): any {
        return this.customCall(args);
    }

}