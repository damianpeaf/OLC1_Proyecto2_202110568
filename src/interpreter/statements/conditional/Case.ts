import { Breakable } from "../../context";
import { Symbols, TypeWiseValueType } from "../../elements";
import { ConditionalStructure, ConditionalStructureArgs } from "./";

export type CaseArgs = ConditionalStructureArgs

type ReferenceValueT = { type: TypeWiseValueType, value: any }

export class Case extends ConditionalStructure implements Breakable {


    // ? Add a reference to the switch statement that this case belongs to
    public break: boolean;
    private _referenceValue: ReferenceValueT;

    constructor({ ...args }: CaseArgs) {
        super(args);
        this.break = false;
        this._referenceValue = {
            type: Symbols.NULL,
            value: null
        }
    }

    set referenceValue(reference: ReferenceValueT) {
        this._referenceValue = reference;
    }

    public getGrahpvizLabel(): string {
        return "Case";
    }
    public getGrahpvizEdges(): string {
        return "";
    }
    public evaluate() {
        this.condition.evaluate();

        const value = this.condition.value;
        const type = this.condition.returnType;

        // ? Reuse binary condition for equality
        if (this._referenceValue.type === type && this._referenceValue.value === value) {
            this.context.callStack.push(this);
            this.context.scopeTrace.newScope({ reason: 'case' })

            for (const s of this.statements) {
                s.evaluate();
                if (!this.context.callStack.in(this)) break;
            }

            if (this.context.callStack.in(this)) {
                this.context.callStack.remove(this);
            }
            this.context.scopeTrace.endScope();
        }
    }

}