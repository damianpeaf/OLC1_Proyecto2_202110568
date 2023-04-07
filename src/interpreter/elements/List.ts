
import { Object, PrimitiveT, ObjectArgs, Subroutine, Variable, Symbols, SubroutineType, Argument, TypeWiseType } from ".";
import { Builder } from "../ast";
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
        const type = primitive + '[[]]' as TypeWiseType;
        super({ type, ...args });
        this.primitive = primitive;
    }

    private add(value: Variable): void {
        this.data.push(value);
    }

    private initDefaultMethods(): void {
        this.methods.set('add', Builder.element.defaultSubroutine({
            body: [],
            name: 'add',
            object: this,
            parameters: [new Argument({
                name: 'value',
                type: [this.primitive]
            })],
            returnType: Symbols.VOID,
            type: SubroutineType.METHOD,
            customCall: ({ args, context }) => {
                this.add(args[0].evaluate());
            }
        }));
    }

    // TODO: Implement data structure for List
}