import { Breakable, Continueable } from "../../context";
import { Symbols } from "../../elements";
import { LoopStructure, LoopStructureArgs } from "./LoopStructure";

export type whileArgs = LoopStructureArgs & {

}

export class While extends LoopStructure implements Breakable, Continueable {

    public break: boolean;
    public continue: boolean;

    constructor({ ...args }: whileArgs) {
        super(args);
        this.break = false;
        this.continue = false;
    }

    public getGrahpvizLabel(): string {
        return "While";
    }
    public getGrahpvizEdges(): string {
        return "";
    }
    public evaluate() {

        this.break = false;
        this.context.scopeTrace.newScope({
            reason: "while",
        })

        this.context.callStack.push(this);

        while (true) {
            // Recompute the condition
            this.condition.evaluate();
            const value = this.condition.value;
            const type = this.condition.returnType;

            if (type !== Symbols.BOOLEAN) {
                this.context.errorTable.addError({
                    type: "Semantico",
                    message: `La condición del while debe ser de tipo booleano, se recibió ${type}`,
                    line: this.line,
                    column: this.column
                })
                break;
            }

            if (!value) {
                break;
            }

            // Execute the body, and check continue and break

            for (const s of this.statements) {
                s.evaluate();

                // Check possible break and continue, or if the call stack has changed (return removed this)
                if (this.continue || this.break || !this.context.callStack.in(this)) {
                    break;
                }
            }

            if (this.continue) {
                this.continue = false;
                continue;
            }

            if (this.break || !this.context.callStack.in(this)) {
                break;
            }

        }

        if (this.context.callStack.in(this)) {
            this.context.callStack.remove(this);
        }

        this.context.scopeTrace.endScope();
    }

}