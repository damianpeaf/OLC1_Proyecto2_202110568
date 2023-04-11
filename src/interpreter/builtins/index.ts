import { lengthSubroutine } from "./length";
import { printSubroutine } from "./print";
import { roundSubroutine } from "./round";
import { toCharArraySubroutine } from "./toCharArray";
import { toLowerSubroutine } from "./toLower";
import { toStringSubroutine } from "./toString";
import { toUpperSubroutine } from "./toUpper";
import { truncateSubroutine } from "./truncate";
import { typeofSubroutine } from "./typeof";


export const builtins = [
    printSubroutine,
    toLowerSubroutine,
    toUpperSubroutine,
    lengthSubroutine,
    truncateSubroutine,
    roundSubroutine,
    typeofSubroutine,
    toStringSubroutine,
    toCharArraySubroutine
]