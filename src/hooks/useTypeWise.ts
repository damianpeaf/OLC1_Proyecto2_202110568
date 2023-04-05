import { useContext } from "react"
import { TypeWiseContext } from "../context"

export const useTypeWise = () => {

    const { dispatch, ...state } = useContext(TypeWiseContext)

    const openTerminal = () => {
        dispatch({ type: 'open-terminal' })
    }

    const closeTerminal = () => {
        dispatch({ type: 'close-terminal' })
    }

    return {
        ...state,
        openTerminal,
        closeTerminal
    }
}