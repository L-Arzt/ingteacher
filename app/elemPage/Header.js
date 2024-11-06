import Image from 'next/image';
import logoImg from '../../public/Logo.png'
import ProfileImg from '../../public/ProfileImg.png'
import { getServerSession } from 'next-auth';
import { NextAuthOptions } from '@/config';
import Link from 'next/link';



export default async function HeaderElem() {
    const session = await getServerSession(NextAuthOptions);
    return (
        <section className="flex items-center justify-around border border-[#FF9100] rounded-3xl m-5 p-3 flex-wrap">
            <Link href="/">
                <figure>
                    <Image
                        src={logoImg}
                        alt="Logo image"
                    />
                </figure>
            </Link>

            <nav className="flex gap-10">

                <Link href='/#reviewsBlock'><h3 className="text-[#FF9100]">Отзывы</h3></Link>
                <Link href="/#pricesBlock"><h3 className="text-[#FF9100]">Цены</h3></Link>
                <Link href='/User/TimeTable'><h3 className="text-[#FF9100]">Расписание</h3></Link>
            </nav>

            <button className="flex border items-center justify-center border-[#FF9100] rounded-2xl bg-[#FF9100] py-2 px-6 ">
                {
                    !session ?
                        (
                            <Link className='' href="/login"> <h3 className="text-white">Вход</h3></Link>
                        ) : (
                            <Link className='flex gap-2' href="/User/Profile"> <h3 className="text-white">Профиль</h3>  <figure>
                                <Image
                                    src={ProfileImg}
                                    alt="Profile image"
                                />
                            </figure></Link>
                        )
                }
            </button>
        </section>
    );
}
