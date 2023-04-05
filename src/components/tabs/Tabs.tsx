import { useTypeWise } from "../../hooks"
import { TabProps } from "./tabs.types"
import { BsFileBinaryFill } from "react-icons/bs"

export const Tabs = () => {

  const { documents, currentDocument } = useTypeWise();

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
        documents.map((doc) => {
          return (
            <Tab
              key={doc.id}
              document={doc}
              current={currentDocument.id === doc.id}
            />
          )
        })
      }
    </article>
  )
}


const Tab = ({ document, current = false }: TabProps) => {

  const { setCurrentDocument, closeDocument } = useTypeWise();


  return (
    <div
      className={`
      text-white
      px-2
      py-1
      rounded-md
      bg-secondary-dark
      hover:bg-text-dark-theme-darker
      flex
      gap-x-1
      ${current ? '' : 'opacity-50 hover:opacity-100'}
      `}
    >
      <button
        className="
        flex
        items-center
        gap-x-1
        justify-center
        "
        onClick={() => setCurrentDocument(document.id)}

      >

        <BsFileBinaryFill />
        {
          `${document.name}.tw`
        }
      </button>
      <button
        className="
        text-primary-dark
        font-bold
        pl-1
        "
        onClick={() => closeDocument(document.id)}
      >
        x
      </button>
    </div>
  )
}