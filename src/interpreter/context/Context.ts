import { Console, ErrorTable, ScopeTrace, CallStack } from "./";

export class Context {

    public scopeTrace: ScopeTrace;
    public errorTable: ErrorTable;
    public console: Console;
    public callStack: CallStack;

    constructor() {
        this.scopeTrace = new ScopeTrace();
        this.errorTable = new ErrorTable();
        this.console = new Console();
        this.callStack = new CallStack();
    }

}