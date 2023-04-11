import { Builder } from "../ast";
import { Argument, Symbols } from "../elements";

export const roundSubroutine = () => Builder.element.defaultSubroutine({
    name: "round",
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
            const integerPart = Math.floor(exp.value);
            const decimalPart = exp.value - integerPart;

            if (decimalPart >= 0.5) {
                return integerPart + 1;
            } else {
                return integerPart;
            }
        }
        else {
            return exp.value;
        }

    }
});