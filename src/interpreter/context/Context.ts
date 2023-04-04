import { Console, ErrorTable, ScopeTrace } from "./";

export class Context {

    public scopeTrace: ScopeTrace;
    public errorTable: ErrorTable;
    public console: Console;

    constructor() {
        this.scopeTrace = new ScopeTrace();
        this.errorTable = new ErrorTable();
        this.console = new Console();
    }

}