import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react';
import { useTypeWise } from '../../hooks'


export const AstModal = () => {

  const { isAstModalOpen, closeAstModal, graphviz: content } = useTypeWise();

  const [graphiz, setGraphiz] = useState<string | null>(null)

  useEffect(() => {
    setGraphiz(content)
  }, [content])

  return (
    <Transition appear show={isAstModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeAstModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-7xl h-full max-h-screen overflow-y-auto overflow-x-auto transform overflow-hidden rounded-2xl bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Reporte AST
                </Dialog.Title>
                {
                  graphiz ?
                    <div className="mt-4">
                      <img src={`https://quickchart.io/graphviz?graph=${graphiz}`} alt="AST" />
                    </div>
                    :
                    <div className="mt-4">
                      <p className="text-lg text-gray-300">
                        No se ha generado el reporte AST
                      </p>
                    </div>
                }
                <div className="mt-4 flex gap-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-950 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeAstModal}
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
