
"use client";
import { useState } from 'react';
import { registerUser } from '../../actions/register-user.action';
import { signIn } from 'next-auth/react';
import RootLayout from '@/app/layout';

export default function SignInPage() {
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  const toggleSections = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  async function login(data: FormData) {
    const username = data.get('username')?.valueOf() as string;
    const password = data.get('password')?.valueOf() as string;

    if (!username || !password) {
      alert('Please fill all the fields');
      return;
    }

    try {
      const signInResponse = await signIn('credentials', {
        username,
        password,
        redirect: false,
        callbackUrl: '/',
      });
      
      if (signInResponse?.error && signInResponse.error === 'CredentialsSignin') {
        alert('Invalid username or password');
      } else if (signInResponse?.error) {
        alert('Error logging in');
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
      alert('Error logging in');
    }
  }

  async function register(data: FormData) {
    const name = data.get('name')?.valueOf() as string;
    const email = data.get('email')?.valueOf() as string;
    const username = data.get('username')?.valueOf() as string;
    const password = data.get('password')?.valueOf() as string;

    if (!name || !email || !username || !password) {
      alert('Please fill all the fields');
      return;
    }

    const result = await registerUser({ name, email, username, password });

    if (result?.error) {
      alert(result.error);
    } else {
      alert('Successfully registered, please log in now');
      window.location.href = '/sign-in';
    }
  }

  return (
    <RootLayout showAppBar={false}>

      <div>
        <img src="/images/logo.png" className="h-15 w-40 lg:h-8 ml-10 absolute left-0" alt="Logo"/>
      </div>

        <div className="min-h-screen flex flex-col sm:flex-row justify-center items-center mt-1 overflow:auto">
          <div className="bg-black bg-opacity-80 px-4 py-4 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            {isLoginVisible ? (
              <div className="text-white text-center p-12 rounded-lg flex-1 order-2 sm:order-1">
                <div className="text-4xl mb-4 font-semibold">Log in</div>
                <form action={login} className="mt-3">
                  <div className="mb-4">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="input-field w-full text-black rounded-[50px] text-center"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="input-field w-full text-black rounded-[50px] text-center"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary bg-lime-700 hover:bg-lime-900 transition w-full rounded-[50px]"
                  >
                    Login
                  </button>
                </form>
                <p
                  className="mt-4 text-sm text-white cursor-pointer"
                  onClick={toggleSections}
                >
                  First time in Kadmo? Create an account
                </p>
              </div>
            ) : (
              <div className="text-white text-center p-12 rounded-lg flex-1 order-2 mt-5 sm:order-1">
                <div className="text-4xl mb-4 font-semibold">Register</div>
                <form action={register} className="mt-3">
                  <div className="mb-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="input-field w-full text-black rounded-[50px] text-center"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="email@gmail.com"
                      className="input-field w-full text-black rounded-[50px] text-center"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="input-field w-full text-black rounded-[50px] text-center"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="input-field w-full text-black rounded-[50px] text-center"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary bg-lime-700 hover:bg-lime-900 transition w-full rounded-[50px]"
                  >
                    Register
                  </button>
                </form>
                <p
                  className="mt-4 text-sm text-white cursor-pointer"
                  onClick={toggleSections}
                >
                  Already have an account? Login
                </p>
              </div>
            )}
          </div>
        </div>
    </RootLayout>
  );
}
