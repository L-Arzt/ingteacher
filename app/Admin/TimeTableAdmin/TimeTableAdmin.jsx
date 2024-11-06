'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../components/ui/table';
import Link from 'next/link';
import { ThemeContext } from '../../components/ThemeProvider';
import edit from '../../../public/edit.png';
import Image from 'next/image';
import MenuWeek from '@/app/components/MenuWeek';

import nextImg from '../../../public/arrownexttable.png'
import backImg from '../../../public/arrowbacktable.png'

export default function TimeTableAdmin({ data, weekRange }) {
    const [dataset, setDataset] = useState(data);
    const [hover, setHover] = useState({});
    const [currentDay, setCurrentDay] = useState(new Date().getDay()); // Состояние для текущего дня
    const [showWeek, setShowWeek] = useState(false); // Состояние для отображения недели
    const context = useContext(ThemeContext);

    const slideContainerRef = useRef(null);
    const daysOnWeek = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье'
    ]
    useEffect(() => {
        if (context.weeks) {
            async function getData() {
                const resp = await fetch('/api/getTimeTableAdmin', {
                    method: 'post',
                    body: JSON.stringify({
                        monday: context.weeks.from,
                        sunday: context.weeks.to,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (resp.ok) {
                    const data = await resp.json();
                    setDataset(data.data);
                } else {
                    console.error('Failed to fetch data');
                }
            }

            getData();
        }
    }, [context.weeks]);

    function getDateFromDay(date, day) {
        var result = new Date(date);
        result.setDate(result.getDate() + (day - 1));
        return result.toLocaleDateString('en-CA');
    }

    function buildTable(data) {
        const TimeLessonS = {
            1: '8:30',
            2: '10:15',
            3: '12:00',
            4: '14:15',
            5: '16:00',
            6: '17:50',
        };
        const TimeLessonPo = {
            1: '10:05',
            2: '11:50',
            3: '13:35',
            4: '15:50',
            5: '17:35',
            6: '21:00',
        };



        let table = [];

        for (let i = 1; i < 7; i++) {
            let tablePart = (
                <TableRow className='customKletka ' key={`row-${i}`}>

                    <TableCell key={`time-${i}`}>{TimeLessonS[i]}<hr />{TimeLessonPo[i]}</TableCell>
                    {showWeek ? (
                        daysOnWeek.map((dayName, dayIndex) => {
                            const lesson = data.find(
                                (lesson) => lesson.weekDay === dayIndex + 1 && lesson.numberLesson === i
                            );
                            return (

                                <TableCell className="border" key={`lesson-${i}-${dayIndex}`}>

                                    {lesson ? (
                                        <div className={`relative w-[140px] h-[70px] flex flex-col items-center justify-center transition-all duration-200`} onMouseEnter={() => setHover({ ...hover, [lesson.id]: true })} onMouseLeave={() => setHover({ ...hover, [lesson.id]: false })}>
                                            {hover[lesson.id] ? (
                                                <div className='absolute z-20 flex items-center justify-center  w-[250px] h-[120px] p-2 bg-gray-200 rounded-lg gap-2'>
                                                    <div className='flex-col'>
                                                        <p className="font-bold">{lesson.studentName}</p>
                                                        <p>{lesson.description}</p>
                                                    </div>
                                                    <div>
                                                        <Link href={`/Admin/book/UpdatePage/${lesson.id}`}>
                                                            <button className="flex items-center justify-center bg-[#FF9100] w-[35px] h-[35px] rounded-md text-stone-50">
                                                                <Image className='w-10 h-10 m-5 bg-[#FF9100] rounded-lg p-1' src={edit} alt='editImg' />
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='absolute'>
                                                    <p className="z-0">{lesson.studentName.slice(0, 10)}...</p>
                                                    <p className="z-0">{lesson.description.slice(0, 10)}...</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className='flex w-[140px] h-[70px] items-center justify-center flex-col gap-2'>
                                            <h1 className='text-[#7E7E7E]'>Свободно</h1>
                                            <Link
                                                href={`/Admin/book/${i}/${dayIndex + 1}/${getDateFromDay(
                                                    new Date(context?.weeks?.from),
                                                    dayIndex + 1
                                                )}`}
                                            >
                                                <button className="flex items-center justify-center bg-[#ff910075] h-[30px] rounded-md text-stone-50 p-5 hover:bg-[#FF9100]">Занять аудиторию</button>
                                            </Link>
                                        </div>
                                    )}
                                </TableCell>
                            );
                        })
                    ) : (
                        <TableCell className="border" key={`lesson-${i}-${currentDay}`}>
                            {data.map((lesson) => {
                                if (lesson.weekDay === currentDay && lesson.numberLesson === i) {
                                    return (
                                        <div className={`relative  h-[70px] flex flex-col items-center justify-center transition-all duration-200`} onMouseEnter={() => setHover({ ...hover, [lesson.id]: true })} onMouseLeave={() => setHover({ ...hover, [lesson.id]: false })} >
                                            {hover[lesson.id] ? (
                                                <div className='absolute z-20 flex items-center justify-center  w-[250px] h-[120px] p-2 bg-gray-200 rounded-lg gap-2'>
                                                    <div className='flex-col'>
                                                        <p className="font-bold">{lesson.studentName}</p>
                                                        <p>{lesson.description}</p>
                                                    </div>
                                                    <div>
                                                        <Link href={`/Admin/book/UpdatePage/${lesson.id}`}>
                                                            <button className="flex items-center justify-center bg-[#FF9100] w-[35px] h-[35px] rounded-md text-stone-50">
                                                                <Image className='w-10 h-10 m-5 bg-[#FF9100] rounded-lg p-1' src={edit} alt='editImg' />
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='absolute  '>
                                                    <p className="z-0">{lesson.studentName.slice(0, 10)}...</p>
                                                    <p className="z-0">{lesson.description.slice(0, 10)}...</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                            {!data.some((lesson) => lesson.weekDay === currentDay && lesson.numberLesson === i) && (
                                <div className='flex w-[400px] h-[70px] items-center justify-center flex-col gap-2'>
                                    <h1 className='text-[#7E7E7E]'>Свободно</h1>
                                    <Link
                                        href={`/Admin/book/${i}/${currentDay}/${getDateFromDay(
                                            new Date(context?.weeks?.from),
                                            currentDay
                                        )}`}
                                    >
                                        <button className="flex items-center justify-center bg-[#FF9100] h-[30px] rounded-md text-stone-50 p-5 hover:bg-[#FF9100]">Занять аудиторию</button>
                                    </Link>
                                </div>
                            )}
                        </TableCell>
                    )}

                </TableRow>
            );
            table.push(tablePart);
        }
        return table;
    }

    function handlePrevDay() {
        setCurrentDay((prevDay) => (prevDay === 1 ? 7 : prevDay - 1));
    }

    function handleNextDay() {
        setCurrentDay((prevDay) => (prevDay === 7 ? 1 : prevDay + 1));
    }

    function toggleShowWeek() {
        setShowWeek((prevShowWeek) => !prevShowWeek);
    }

    return (
        <section className="relative flex items-center justify-center flex-col overflow-hidden w-full ">
            <div className='flex items-center justify-center gap-10 m-5'>
                <MenuWeek />
                <button onClick={toggleShowWeek} className="flex items-center justify-center bg-[#ff910075] min-w-10 h-[30px] rounded-md text-stone-50 p-5 hover:bg-[#FF9100]">
                    {showWeek ? 'Показать один день' : 'Показать всю неделю'}
                </button>
            </div>
            <div className="absolute w-full ">
                {showWeek ? (
                    <>
                    </>
                ) : (
                    <div className="absolute flex justify-between w-full mt-4 top-[50%] px-10">
                        <button onClick={handlePrevDay} >
                            <Image src={backImg}></Image>
                        </button>
                        <button onClick={handleNextDay} >
                            <Image src={nextImg}></Image>
                        </button>
                    </div>)}
            </div>
            {dataset && (
                <div className={`overflow-x-scroll ${!showWeek ? 'mr-20' : ''}`} >


                    <Table refProp={slideContainerRef} className=''>
                        <TableHeader>
                            <TableRow >

                                <TableHead></TableHead>

                                {showWeek ? (
                                    daysOnWeek.map((day, index) => (
                                        <TableHead key={day} >
                                            {day}
                                            <br />
                                            {getDateFromDay(new Date(context?.weeks?.from), index + 1)}
                                        </TableHead>
                                    ))
                                ) : (

                                    <TableHead className='flex items-center justify-center '>
                                        {daysOnWeek[currentDay - 1]}
                                        <br />
                                        {getDateFromDay(new Date(context?.weeks?.from), currentDay)}
                                    </TableHead>
                                )}
                            </TableRow>

                        </TableHeader>
                        <TableBody>{buildTable(dataset)}</TableBody>
                    </Table>
                </div>
            )
            }
        </section >
    );
}
