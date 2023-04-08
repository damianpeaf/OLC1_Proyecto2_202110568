import { VscRunAll, VscHome, VscRepo } from "react-icons/vsc";
import { BsFillTerminalFill } from "react-icons/bs";

import { FileOptions, SideBarItemProps } from "./";
import { useTypeWise } from "../../hooks";

export const SideBar = () => {

    const { toogleTerminal, runProgram, openAstModal } = useTypeWise();

    return (
        <aside
            className="
            fixed
            top-0
            left-0
            w-16
            h-full
            bg-secondary-dark
            text-white
            flex
            flex-col
            lg:pt-4
            z-40
            "
        >
            <SideBarItem icon={<VscHome />} label="Home" />
            <SideBarDivider />
            <SideBarItem icon={<VscRunAll />} label="Ejecutar" onClick={() => runProgram()} />
            <SideBarDivider />
            <FileOptions />
            <SideBarDivider />
            <SideBarItem icon={<VscRepo />} label="Reportes" onClick={openAstModal} />
            <SideBarDivider />
            <SideBarItem icon={<BsFillTerminalFill />} label="Consola" onClick={toogleTerminal} />
            <SideBarDivider />
        </aside>
    )
}


export const SideBarItem = ({ icon, label, onClick = () => { } }: SideBarItemProps) => {

    return (
        <>
            <div className="sidebar-icon group" onClick={onClick}>
                {icon}
                <span className="sidebar-item-tooltip group-hover:opacity-100">
                    {label}
                </span>
            </div>
        </>
    )
}

const SideBarDivider = () => {
    return (
        <hr className="sidebar-hr" />
    )
}


