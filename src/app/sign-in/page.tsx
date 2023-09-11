"use client";

import { registerUser } from "../../actions/register-user.action";

import { signIn } from "next-auth/react";

export default function SignInPage() {
    async function login(data: FormData){
        const username = data.get("username")?.valueOf() as string;
        const password = data.get("password")?.valueOf() as string;

        if (!username || !password) {
            alert('Please fill all the fields')
            return;
        }

        try {
            console.log("SALJEM")
            const signInResponse = await signIn('credentials', {
                username,
                password,
                redirect: false,
                callbackUrl: '/'
            })

            console.log(signInResponse)

            if(signInResponse?.error && signInResponse.error === 'CredentialsSignin'){
                console.log(signInResponse)
                alert('Invalid username or password');
                return;
            }else if(signInResponse?.error){
                console.log(signInResponse)
                alert('Error logging in')
                return;
            }else{
                console.log(signInResponse)
                window.location.href = '/';
            }
            
        } catch (error) {
            console.log(error)
            alert('Error logging in')
        }
    }

    async function register(data: FormData) {
        const name = data.get("name")?.valueOf() as string;
        const email = data.get("email")?.valueOf() as string;
        const username = data.get("username")?.valueOf() as string;
        const password = data.get("password")?.valueOf() as string;

        if (!name || !email || !username || !password) {
            alert('Please fill all the fields')
            return;
        }

        const result = await registerUser({ name, email, username, password });

        if (result?.error) {
            alert(result.error);
            return;
        }else{
            alert('Successfully registered, please log in now');
            window.location.href = '/sign-in';
        }
    }

    return (
        
        <div className="">
            <div className="bg-black w-full h-full bg-opacity-70">

                <div className="min-h-screen flex flex-col sm:flex-row justify-center items-center">
                    <div className="text-white text-center p-12 rounded-lg flex-1 order-2 mt-5 sm:order-1">
                        <div className="text-4xl mb-4 font-semibold">Log in</div>
                        <form action={login} className="mt-3">
                        <div className="mb-4">
                            <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="input-field w-4/5 text-black rounded-[50px] text-center"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input-field w-4/5 text-black rounded-[50px] text-center"
                            />
                        </div>
                        <button type="submit" className="btn-primary bg-green-700 hover:bg-green-900 tranisitio w-4/5  rounded-[50px]">
                            Login
                        </button>
                        </form>
                    </div>

                    <div className="ml-6 text-white text-center p-9 rounded-lg flex-1 order-1 mt-10 sm:order-2">
                        <div className="text-4xl mb-4 font-semibold">Register</div>
                        <form action={register} className="mt-4">
                        <div className="mb-4">
                            <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="input-field w-4/5 text-black rounded-[50px] text-center"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                            type="email"
                            name="email"
                            placeholder="email@gmail.com"
                            className="input-field w-4/5 text-black rounded-[50px] text-center"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="input-field w-4/5 text-black rounded-[50px] text-center"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input-field w-4/5 text-black rounded-[50px] text-center"
                            />
                        </div>
                        <button type="submit" className="btn-primary bg-green-700 hover:bg-green-900 tranisitio w-4/5 rounded-[50px]">
                            Register
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}