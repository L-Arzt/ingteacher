'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { registerUser } from './actions';

export default function Form() {
    const router = useRouter();
    const [error, setError] = useState('');

    async function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await registerUser(formData);

        if (response.status === 'success') {
            router.push('/');
            router.refresh();
        } else {
            setError(response.message);
        }
    }

    return (
        <form onSubmit={submitHandler} className='border p-5 w-1/2 flex flex-col mx-auto mt-[30px]'>
            <input className='border p-3 my-3 rounded-md' required type="text" name='userName' placeholder="ФИО" />
            <input className='border p-3 my-3 rounded-md' required type="text" name='email' placeholder="E-mail" />
            <input className='border p-3 my-3 rounded-md' required type="password" name='password' placeholder="Пароль" />

            <h3 className="text-lg flex justify-center items-center">Выберите тип пользователя:</h3>
            <select name='role' className="bg-inherit border-b-2 p-3 my-3">
                <option value="user">Ученик</option>
                <option value="admin">Админ</option>
            </select>

            <button className='border px-10 py-2 rounded-md w-fit mx-auto '>Зарегистрироваться</button>
            {error && <p className='font-bold text-red-500'>{error}</p>}
            <div className='flex mx-auto mt-5'>
                <p className='text-slate-400'>Страница входа  - </p>
                <Link className='underline ml-3' href={'/login'}>Войти</Link>
            </div>
        </form>
    );
}
