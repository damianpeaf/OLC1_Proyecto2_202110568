import { useContext } from "react"
import { DocumentFile, TypeWiseContext } from "../context"

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
        closeRenameModal
    }
}