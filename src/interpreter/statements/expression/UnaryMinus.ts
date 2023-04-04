import { ExpressionReturnType } from './Expression';
import { UnaryExpression } from './UnaryExpression';

export class UnaryMinus extends UnaryExpression {
    get returnType(): ExpressionReturnType {
        throw new Error('Method not implemented.');
    }
    get value(): any {
        throw new Error('Method not implemented.');
    }
    public graphviz(): string {
        throw new Error('Method not implemented.');
    }
    public getGrahpvizLabel(): string {
        throw new Error('Method not implemented.');
    }
    public getGrahpvizEdges(): string {
        throw new Error('Method not implemented.');
    }
    public evaluate() {
        throw new Error('Method not implemented.');
    }

}