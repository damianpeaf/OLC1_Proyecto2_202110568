import { useContext } from "react"
import { DocumentFile, TypeWiseContext } from "../context"
import { Runtime } from "../interpreter"

export const useTypeWise = () => {

    const { dispatch, ...state } = useContext(TypeWiseContext)

    const openTerminal = () => {
        dispatch({ type: 'open-terminal' })
    }

    const closeTerminal = () => {
        dispatch({ type: 'close-terminal' })
    }


    const renameDocument = (id: number, name: string) => {
        dispatch({ type: 'rename-tab', payload: { id, name } })
    }

    const closeDocument = (id: number) => {
        dispatch({ type: 'close-tab', payload: { id } })
    }

    const openDocument = (document: Omit<DocumentFile, 'id'>) => {
        dispatch({ type: 'open-file', payload: { document } })
    }

    const newDocument = () => {
        dispatch({ type: 'new-tab' })
    }

    const saveDocument = (document: DocumentFile) => {
        dispatch({ type: 'save-file', payload: { document } })
    }

    const setCurrentDocument = (id: number) => {
        dispatch({ type: 'set-current-document', payload: { id } })
    }

    const openRenameModal = () => {
        dispatch({ type: 'open-rename-modal' })
    }

    const closeRenameModal = () => {
        dispatch({ type: 'close-rename-modal' })
    }

    const setTerminalContent = (content: string) => {
        dispatch({ type: 'set-terminal-content', payload: { content } })
    }

    const runProgram = () => {
        dispatch({ type: 'set-terminal-content', payload: { content: '' } })
        dispatch({ type: 'reset-graphviz-content' })
        dispatch({ type: 'set-errors', payload: { errors: [] } })

        const runtime = new Runtime()
        runtime.run(state.currentDocument.content)

        setTerminalContent(runtime.ast?.context.console.output || '')
        if (runtime.ast) {

            dispatch({ type: 'set-terminal-content', payload: { content: runtime.ast.context.console.output } })
            dispatch({ type: 'set-errors', payload: { errors: runtime.ast.context.errorTable.errors } })


            if (runtime.ast.graphviz) {
                dispatch({ type: 'set-graphviz-content', payload: { content: runtime.ast.graphviz } })
            }
        } else {
            dispatch({ type: 'reset-graphviz-content' })
        }

    }

    const openAstModal = () => {
        dispatch({ type: 'open-ast-modal' })
    }

    const closeAstModal = () => {
        dispatch({ type: 'close-ast-modal' })
    }

    return {
        ...state,
        openTerminal,
        closeTerminal,
        renameDocument,
        closeDocument,
        openDocument,
        newDocument,
        saveDocument,
        setCurrentDocument,
        openRenameModal,
        closeRenameModal,
        setTerminalContent,
        runProgram,
        openAstModal,
        closeAstModal,
    }
}