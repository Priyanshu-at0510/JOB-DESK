import React from 'react'
import Navbar from "../components_lite/navBar.jsx"
import {Label} from '../ui/label.jsx'
import {Input} from '../ui/input.jsx'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group.jsx'
const Signup = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form action="" className='w-[50%] border border-gray-500 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5 text-center text-blue-600 '>Register</h1>
                <div className='my-2'>
                    <Label className="">Name</Label>
                    <Input type="text" placeholder="Priyanshu singh" className="my-2" ></Input>
                </div>
                <div className='my-2'>
                    <Label className="">Email</Label>
                    <Input type="email" placeholder="example@gmail.com" className="my-2" ></Input>
                </div>
                <div className='my-2'>
                    <Label className="">Password</Label>
                    <Input type="password" placeholder="********" className="my-2" ></Input>
                </div>
                <div className='my-2'>
                    <Label className="">Tel-no:</Label>
                    <Input type="tel" placeholder="6359******" className="my-2" ></Input>
                </div>
                <div className='flex items-center justify-between'>
                    <Label>Role</Label>
                    <RadioGroup className="flex items-centergap-4 my-5">
                    <div className="flex items-center gap-3">
                        <Input
                        type="radio"
                        name="role"
                        value="student"
                        className="cursor-pointer"
                        />
                        <Label htmlFor="r1">Student</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Input
                        type="radio"
                        name="role"
                        value="recruiter"
                        className="cursor-pointer"
                        />
                        <Label htmlFor="r2">Recruiter</Label>
                    </div>
                    </RadioGroup>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Label>Profile Photo</Label>
                        <Input type="file" accept="image/*" className="cursor-pointer"/>
                    </div>
                    <button className='bg-blue-600 text-white px-4 py-2 w-full rounded-md mt-4 hover:bg-blue-700'>Sign Up</button>
                    {/* already have an account */}
                    <p className='text-gray-500 text-sm my-2'>
                        Already have an account? <a href="/Login" className='text-blue-600 hover:underline'>Login</a>
                    </p>
            </form>
        </div>
    </div>
  )
}

export default Signup