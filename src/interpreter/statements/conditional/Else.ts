import { Structure, StructureArgs } from '../Structure';

export type elseArgs = StructureArgs & {
}

export class Else extends Structure {

    constructor({ ...args }: elseArgs) {
        super(args);
    }


    public getGrahpvizLabel(): string {
        return 'Else';
    }
    public getGrahpvizEdges(): string {
        return '';
    }

    public evaluate() {

        this.context.scopeTrace.newScope({
            reason: 'else'
        });

        this.statements.forEach((statement) => statement.evaluate());

        this.context.scopeTrace.endScope();

        return true;
    }

}