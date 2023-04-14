import { Breakable } from "../../context";
import { Structure, StructureArgs } from "../Structure";

export type DefaultArgs = StructureArgs & {
}

export class Default extends Structure implements Breakable {

    public break: boolean;
    constructor({ ...args }: DefaultArgs) {
        super(args);
        this.break = true;
    }

    public getGrahpvizLabel(): string {
        return "Default";
    }
    public getGrahpvizEdges(): string {
        return "";
    }
    public evaluate() {
        this.context.callStack.push(this);
        this.context.scopeTrace.newScope({ reason: 'default' })

        for (const s of this.statements) {
            s.evaluate();
        }

        if (this.context.callStack.in(this)) this.context.callStack.remove(this);

        this.context.scopeTrace.endScope();
    }
}