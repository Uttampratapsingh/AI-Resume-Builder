import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Mail, Lock, UserRoundPen} from 'lucide-react'

const Login = () => {
  const [searchParams] = useSearchParams()
  const initialState = searchParams.get("state") === "signup" ? "signup" : "login"
  const [state, setState] = React.useState(initialState)

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full sm:w-87.5 text-center bg-white/40 border border-white/20 rounded-2xl px-8">
                <h1 className="text-black/70 text-3xl mt-10 font-medium">
                    {state === "login" ? "Login" : "Sign up"}
                </h1>

                <p className="text-gray-400 text-sm mt-2">{state === "login" ? "Please login in to continue" : "Please sign in to continue"}</p>

                {state !== "login" && (
                    <div className="flex items-center w-full mt-4 bg-white/50 ring-2 ring-white/10 border-1 border-black/10 focus-within:ring-green-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
                        <UserRoundPen />
                        <input type="text" name="name" placeholder="Name" className="w-full bg-transparent text-black placeholder-black/60 focus:ring-0 focus:outline-none border-0" value={formData.name} onChange={handleChange} required />
                    </div>
                )}

                <div className="flex items-center w-full mt-4 bg-white/50 ring-2 ring-white/10 border-1 border-black/10 focus-within:ring-green-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
                    <Mail />
                    <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-black placeholder-black/60 focus:ring-0 focus:outline-none border-0" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="flex items-center w-full mt-4 bg-white/50 ring-2 ring-white/10 border-1 border-black/10 focus-within:ring-green-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
                    <Lock />
                    <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-black placeholder-black/60 focus:ring-0 focus:outline-none border-0" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="mt-4 text-left">
                    <button className="text-sm text-green-400 hover:underline">
                        Forget password?
                    </button>
                </div>

                <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-green-600 hover:bg-green-500 transition " >
                    {state === "login" ? "Login" : "Sign up"}
                </button>

                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer" >
                    {state === "login" ? "Don't have an account?" : "Already have an account?"}
                    <span className="text-green-400 hover:underline ml-1">click here</span>
                </p>
            </form>
            {/* Soft Backdrop*/}
            <div className='fixed inset-0 -z-1 pointer-events-none'>
                <div className='absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-green-800/35 to-transparent rounded-full blur-3xl' />
                <div className='absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-green-700/35 to-transparent rounded-full blur-2xl' />
            </div>
        </div>
    )
}

export default Login