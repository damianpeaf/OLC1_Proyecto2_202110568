import { Structure, StructureArgs } from "../Structure";
import { Expression } from "../expression";


export type ConditionalStructureArgs = StructureArgs & {
    condition: Expression
}

export abstract class ConditionalStructure extends Structure {

    private condition: Expression;

    constructor({ condition, ...args }: ConditionalStructureArgs) {
        super(args);
        this.condition = condition;
    }

}