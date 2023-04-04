

export class Console {

    private _output: string = '';

    public get output(): string {
        return this._output;
    }

    public write(message: string): void {
        this._output += message;
    }

    public writeln(message: string): void {
        this._output += message + '\n';
    }

}