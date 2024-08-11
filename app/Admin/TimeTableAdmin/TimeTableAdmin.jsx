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

export default function TimeTableAdmin({ data, weekRange }) {
    const [dataset, setDataset] = useState(data);
    const [hover, setHover] = useState({});
    const context = useContext(ThemeContext);

    const slideContainerRef = useRef(null);

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

        const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

        let table = [];

        for (let i = 1; i < 7; i++) {
            let tablePart = (
                <TableRow className='customKletka' key={`row-${i}`}>
                    <TableCell key={`time-${i}`}>{TimeLessonS[i]}<hr />{TimeLessonPo[i]}</TableCell>
                    {daysOfWeek.map((dayName, dayIndex) => {
                        const lesson = data.find(
                            (lesson) => lesson.weekDay === dayIndex + 1 && lesson.numberLesson === i
                        );
                        if (lesson) {
                            return (
                                <TableCell className="relative border transform transition-transform duration-200"
                                    key={`lesson-${lesson.id}`}
                                    onMouseEnter={() => setHover(prevState => ({ ...prevState, [lesson.id]: true }))}
                                    onMouseLeave={() => setHover(prevState => ({ ...prevState, [lesson.id]: false }))}
                                >
                                    <div className={`relative w-[140px] h-[70px] flex flex-col items-center justify-center transition-all duration-200`}>
                                        {hover[lesson.id] ? (
                                            <div className='absolute flex items-center justify-center  w-[250px] h-[120px] p-2 bg-gray-200 rounded-lg gap-2'>
                                                <div className='flex-col'>
                                                    <p className="font-bold">{lesson.studentName}</p>
                                                    <p>{lesson.description}</p>
                                                </div>
                                                <div>
                                                    <Link href={`/admin/book/UpdatePage/${lesson.id}`}>
                                                        <button className="flex items-center justify-center bg-[#921CB0] w-[35px] h-[35px] rounded-md text-stone-50">
                                                            <Image className='w-10 h-10 m-5 bg-[#921CB0] rounded-lg p-1' src={edit} alt='editImg' />
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
                                </TableCell>
                            );
                        } else {
                            return (
                                <TableCell className="border" key={`empty-${i}-${dayIndex}`}>
                                    <div className='flex w-[140px] h-[70px] items-center justify-center flex-col gap-2'>
                                        <h1 className='text-[#7E7E7E]'>Свободно</h1>
                                        <Link
                                            href={`/Admin/book/${i}/${dayIndex + 1}/${getDateFromDay(
                                                new Date(context?.weeks?.from),
                                                dayIndex + 1
                                            )}`}
                                        >
                                            <button className="flex items-center justify-center bg-[#921CB0] h-[30px] rounded-md text-stone-50 p-5">Занять аудиторию</button>
                                        </Link>


                                    </div>
                                </TableCell>
                            );
                        }
                    })}
                </TableRow>
            );
            table.push(tablePart);
        }
        return table;
    }

    return (
        <section className="flex items-center justify-center flex-col overflow-hidden">
            {dataset && (
                <div className='overflow-x-scroll w-[100%] '>
                    <Table refProp={slideContainerRef}>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                                    <TableHead key={day}>
                                        {day}
                                        <br />
                                        {getDateFromDay(new Date(context?.weeks?.from), index + 1)}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>{buildTable(dataset)}</TableBody>
                    </Table>
                </div>
            )}
        </section>
    );
}
