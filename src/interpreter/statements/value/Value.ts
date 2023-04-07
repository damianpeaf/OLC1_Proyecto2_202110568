import { Statement } from '../Statement';
import { TypeWiseValueType } from '../../elements';

export abstract class Value extends Statement {

    public type: TypeWiseValueType;
    public value: any;


    public getGrahpvizLabel(): string {
        return `Valor: \n ${this.type} : ${this.value}`;
    }
    public getGrahpvizEdges(): string {
        return '';
    }

}