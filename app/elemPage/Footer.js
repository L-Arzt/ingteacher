import Image from 'next/image';
import logoImg from '../../public/Logo.png'
import bgFooter from '../../public/bgFooter.png'

const FooterElem = () => (

    <section className="relative h-full max-h-[200px]">
        <Image
            className="absolute w-full -z-10 "
            src={bgFooter}

            alt="Decoration right sale block image">
        </Image>

        <article className="absolute flex items-start justify-end flex-col left-48 -bottom-40">
            <Image
                src={logoImg}
                alt="Decoration right sale block image">
            </Image>
            <p>Частный онлайн репетитор по Английскому языку
            </p>
            <p>Гринь Ульяна</p>
            <p>© Copyright 2024 Online </p>
        </article>
    </section>
)


export default FooterElem;