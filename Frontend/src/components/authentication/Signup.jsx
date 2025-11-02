import React from 'react'
import Navbar from "../components_lite/navBar.jsx"
import {Label} from '../ui/label.jsx'
import {Input} from '../ui/input.jsx'
const Signup = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form action="" className='w-[50%] border border-gray-500 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5 '>Register</h1>
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
            </form>
        </div>
    </div>
  )
}

export default Signup