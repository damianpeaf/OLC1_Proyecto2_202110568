import { Statement, StatementArgs } from "..";
import { List, ListType, Primitive, Symbols, Vector } from "../../elements";
import { Expression } from "../expression";

type VariableAssigmentT = 'direct' | 'increment' | 'decrement' | 'indexed'

interface Reference {
    name: string;
    index?: Expression | null;
    indexType?: 'list' | 'vector' | null;
}

export type VariableAssigmentArgs = StatementArgs & {
    type: VariableAssigmentT;
    reference: Reference;
    value?: Expression | null;
}

export class VariableAssigment extends Statement {

    public type: VariableAssigmentT;
    public value: Expression | null;
    public reference: Required<Reference>;

    constructor({ reference: { name, index = null, indexType = null }, value = null, type, ...stmtArgs }: VariableAssigmentArgs) {
        super(stmtArgs);

        this.value = value;
        this.type = type;
        this.reference = { name, index, indexType };
    }

    public evaluate() {
        const { name, index, indexType } = this.reference;
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

                if (!(variable instanceof List || variable instanceof Vector)) {
                    this.context.errorTable.addError({
                        message: `La variable ${name} no es de tipo lista o vector`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                if (variable instanceof List) {
                    if (indexType !== 'list') {
                        this.context.errorTable.addError({
                            message: `La variable ${name} es de tipo lista y no vector`,
                            line: this.line,
                            column: this.column,
                            type: 'Semantico'
                        });
                        return;
                    }
                }

                if (variable instanceof Vector) {
                    if (indexType !== 'vector') {
                        this.context.errorTable.addError({
                            message: `La variable ${name} es de tipo vector y no lista`,
                            line: this.line,
                            column: this.column,
                            type: 'Semantico'
                        });
                        return;
                    }
                }

                if (!index) {
                    throw new Error('Index is null');
                }

                index.evaluate();
                const indexReturnType = index.returnType;

                if (indexReturnType === Symbols.DOUBLE && index.value % 1 !== 0) {
                    this.context.errorTable.addError({
                        message: `El valor ${index.value} no puede ser un indice`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                if (!(indexReturnType === Symbols.INT || indexReturnType === Symbols.DOUBLE)) {
                    this.context.errorTable.addError({
                        message: `El valor ${index.value} de tipo ${indexReturnType} no puede ser un indice`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                if (!variable._initiated) {
                    this.context.errorTable.addError({
                        message: `La variable ${name} no ha sido inicializada`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                if (index.value < 0 || index.value >= variable._items.length) {
                    this.context.errorTable.addError({
                        message: `El indice ${index.value} esta fuera de rango`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                if (value) {
                    if (value.validateType(variable.primitive)) {
                        variable._items[index.value] = {
                            value: value.value,
                            type: variable.primitive
                        };
                    }
                }

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