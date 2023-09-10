
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
        <div>
            <div className="log-in-container">
                <h1>Log in</h1>
                <form action="login">
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                </form>
            </div>
            <div className="register-container">
                <h1>Register</h1>
                <form action="register">
                    <input type="text" name="name" placeholder="Name" />
                    <input type="email" name="email" placeholder="email@gmail.com" />
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                </form>
            </div>
        </div>
    )
}