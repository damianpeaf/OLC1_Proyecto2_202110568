import { LoopStructure, LoopStructureArgs } from "./LoopStructure";
import { VariableDeclaration, VariableAssigment } from '../variable';
import { Breakable, Continueable } from "../../context";
import { Symbols } from "../../elements";

export type ForArgs = LoopStructureArgs & {
    init: VariableDeclaration | VariableAssigment;
    update: VariableAssigment;
}

export class For extends LoopStructure implements Breakable, Continueable {


    private init: VariableDeclaration | VariableAssigment
    private update: VariableAssigment
    public break: boolean;
    public continue: boolean;

    constructor({ init, update, ...args }: ForArgs) {
        super(args);

        this.init = init;
        this.update = update;
        this.break = false;
        this.continue = false;
    }

    public getGrahpvizLabel(): string {
        return `For`;
    }
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode();

        return `
            ${n}INIT [label="inicialización"]
            ${n} -> ${n}INIT

            ${this.linkStatementCustom(this.init, n + 'INIT')}

            ${n}UPDATE [label="actualización"]
            ${n} -> ${n}UPDATE
        `

    }
    public evaluate() {

        this.init.evaluate();
        this.break = false;
        this.context.scopeTrace.newScope({
            reason: "for",
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
                    message: `La condición del for debe ser de tipo booleano, se recibió ${type}`,
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
                this.update.evaluate();

                continue;
            }

            if (this.break || !this.context.callStack.in(this)) {
                break;
            }

            // Update the variable
            this.update.evaluate();
        }

        if (this.context.callStack.in(this)) {
            this.context.callStack.remove(this);
        }

        this.context.scopeTrace.endScope();
    }

}