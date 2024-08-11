import Image from 'next/image';
import logoImg from '../../public/Logo.png'
import Link from 'next/link';
import Logout from '../components/auth/Logout';




const HeaderElem = () => (



    <section className="flex items-center justify-around border border-[#FF9100] rounded-3xl  m-5 p-3 flex-wrap">
        <Link href="/">
            <figure>
                <Image
                    src={logoImg}
                    alt="Logo image"
                />
            </figure></Link>

        <nav className="flex gap-10 ">

            <a><h3 className="text-[#FF9100]">Обо мне</h3></a>
            <a><h3 className="text-[#FF9100]">Отзывы</h3></a>
            <a><h3 className="text-[#FF9100]">Цены</h3></a>

        </nav>

        <button className="flex border items-center justify-center border-[#FF9100] rounded-2xl bg-[#FF9100] py-2 px-8 ">
            <h3 className="text-white">Вход</h3>
        </button>
        <div className='m-2  bottom-0'>
            {/* {
                            !session && <Link className='' href="/login">ВОЙТИ</Link>
                        } */}
            {
                <Logout />
            }
        </div>



    </section>
)



export default HeaderElem;

