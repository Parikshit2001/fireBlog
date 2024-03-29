import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassord] = useState('');

    const create = async(e) => {
        e.preventDefault();
        setError("")
        try {
            const userData = await authService.createAccount({email, name: fullName, password})
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/all-posts")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setEmail('');
            setFullName('');
            setPassord('');
        }
    }

  return (
    <div className="flex items-center justify-center text-white">
        <div className={`mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={(e) => create(e)}>
                <div className='space-y-5'>
                    <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    />
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassord(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup