import { Editor } from '../editor/Editor';

export const Main = () => {
    return (
        <main
            className="
            fixed
            left-16
            grid
            grid-cols-2
            w-[calc(100vw-64px)]
            h-full
            pt-4
        "
        >
            <section>
                <h1 className="text-white font-black text-2xl text-center mb-4">
                    ENTRADA
                </h1>
                <Editor />
            </section>
            <section>
                <h1 className="text-white font-black text-2xl text-center mb-4">
                    SALIDA
                </h1>
                <Editor />
            </section>
        </main>
    )
}
