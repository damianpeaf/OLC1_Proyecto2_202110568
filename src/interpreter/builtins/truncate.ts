import { Builder } from "../ast";
import { Argument, Symbols } from "../elements";

export const truncateSubroutine = () => Builder.element.defaultSubroutine({
    name: "truncate",
    type: 'function',
    parameters: [
        new Argument({
            name: "1",
            type: [
                Symbols.DOUBLE,
                Symbols.INT,
            ],
        })
    ],
    returnType: Symbols.INT,
    customCall: ({ args, context }) => {
        const exp = args[0];
        if (exp.returnType == Symbols.DOUBLE) {
            return Math.trunc(exp.value);
        } else {
            return exp.value;
        }
    }
});