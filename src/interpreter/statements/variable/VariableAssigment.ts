import { Statement, StatementArgs } from "..";
import { Symbols } from "../../elements";
import { Expression } from "../expression";

type VariableAssigmentT = 'direct' | 'increment' | 'decrement' | 'indexed'

interface Reference {
    name: string;
    index?: Expression | null;
}

export type VariableAssigmentArgs = StatementArgs & {
    type: VariableAssigmentT;
    reference: Reference;
    value?: Expression | null;
}
// TODO: Array and Vector

export class VariableAssigment extends Statement {

    public type: VariableAssigmentT;
    public value: Expression | null;
    public reference: Required<Reference>;

    constructor({ reference: { name, index = null }, value = null, type, ...stmtArgs }: VariableAssigmentArgs) {
        super(stmtArgs);

        this.value = value;
        this.type = type;
        this.reference = { name, index };
    }

    public evaluate() {
        const { name, index } = this.reference;
        const { value } = this;

        const variable = this.context.scopeTrace.getVariable(name);

        if (!variable) {
            this.context.errorTable.addError({
                message: `La variable '${name}' no ha sido declarada`,
                line: this.line,
                column: this.column,
                type: 'Semantico'
            });
            return;
        }

        // Perform the assigment
        switch (this.type) {
            case VariableAssigmentType.DIRECT:
                if (value) {
                    value.evaluate();
                    if (value.validateType(variable.type)) {
                        variable.value = value.value;
                    }
                }
                break;
            case VariableAssigmentType.INCREMENT:
                if (variable.type === Symbols.INT || variable.type === Symbols.DOUBLE) {
                    variable.value += 1;
                } else {
                    this.context.errorTable.addError({
                        message: `La variable ${name} no es de tipo numerico`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                }
                break;
            case VariableAssigmentType.DECREMENT:
                if (variable.type === Symbols.INT || variable.type === Symbols.DOUBLE) {
                    variable.value -= 1;
                }
                else {
                    this.context.errorTable.addError({
                        message: `La variable ${name} no es de tipo numerico`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                }
                break;
            case VariableAssigmentType.INDEXED:
                throw new Error('Not implemented yet');

        }

    }

    public getGrahpvizLabel(): string {
        return 'Asignacion de variable'
    }

    // Note: Use %2B for representing + in graphviz
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode()

        let edges = `
            ${n}I [label="Identificador: ${this.reference.name}"]
            ${n} -> ${n}I
        `

        switch (this.type) {
            case VariableAssigmentType.DIRECT:
                edges += `
    
                ${n}IGUAL [label="="]
                ${n} -> ${n}IGUAL
    
                ${this.value
                        ? this.linkStatement(this.value)
                        : ''
                    }
            `
                break;
            case VariableAssigmentType.INCREMENT:
                edges += `

                ${n}MAS [label="%2B%2B"]
                ${n} -> ${n}MAS	
            `
                break;
            case VariableAssigmentType.DECREMENT:
                edges += `

                ${n}MENOS [label="--"]
                ${n} -> ${n}MENOS
            `
                break;

            case VariableAssigmentType.INDEXED:
                edges += `

                
                ${n}LBRACKET [label="["]
                ${n} -> ${n}LBRACKET

                ${this.reference.index
                        ? this.linkStatement(this.reference.index)
                        : ''
                    }

                ${n}RBRACKET [label="]"]
                ${n} -> ${n}RBRACKET

                ${n}IGUAL [label="="]
                ${n} -> ${n}IGUAL

                ${this.value
                        ? this.linkStatement(this.value)
                        : ''
                    }
            `
                break;
        }

        return edges
    }
}

export class VariableAssigmentType {
    public static readonly DIRECT = 'direct';
    public static readonly INCREMENT = 'increment';
    public static readonly DECREMENT = 'decrement';
    public static readonly INDEXED = 'indexed';
}