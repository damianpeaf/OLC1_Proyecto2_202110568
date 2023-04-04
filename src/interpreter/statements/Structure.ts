import { Statement, StatementArgs } from "./Statement";

export type StructureArgs = StatementArgs & {
    statements: Statement[];
};

export abstract class Structure extends Statement {

    private statements: Statement[];

    constructor({ statements, ...args }: StructureArgs) {
        super(args);
        this.statements = statements;
    }

}