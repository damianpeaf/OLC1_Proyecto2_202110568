import { Builder } from "../ast";
import { Argument, Symbols, isListType, isVectorType, listTypes, vectorTypes } from "../elements";

export const lengthSubroutine = () => Builder.element.defaultSubroutine({
    name: "length",
    type: 'function',
    parameters: [
        new Argument({
            name: "1",
            type: [
                ...vectorTypes,
                ...listTypes,
                Symbols.STRING,
            ],
        })
    ],
    returnType: Symbols.INT,
    customCall: ({ args, context }) => {

        const exp = args[0];

        if (isVectorType(exp.returnType) || isListType(exp.returnType)) {

            if (!exp.value._initiated) {
                context.errorTable.addError({
                    message: `El arreglo no ha sido inicializado`,
                    type: 'Semantico',
                    line: exp.line,
                    column: exp.column
                });
                return 0;
            }

            return exp.value.values.length;
        } else {
            return exp.value.length;
        }
    }
});