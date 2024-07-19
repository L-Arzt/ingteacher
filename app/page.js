'use client'

import Image from "next/image";

import logoImg from '../public/Logo.png'
import img1 from '../public/headerblockimg1.png'
import img2 from '../public/headerblockimg2.png'
import bookimg from '../public/headerblockbook.png'
import aboutmeimgmain from '../public/aboutmeimgmain.png'
import aboutmecardimg1 from '../public/aboutmecardimg1.png'
import mainImg from '../public/reviewsMainimg.png'
import CardImg1 from '../public/reviewsCardimg1.png'


import ImageWithBorder from './components/imagewithborder'
import AboutMeCard from './components/aboutmeblockcard'
import ReviewsCard from './components/reviewscard'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  // type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react";


export default function Home() {

  const [api, setApi] = useState()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <body>
      <header>
        <section className="flex items-center justify-around border border-[#FF9100] rounded-3xl  m-5 p-3 flex-wrap">
          <figure>
            <Image
              src={logoImg}
              alt="Logo image"
            />
          </figure>

          <nav className="flex gap-10 ">

            <a><h3 className="text-[#FF9100]">Обо мне</h3></a>
            <a><h3 className="text-[#FF9100]">Отзывы</h3></a>
            <a><h3 className="text-[#FF9100]">Цены</h3></a>

          </nav>

          <button className="flex border items-center justify-center border-[#FF9100] rounded-2xl bg-[#FF9100] py-2 px-8 ">
            <h3 className="text-white">Вход</h3>
          </button>
        </section>
      </header>

      <main>
        <section className="flex items-center justify-around my-10  relative flex-wrap">
          <header>
            <h1 className="text-[#374B5C] text-[33px] py-5">Репетитор по Английскому языку</h1>
            <h1 className="text-[#374B5C] text-[33px] py-5">Гринь Ульяна</h1>
            <p className="text-[20px] py-5">Частный преподаватель по Английскому языку для детей и подростков.</p>
            <button className="flex border items-center justify-center border-[#FF9100] rounded-2xl bg-[#FF9100] py-2 px-8 ">
              <h1 className="text-white">Узнать цены</h1>
            </button>
          </header>

          <figure className="relative w-[650px] h-[500px] mb-10">
            <ImageWithBorder
              src={img1}

              alt="Logo image"
              width={400}
              height={400}
              borderRadius={20}
              imgStyle="absolute  z-40 top-[80px] left-[200px] "
              borderStyle="absolute z-20 top-[120px] left-[240px] w-[400px] h-[400px] border border-[#FF9100] rounded-3xl"
            />
            <ImageWithBorder
              src={img2}

              alt="Logo image"
              width={400}
              height={400}
              imgStyle="absolute z-10 blur-[2px] "
              borderStyle="absolute top-10 left-10 z-0 w-[400px] h-[400px] border border-[#FF9100] rounded-3xl"
            />
          </figure>
          <figure className="absolute bottom-0 left-0">
            <Image
              src={bookimg}
              alt="Logo image"
            />
          </figure>

        </section>

        <section >
          <header className="flex items-center justify-center flex-col">
            <figure>
              <Image
                src={aboutmeimgmain}
                alt="Logo image"
              />
            </figure>
            <h1 className="text-[#A56714] text-[39px]">Немного обо мне и о моих занятиях</h1>
            <p className="text-[#A56714] text-[22px]">Уровень языка: C1 (Advanced) </p>
            <p className="text-[#A56714] text-[22px]">Изучала английский язык с ранних лет. Много практиковалась зарубежом. Посетила большую половину стран и городов в Европе.</p>
          </header>

          <article className="flex items-center justify-center gap-[50px] m-20">
            <AboutMeCard
              src={aboutmecardimg1}
              alt="Card image"
              width={90}
              height={120}
              cardtexth='Online Занятия'
              cardtextp='Занятия проходят в Zооm. На уроках я использую онлайн-доску Мirо, на которой ребенок будет видеть все задания. '
            />
            <AboutMeCard
              src={aboutmecardimg1}
              alt="Card image"
              width={90}
              height={120}
              cardtexth='Материалы занятий '
              cardtextp='Для занятий со мной вам не потребуется ничего. 
              Весь материал для уроков я предоставлю в виде на печатных заданий. '
            />
            <AboutMeCard
              src={aboutmecardimg1}
              alt="Card image"
              width={90}
              height={120}
              cardtexth='Личный кабинет'
              cardtextp='Для просмотра графиков занятий со мной,  ученику будут предоставлены данные от его личного кабинета.'
            />
            <AboutMeCard
              src={aboutmecardimg1}
              alt="Card image"
              width={90}
              height={120}
              cardtexth='Я гарантирую'
              cardtextp='Интересные уроки с использованием интерактивного метода для комплексного совершенствования навыков знания языка.'
            />
          </article>
        </section>

        <section>
          <article className="flex items-center justify-center flex-col">
            <header className="flex items-center justify-center flex-col my-5">
              <figure>
                <Image
                  src={mainImg}
                  alt="img header reviews"
                />
              </figure>
              <h1 className="text-[#FF9100] text-[36px]">Отзывы</h1>
            </header>
            <Carousel setApi={setApi}
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]} className="w-full max-w-[600px]">
              <CarouselContent>


                <CarouselItem >
                  <ReviewsCard src={CardImg1}
                    cardtexth="Мария"
                    cardtextp="Ульяна отличный преподаватель! С детьми очень внимательна и дружелюбна, находит индивидуальный подход, чтобы заинтересовать ребенка занятиями. И как результат - есть прогресс! Рады, что решили заниматься с Ульяной."
                    rating={1} />
                </CarouselItem>
                <CarouselItem >
                  <ReviewsCard src={CardImg1}
                    cardtexth="Title"
                    cardtextp="Description"
                    rating={3} />
                </CarouselItem>
                <CarouselItem >
                  <ReviewsCard src={CardImg1}
                    cardtexth="Title"
                    cardtextp="Description"
                    rating={3} />
                </CarouselItem>

                <CarouselItem >
                  <ReviewsCard src={CardImg1}
                    cardtexth="Title"
                    cardtextp="Description"
                    rating={3} />
                </CarouselItem>

                <CarouselItem >
                  <ReviewsCard src={CardImg1}
                    width={200}
                    height={200}
                    cardtexth="Title"
                    cardtextp="Description"
                    rating={3} />
                </CarouselItem>






              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
              {Array.from({ length: count }).map((_, index) => (
                <span key={index} style={{ color: index === current - 1 ? 'red' : 'grey' }}>•</span>
              ))}
            </div>
          </article>
        </section>
      </main>

    </body>
  );
}
