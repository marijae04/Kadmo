
async function login(data: FormData){
    "use server"

    console.log("Login")
}

async function register(data: FormData){
    "use server"

    console.log("Register")
}

export default function SignInPage(){
    return (
        
        <div className="relative h-full w-full bg-[url('/images/wallpaper.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full bg-opacity-70">

                <nav className="px-10 py-3 absolute top-0 left-0">
                    <img src="/images/logo.png" className="h-12" alt="Logo" />
                </nav>

                <div className="min-h-screen flex flex-col sm:flex-row justify-center items-center">
                    <div className="text-white text-center p-12 rounded-lg flex-1 order-2 mt-5 sm:order-1">
                        <div className="text-4xl mb-4 font-semibold">Log in</div>
                        <form action="login" className="mt-3">
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
                        <form action="register" className="mt-4">
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