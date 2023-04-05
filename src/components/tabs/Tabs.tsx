import { TabProps } from "./tabs.types"
import { BsFileBinaryFill } from "react-icons/bs"

const tabs = [
  {
    filename: "index.tsx",
    content: "import React from 'react'",
  },
  {
    filename: "Tabs.tsx",
    content: "import React from 'react'",
  },
]

export const Tabs = () => {
  return (
    <article
      className="
        flex
        gap-x-2
        mx-2
        my-1
      "
    >
      {
        tabs.map((tab, index) => {
          return (
            <Tab
              key={index}
              filename={tab.filename}
            />
          )
        })
      }
    </article>
  )
}


const Tab = ({ filename }: TabProps) => {
  return (
    <div
      className="
        text-white
        px-2
        py-1
        rounded-md
        bg-secondary-dark
        hover:bg-text-dark-theme-darker
        flex
        gap-x-1
      "
    >
      <button
        className="
        flex
        items-center
        gap-x-1
        justify-center
        "
        onClick={() => console.log('change')}

      >

        <BsFileBinaryFill />
        {
          filename
        }
      </button>
      <button
        className="
        text-primary-dark
        font-bold
        pl-1
        "
        onClick={() => console.log('close')}
      >
        x
      </button>
    </div>
  )
}