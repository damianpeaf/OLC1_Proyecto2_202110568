import { TypeWiseValueType } from "../../elements";


export interface Breakable {
    break: boolean;
}

export interface Continueable {
    continue: boolean;
}

export interface Returnable {
    return: boolean;
    returnValue: any;
    returnValueType: TypeWiseValueType;
}

type CallStackItem = Breakable | Continueable | Returnable;

export class CallStack {
    private stack: Array<CallStackItem> = [];

    public push(item: CallStackItem) {
        this.stack.push(item);
    }

    public pop(): CallStackItem | null {
        if (this.isEmpty()) return null;
        return this.stack.pop() as CallStackItem;
    }

    public peek(): CallStackItem | null {
        if (this.isEmpty()) return null;
        return this.stack[this.stack.length - 1];
    }

    public in(item: CallStackItem): boolean {
        return this.stack.includes(item);
    }

    public isEmpty(): boolean {
        return this.stack.length === 0;
    }

    public remove(item: CallStackItem) {
        const index = this.stack.indexOf(item);
        if (index > -1) this.stack.splice(index, 1);
    }


}