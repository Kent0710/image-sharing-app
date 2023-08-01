'use client'

import Button from "./Button";

import { signIn, useSession } from 'next-auth/react'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { signOut } from "next-auth/react";

interface User {
    username : string;
    email : string;
    password : string;
}

const Profile = () => {
    const session = useSession();
    const router = useRouter();

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

    const logOut = async (e : React.SyntheticEvent) => {
        e.preventDefault();
        await signOut({callbackUrl : '/'})
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const editAccount = async (e : React.SyntheticEvent) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) return alert("Password and confirm password doesn't match!")

            const response = await fetch (`/api/editAccount`, {
                method : "PATCH",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({username, password, confirmPassword})
            });
            if (!response.ok) throw new Error ('response on edititng account failed');
            const data = await response.json();
            console.log(data);

            router.refresh();
        } catch(err) {  
            throw new Error (`failed ot edit accunt : ${err}`);
        }
    }

    return (
        <form className="flex flex-col">
            <h1 className="block font-bold text-xl"> Profile </h1>
            
            <div className="flex flex-col h-full w-full gap-3 pl-10" onSubmit={editAccount}>
                <label htmlFor="username" className="block font-bold text-md">Username</label>
                <input type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete={username}
                    required
                    className="w-1/2 rounded-full py-3 px-6 mb-3"
                    placeholder={user.username}
                />

                <label htmlFor="email" className="block font-bold text-md">Email</label>
                <input type="email"
                    name="email"
                    id="email"
                    className="w-1/2 rounded-full py-3 px-6 mb-3"
                    placeholder={user.email}
                />

                <label htmlFor="password" className="block font-bold text-md">Password</label>
                <input type="password"
                    name="password"
                    id="password"
                    className="w-1/2 rounded-full py-3 px-6 mb-3"
                    autoComplete={password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={user.password}
                />

                <label htmlFor="confirmPassword" className="block font-bold text-md">Confirm Password</label>
                <input type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="w-1/2 rounded-full py-3 px-6 mb-10"
                    value={confirmPassword}
                    required 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete={confirmPassword}
                    placeholder={user.password}
                />

                <Button onClick={logOut} text="Logout" type='button' className="bg-cyan-700 w-1/2 rounded-full py-2 text-lg" />
            </div>

        </form>
    )
};

export default Profile;