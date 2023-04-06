import { Statement } from '../Statement';
import { TypeWiseValueType } from '../../elements';

export abstract class Value extends Statement {

    abstract get type(): TypeWiseValueType;
    abstract get value(): any;


    public getGrahpvizLabel(): string {
        return `Valor: \n ${this.type} : ${this.value}`;
    }
    public getGrahpvizEdges(): string {
        return '';
    }

}