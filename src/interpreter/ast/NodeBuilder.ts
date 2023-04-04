import { AST } from "./AST";
import { Statement } from "../statements/Statement";



export class NodeBuilder {

    private astRef: AST;
    private nodeCount: number;


    constructor(ast: AST) {
        this.astRef = ast;
        this.nodeCount = 1;
    }

    public create(col: number, line: number) {
        // TODO: Implement
    }

}