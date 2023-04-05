import { Menu } from '@headlessui/react'
import { AiFillFileText, AiFillPlusCircle, AiFillSave, AiFillFolderOpen, AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiRename } from "react-icons/bi";

import { SideBarItem } from './';

const fileOptions = [
    {
        name: 'Renombrar',
        icon: <BiRename />,
        onclick: () => console.log('Rename')
    },
    {
        name: 'Nuevo Archivo',
        icon: <AiOutlineAppstoreAdd />,
        onclick: () => console.log('New File')
    }, {
        name: 'Abrir archivo',
        icon: <AiFillFolderOpen />,
        onclick: () => console.log('Open File')
    }, {
        name: 'Guardar Archivo',
        icon: <AiFillSave />,
        onclick: () => console.log('Save File')
    },

]

export const FileOptions = () => {

    return (
        <div className='relative mx-auto'>
            <Menu>
                <Menu.Button >
                    <SideBarItem icon={<AiFillFileText />} label="Opciones de archivos" />
                </Menu.Button>
                <div className='absolute top-1/2 left-[50px] p-2 w-[175px] rounded-xl'>
                    <Menu.Items>
                        {
                            fileOptions.map((option, index) => (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <div
                                            className="
                                                bg-secondary-dark
                                            "
                                        >
                                            <button
                                                className="
                                                flex
                                                items-center
                                                w-full
                                                p-2
                                                text-white
                                                hover:bg-text-dark-theme-dark
                                                "
                                                onClick={option.onclick}
                                            >
                                                {option.icon}
                                                <span className='ml-2'>{option.name}</span>
                                            </button>
                                        </div>
                                    )}
                                </Menu.Item>
                            ))
                        }
                    </Menu.Items>
                </div>
            </Menu>
        </div>
    )
}