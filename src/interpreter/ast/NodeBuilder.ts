import { AST } from "./AST";
import { VariableAssigment, VariableAssigmentArgs, VariableDeclaration, VariableDeclarationArgs } from "../statements/variable";
import { Case, CaseArgs, Default, DefaultArgs, Else, ElseIf, ElseIfArgs, If, Switch, SwitchArgs, elseArgs, ifArgs } from "../statements/conditional";
import { Argument, ArgumentArgs, ObjectSubroutineCall, ObjectSubroutineCallArgs, SubroutineDeclaration, SubroutineDeclarationArgs } from "../statements/subroutines";
import { SubroutineCall, SubroutineCallArgs } from "../statements/subroutines/SubroutineCall";
import { DoWhile, DoWhileArgs, For, ForArgs, While, whileArgs } from "../statements/loop";
import { Break, BreakArgs, Continue, ContinueArgs, Return, ReturnArgs } from "../statements/flow-control";
import { UnaryMinus, UnaryExpressionArgs, UnaryNegation, TerminalExpression, TerminalExpressionArgs, ArithmeticExpression, ArithmeticExpressionArgs, LogicalExpression, LogicalExpressionArgs, TernaryExpressionArgs, TernaryExpression, RelationalExpression, RelationalExpressionArgs, CastArgs } from "../statements/expression";
import { Call, CallArgs, Initializer, InitializerArgs, Literal, LiteralArgs, Reference, ReferenceArgs } from "../statements/value";
import { Root, RootArgs } from "./Root";
import { Cast } from "../statements/expression";
import { MainArgs } from "../statements";
import { Main } from '../statements/Main';

type BuilderArgs<Type> = Omit<Type, 'id' | 'context'>;

export class NodeBuilder {

    public astRef: AST;
    public nodeCount: number;


    constructor(ast: AST) {
        this.astRef = ast;
        this.nodeCount = 1;
    }

    private addMissingArgs<T>(args: T) {
        return {
            ...args,
            id: this.nodeCount++,
            context: this.astRef.context,
        };
    }

    root(args: BuilderArgs<RootArgs>) {
        return new Root(this.addMissingArgs(args));
    }

    variableDcl(args: BuilderArgs<VariableDeclarationArgs>) {
        return new VariableDeclaration(this.addMissingArgs(args));
    }

    variableAss(args: BuilderArgs<VariableAssigmentArgs>) {
        return new VariableAssigment(this.addMissingArgs(args));
    }

    if(args: BuilderArgs<ifArgs>) {
        return new If(this.addMissingArgs(args));
    }

    elseIf(args: BuilderArgs<ElseIfArgs>) {
        return new ElseIf(this.addMissingArgs(args));
    }

    else(args: BuilderArgs<elseArgs>) {
        return new Else(this.addMissingArgs(args));
    }

    switch(args: BuilderArgs<SwitchArgs>) {
        return new Switch(this.addMissingArgs(args));
    }

    case(args: BuilderArgs<CaseArgs>) {
        return new Case(this.addMissingArgs(args));
    }

    default(args: BuilderArgs<DefaultArgs>) {
        return new Default(this.addMissingArgs(args));
    }

    argument(args: BuilderArgs<ArgumentArgs>) {
        return new Argument(this.addMissingArgs(args));
    }

    subroutineCall(args: BuilderArgs<SubroutineCallArgs>) {
        return new SubroutineCall(this.addMissingArgs(args));
    }

    subroutineDcl(args: BuilderArgs<SubroutineDeclarationArgs>) {
        return new SubroutineDeclaration(this.addMissingArgs(args));
    }

    doWhile(args: BuilderArgs<DoWhileArgs>) {
        return new DoWhile(this.addMissingArgs(args));
    }

    for(args: BuilderArgs<ForArgs>) {
        return new For(this.addMissingArgs(args));
    }

    while(args: BuilderArgs<whileArgs>) {
        return new While(this.addMissingArgs(args));
    }

    break(args: BuilderArgs<BreakArgs>) {
        return new Break(this.addMissingArgs(args));
    }

    continue(args: BuilderArgs<ContinueArgs>) {
        return new Continue(this.addMissingArgs(args));
    }

    return(args: BuilderArgs<ReturnArgs>) {
        return new Return(this.addMissingArgs(args));
    }

    arithmeticExp(args: BuilderArgs<ArithmeticExpressionArgs>) {
        return new ArithmeticExpression(this.addMissingArgs(args));
    }

    logicalExp(args: BuilderArgs<LogicalExpressionArgs>) {
        return new LogicalExpression(this.addMissingArgs(args));
    }

    relationalExp(args: BuilderArgs<RelationalExpressionArgs>) {
        return new RelationalExpression(this.addMissingArgs(args));
    }

    unaryMinusExp(args: BuilderArgs<UnaryExpressionArgs>) {
        return new UnaryMinus(this.addMissingArgs(args));
    }

    unaryNotExp(args: BuilderArgs<UnaryExpressionArgs>) {
        return new UnaryNegation(this.addMissingArgs(args));
    }

    ternaryExp(args: BuilderArgs<TernaryExpressionArgs>) {
        return new TernaryExpression(this.addMissingArgs(args));
    }

    terminalExp(args: BuilderArgs<TerminalExpressionArgs>) {
        return new TerminalExpression(this.addMissingArgs(args));
    }

    literal(args: BuilderArgs<LiteralArgs>) {
        return new Literal(this.addMissingArgs(args));
    }

    reference(args: BuilderArgs<ReferenceArgs>) {
        return new Reference(this.addMissingArgs(args));
    }

    call(args: BuilderArgs<CallArgs>) {
        return new Call(this.addMissingArgs(args));
    }

    cast(args: BuilderArgs<CastArgs>) {
        return new Cast(this.addMissingArgs(args));
    }

    main(args: BuilderArgs<MainArgs>) {
        return new Main(this.addMissingArgs(args));
    }

    initializer(args: BuilderArgs<InitializerArgs>) {
        return new Initializer(this.addMissingArgs(args));
    }

    objectSubroutineCall(args: BuilderArgs<ObjectSubroutineCallArgs>) {
        return new ObjectSubroutineCall(this.addMissingArgs(args));
    }
}