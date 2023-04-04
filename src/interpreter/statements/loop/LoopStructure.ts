import { ConditionalStructure, ConditionalStructureArgs } from '../conditional';

export type LoopStructureArgs = ConditionalStructureArgs & {

}

export abstract class LoopStructure extends ConditionalStructure {

    constructor({ ...args }: LoopStructureArgs) {
        super(args);
    }
}