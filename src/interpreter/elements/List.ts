
import { Object, PrimitiveT, ObjectArgs, Subroutine, Variable, Symbols, SubroutineType, Argument } from ".";
import { Expression } from "../statements/expression";
import { DefaultSubroutine } from "./DefaultSubroutine";

export type ListType = "INT[[]]" | "DOUBLE[[]]" | "STRING[[]]" | "BOOLEAN[[]]" | "CHAR[[]]"

export type ListArgs = Omit<ObjectArgs, 'type'> & {
    primitive: PrimitiveT
}

export class List extends Object {

    public primitive: PrimitiveT;
    public data: Variable[] = [];

    constructor({ primitive, ...args }: ListArgs) {
        const type = primitive + '[[]]'
        super({ type, ...args });
        this.primitive = primitive;
    }

    private add(value: Variable): void {
        this.data.push(value);
    }

    private initDefaultMethods(): void {
        this.methods.set('add', new DefaultSubroutine({
            body: [],
            name: 'add',
            object: this,
            parameters: [new Argument({
                name: 'value',
                type: this.primitive
            })],
            returnType: Symbols.VOID,
            type: SubroutineType.METHOD,
            customCall: (args: Expression[]) => {
                this.add(args[0].evaluate());
                return Symbols.VOID;
            }
        }));
    }

    // TODO: Implement data structure for List
}