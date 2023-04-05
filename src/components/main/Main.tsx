import { Editor } from '../editor';
import { Tabs } from '../tabs';
import { Console } from '../console';
import { RenameModal } from '../modal';
import { AstModal } from '../modal/AstModal';

export const Main = () => {
    return (
        <main
            className="
            fixed
            left-16
            w-[calc(100vw-64px)]
            h-full
        "
        >
            {/* TODO: Add router here */}
            <section
                className='
                    h-full
                    w-full
                    flex
                    flex-col
                    gap-y-1
                '
            >
                <Tabs />
                <article
                    className='h-full'
                >
                    <Editor />
                    <Console />
                </article>
            </section>
            <RenameModal />
            <AstModal />
        </main>
    )
}
