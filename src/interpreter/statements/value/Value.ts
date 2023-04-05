import { Statement } from '../Statement';
import { NullType, VariableType } from '../../elements';

export abstract class Value extends Statement {

    abstract get type(): VariableType | NullType;
    abstract get value(): any;


    public getGrahpvizLabel(): string {
        return `Valor: \n ${this.type} : ${this.value}`;
    }
    public getGrahpvizEdges(): string {
        return '';
    }

}