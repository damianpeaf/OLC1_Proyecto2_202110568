import { MdOutlineCloseFullscreen } from 'react-icons/md';
import { useTypeWise } from '../../hooks';

export const Console = () => {

    const { isConsoleOpen, closeTerminal } = useTypeWise()

    return (
        <section
            className={`
            ${isConsoleOpen ? 'scale-100' : 'scale-0'}
            absolute
            bottom-0
            left-0
            w-full
            h-1/3
            bg-background-dark
            transition-all
            `}
        >
            <article
                className="
                flex
                justify-between
                px-4
                mt-2
                "
            >
                <h2
                    className="
                    text-gray-300
                    font-bold
                    text-xl
                    "
                >
                    Consola
                </h2>
                <button
                    className="
                        p-2
                        text-gray-300
                        font-bold
                        text-xl
                    "
                    onClick={closeTerminal}
                >
                    <MdOutlineCloseFullscreen />
                </button>
            </article>
            <article
                className="
                    py-2
                    px-4
                    overflow-y-auto
                    mb-2
                    h-4/5
                    console-font
                    text-gray-300
                "
            >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus veniam quas, voluptatem neque esse quasi exercitationem corporis minima. Ipsum reiciendis consectetur eius expedita quo eos eum iure laboriosam labore corrupti?
                Nulla officia qui sunt! Maxime aliquid minima provident quisquam reprehenderit molestiae, accusamus nisi eos quis, corporis dolore hic ipsum blanditiis inventore culpa fugit accusantium vel! Earum tempora porro voluptates unde?
                Culpa doloribus maxime praesentium veritatis, sit voluptatem numquam magni facilis tempore optio necessitatibus cumque alias iure quae accusantium itaque. Soluta ipsum, dignissimos exercitationem quibusdam velit corporis numquam qui pariatur incidunt.
                Quae quisquam dolorum non voluptates facere laudantium autem odio deserunt ipsum, nihil voluptate quasi optio cupiditate? Nihil quibusdam quam et voluptate praesentium laboriosam velit! Debitis repudiandae voluptatibus eum minima magni.
                Magni, dicta! Porro iure quibusdam deserunt fugit officiis impedit saepe laboriosam consectetur assumenda ad magni, dolore, eos dolor cupiditate expedita. Neque illo pariatur reiciendis recusandae in? Ratione, accusantium labore. Facere.
                Aut asperiores dolore, amet provident ipsa facere delectus optio eveniet. Consequatur cum sint iusto incidunt. Odio, blanditiis. Nemo, illum quasi quaerat harum non exercitationem veniam, voluptate rem asperiores quam doloribus!
                Culpa deleniti in architecto cumque harum. Omnis eius maiores eum, facere nostrum perspiciatis dolor quisquam vitae explicabo impedit suscipit voluptatibus fugiat labore quam dolorum commodi voluptate molestiae. Modi, libero incidunt!
                Dolorum soluta qui sequi nihil dolore ut! Provident placeat sequi tenetur et fugiat, accusantium autem quaerat animi fugit veniam, qui harum. Obcaecati quia vero culpa iste animi esse laboriosam numquam?
                Hic aut illum laborum nesciunt exercitationem dicta facilis velit quam architecto. Nulla minus libero id ratione eos, beatae hic commodi sit veniam maiores repellendus et, consequatur delectus quibusdam? Laudantium, animi.
                Iste delectus, laudantium dignissimos minus rerum accusantium architecto aut ad cumque nesciunt omnis saepe labore voluptatem error deserunt enim quis, hic animi unde id! Praesentium veniam quam corporis eaque corrupti!
                Architecto cum officia qui totam illum deserunt officiis eos est maxime rem libero quo ea quasi consequatur porro ut explicabo, delectus laborum sequi amet. Nisi inventore quis atque in. Harum!
                Architecto, sapiente id! Quas quia maxime autem magnam velit quibusdam exercitationem voluptatum soluta repellendus, nemo labore asperiores aliquam ullam assumenda? Ipsa, molestiae dignissimos? Unde doloremque facilis minus minima? Quam, deleniti?
                Possimus libero repellat unde reiciendis qui, perferendis maiores hic expedita dolorem autem quis? Accusamus, incidunt! Facere eius neque labore! Iure in aut id tenetur tempora obcaecati autem illum nemo iste?
                Pariatur provident, iste laudantium repellat soluta similique ullam, quidem nobis explicabo eaque, fugit harum quia rerum accusamus nulla rem blanditiis cupiditate quis quos. Atque officiis itaque alias tempore dolorem vitae!
                Iste sint totam autem itaque rerum ipsam debitis, illo, consequuntur tempora magni voluptates atque cumque quaerat! Quaerat ab minus cumque, quasi quod porro distinctio cupiditate laborum adipisci, repellat nulla quis.
                Omnis maxime nulla, odit dolorem cupiditate sapiente! Dignissimos quod, impedit, ea officiis reiciendis modi accusamus quo, ex voluptatem quos quia voluptate nisi dolor illum laudantium sint eius facere. Voluptate, mollitia?
                Voluptatum temporibus, alias nulla sequi impedit quos numquam deserunt voluptates tempora ad delectus nobis soluta nihil vitae fuga quaerat. Molestias quis provident, repellat temporibus beatae magni harum rerum ipsum sit!
                Nostrum molestias omnis, vitae maiores inventore eligendi ex tempora eius sunt aperiam dolores quos? Tempora reprehenderit, labore quo soluta neque ducimus maiores nemo minus recusandae quisquam hic facilis odit nesciunt.
                Optio veritatis minus modi molestias ratione magni, ad quas quod, eligendi sequi consectetur rerum velit laboriosam officiis cumque nisi aliquam aperiam ducimus est, provident laudantium! Ullam consequuntur dignissimos aliquid repudiandae?
                Vero eum nemo autem odio id, voluptatem eligendi nihil consequatur, accusamus ipsam voluptate, ipsum minus tempora explicabo assumenda quas? Magni ratione sit adipisci neque. Neque rerum quidem vel quaerat natus?
                Totam ipsum eos fugit deleniti dolorem deserunt recusandae sequi id omnis dicta odit tenetur adipisci ut provident perspiciatis pariatur, earum corrupti eveniet ullam cum quo aperiam laboriosam harum? Quae, sed?
                Adipisci natus nulla ex aliquid magni obcaecati, ullam ut quibusdam delectus aperiam molestiae sapiente voluptates numquam temporibus dicta voluptatem quo beatae. Soluta sint excepturi ipsam corporis inventore, ullam totam laborum.
                Obcaecati asperiores distinctio quis laudantium, sunt sint rem beatae laboriosam voluptates necessitatibus perferendis, laborum recusandae commodi cumque maiores eveniet veniam quam. Recusandae, quae ipsam? Similique voluptates vel mollitia culpa quibusdam?
                Error, corrupti quis placeat doloremque, obcaecati eligendi beatae aut hic neque deserunt quasi! Eum laboriosam eligendi voluptates quia illo rerum nostrum! Voluptatem excepturi sit accusamus placeat illo nesciunt iusto nam?
                Accusamus odit autem quisquam rem explicabo cupiditate sint consequatur? Numquam laborum delectus sequi eos odit? Earum deserunt, voluptatem expedita mollitia iste tempora non sed voluptas veniam facere cupiditate a? Libero?
                Voluptatibus iste, amet ratione, corporis aliquam nam sit qui quisquam quas nemo dicta assumenda alias modi ipsum a eum molestiae quaerat officia soluta repellat. Iure magnam soluta deleniti sunt ex.
                Vel, tempore adipisci? Deleniti nobis ut fuga, iusto sint et! Cupiditate, provident vitae nemo hic eum deserunt itaque beatae recusandae culpa non quas fugiat libero. Sint accusantium at quas pariatur?
                Culpa, quibusdam animi minima id numquam libero veritatis voluptatibus aut explicabo, officia vel modi dignissimos commodi accusamus corrupti nesciunt perferendis soluta quae quis, ea ab doloribus. Nobis quia velit fuga!
                Molestias, eveniet! Incidunt rem voluptates nulla aliquam dolorem doloremque in autem ipsum accusantium quae odio consequatur dicta et architecto saepe, repellendus deserunt optio quisquam. Hic, tenetur sint! Accusantium, nemo eveniet?
                Est aut quaerat maiores? Inventore, qui animi! Aperiam enim ut perferendis? Cumque sit debitis quaerat fugit atque repellendus eaque, provident veritatis perspiciatis nam nihil distinctio odio non, consectetur delectus sapiente!
                Nihil natus doloribus nam minima eos alias dicta temporibus sint omnis voluptatem, eaque atque facilis dolor ullam. Rem, doloremque aliquam, hic quaerat expedita sed quis corporis distinctio ea voluptates sunt.
                Ratione, magni optio! Corporis id illo maxime! Cum, tenetur. Eveniet assumenda facere qui commodi laborum asperiores tempora dolorem non porro, nisi recusandae minima numquam voluptatum reiciendis quis a maiores eligendi.
                Accusantium inventore amet ducimus? Nisi iusto perspiciatis dolores maxime veritatis placeat totam laborum in. Consequatur facilis delectus, sed commodi in enim sunt accusamus eligendi quidem, eaque, dolorem placeat laborum necessitatibus!
                Magni, officiis inventore labore molestiae fugit facilis itaque. Magni in exercitationem rerum recusandae nobis! Dolores dignissimos sequi corporis harum beatae? Maxime itaque id sequi vel tenetur fugiat esse quis quae!
                Quisquam nemo sit aspernatur? Amet mollitia harum libero placeat expedita, voluptates repudiandae omnis maiores eos eius eligendi animi ratione quam molestiae non ducimus sit! Saepe ullam cum nesciunt officiis itaque!
                Minima velit voluptatum molestias tenetur eum ex saepe nesciunt qui at accusantium magni mollitia odit sed voluptate sint aliquid temporibus repellat, modi veniam aliquam possimus adipisci aut! Quod, voluptatem accusamus?
                Laboriosam quos mollitia cumque, saepe tempore veniam dignissimos ad, non, enim ut ipsum? Voluptatibus numquam nulla magni odit molestias ad nisi at voluptatum praesentium. Cum atque at tempora illum esse.
                Ratione provident reprehenderit, iste in doloremque ducimus similique impedit debitis vel architecto ipsum libero magnam soluta itaque dolores quidem temporibus aperiam. Delectus, voluptatem culpa. Eveniet fuga eligendi eos temporibus maiores.
                Repellendus quos adipisci officia laborum rerum veritatis ducimus ipsa hic minima facere voluptatum sint molestias, pariatur tempore esse. Natus voluptate animi magni ex! Asperiores explicabo animi perferendis? Corporis, laudantium nobis.
                Tempora provident odit dolorum eaque blanditiis impedit, in necessitatibus laborum cumque? Dolore sequi repellendus ea placeat cum non cupiditate est eaque! Beatae sapiente officia expedita est, veniam recusandae velit a.
            </article>
        </section>
    )
}
