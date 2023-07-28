'use client'

import Button from "./Button";

import { useSession } from 'next-auth/react'

import { useState, useEffect } from "react";

interface User {
    username : string;
    email : string;
    password : string;
}

const Profile = () => {
    const session = useSession();

    const [user, setUser] = useState<User>({
        username : '',
        email : '',
        password : ''
    });;

    useEffect(() => {
        const updateUser = async () => {
            setUser({
                username : session.data?.user?.name || '',
                email : session.data?.user?.email || '',
                password : 'thisisthepassword'
            })
        }
        updateUser();
    }, [session.data])

    const test = async (e : React.SyntheticEvent) => {
        e.preventDefault();
        try {

            const response = await fetch (`/api/test`, {
                method : "GET",
                headers : {"Content-Type" : "application/json"},
            });

            if (!response.ok) throw new Error ('error');

            const data = await response.json();
            console.log(data);

        } catch (err) {
            throw new Error (`error on : ${err}`)
        }
    }

    return (
        <form className="flex flex-col gap-3">
            <h1 className="block font-bold text-xl"> Profile </h1>
            
            <div className="flex flex-col h-full w-full gap-3 pl-10">
                <label htmlFor="username" className="block font-bold text-md">Username</label>
                <input type="text"
                    name="username"
                    id="username"
                    className="w-1/2 rounded-full py-3 px-6 mb-10"
                    placeholder={user.username}
                />

                <label htmlFor="email" className="block font-bold text-md">Email</label>
                <input type="email"
                    name="email"
                    id="email"
                    className="w-1/2 rounded-full py-3 px-6 mb-10"
                    placeholder={user.email}
                />

                <label htmlFor="password" className="block font-bold text-md">Password</label>
                <input type="password"
                    name="password"
                    id="password"
                    className="w-1/2 rounded-full py-3 px-6 mb-10"
                    placeholder={user.password}
                />

                <label htmlFor="confirmPassword" className="block font-bold text-md">Confirm Password</label>
                <input type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="w-1/2 rounded-full py-3 px-6 mb-10"
                    placeholder={user.password}
                />

                <Button text="Save changes" className="bg-blue-500 w-1/2 rounded-full py-2 text-lg" type='submit' />
                <Button onClick={test} type="button" text="Delete account" className="bg-red-500 w-1/2 rounded-full py-2 text-lg mt-5" />
            </div>

        </form>
    )
};

export default Profile;