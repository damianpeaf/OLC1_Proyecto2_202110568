import { toast } from 'react-hot-toast';

export const fireScucessToast = (message: string) => toast.custom((t) => (
  <div
    className={`${t.visible ? 'animate-pulse' : 'animate-ping'} mt-7 `}
  >
    <div id="alert-border-3" className="flex p-4 mb-4 border-t-4  text-green-400 bg-gray-800 border-green-800" role="alert">
      <svg className="flex-shrink-0 w-5 h-5" fill='currentColor' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
      <div className="ml-3 text-sm font-medium">
        {message}
      </div>
      <button type="button" onClick={() => toast.dismiss(t.id)} className="ml-auto -mx-1.5 -my-1.5  rounded-lg focus:ring-2 focus:ring-green-400 p-1.5  inline-flex h-8 w-8 bg-gray-800 text-green-400 hover:bg-gray-700" data-dismiss-target="#alert-border-3" aria-label="Close">
        <span className="sr-only" >Dismiss</span>
        <svg aria-hidden="true" fill='currentColor' className="w-5 h-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
    </div>
  </div>
))

export const fireDangerToast = (message: string) => toast.custom((t) => (
  <div
    className={`${t.visible ? 'animate-pulse' : 'animate-ping'} mt-7 `}
  >
    <div id="alert-border-3" className="flex p-4 mb-4 border-t-4  text-red-400 bg-gray-800 border-red-800" role="alert">
      <svg className="flex-shrink-0 w-5 h-5" fill='currentColor' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
      <div className="ml-3 text-sm font-medium">
        {message}
      </div>
      <button type="button" onClick={() => toast.dismiss(t.id)} className="ml-auto -mx-1.5 -my-1.5  rounded-lg focus:ring-2 focus:ring-red-400 p-1.5  inline-flex h-8 w-8 bg-gray-800 text-red-400 hover:bg-gray-700" data-dismiss-target="#alert-border-3" aria-label="Close">
        <span className="sr-only" >Dismiss</span>
        <svg aria-hidden="true" fill='currentColor' className="w-5 h-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
    </div>
  </div>
))