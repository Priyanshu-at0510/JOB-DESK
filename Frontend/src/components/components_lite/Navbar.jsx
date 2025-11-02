import React from 'react'
import { Link } from 'react-router-dom'
import {Popover,PopoverContent,PopoverTrigger} from '../ui/popover.jsx'
import {Avatar,AvatarImage} from "../ui/avatar.jsx"
import {Button} from "../ui/button.jsx"
import {LogOut, User2} from "lucide-react"



const navBar = () => {
    const user=false;
  return (
    <div className='bg-white'>
        <div className='flex items-center justify-between  mx-auto max-w-7xl h-16'>
            <div>
                <h1 className='text-2xl font-bold'>
                    JOB <span className='text-[#022bf8]'>PORTAL</span>
                </h1>
            </div>
            <div className='flex items-center gap-5'>
                <ul className='flex font-medium items-center gap-6 '>
                    <li>Home</li>
                    <li>Browse</li>
                    <li>Job</li>
                </ul>
                {
                 !user?(
                    <div className='flex items-center gap-2'>
                        <Link to="/login"><Button variant="outline">Login</Button></Link>
                        <Link to="/signup"><Button className="bg-red-600 hover:bg-red-700">Register</Button></Link>
                    </div>
                 ):(
                    <Popover className='cursor-pointer'>
                        <PopoverTrigger asChild>
                            <Avatar>
                                <AvatarImage className="cursor-pointer" src="https://imgs.search.brave.com/7JPVrX1-rrex4c53w-1YqddoSVInG8opEOsfUQYuBpU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC83/MC8wMS9kZWZhdWx0/LW1hbGUtYXZhdGFy/LXByb2ZpbGUtaWNv/bi1ncmV5LXBob3Rv/LXZlY3Rvci0zMTgy/NzAwMS5qcGc" alt="@shadcn" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className='flex  items-center gap-4 space-y-2'>
                                <Avatar>
                                    <AvatarImage className="cursor-pointer" src="https://imgs.search.brave.com/7JPVrX1-rrex4c53w-1YqddoSVInG8opEOsfUQYuBpU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC83/MC8wMS9kZWZhdWx0/LW1hbGUtYXZhdGFy/LXByb2ZpbGUtaWNv/bi1ncmV5LXBob3Rv/LXZlY3Rvci0zMTgy/NzAwMS5qcGc" alt="@shadcn" />
                                </Avatar>
                                <div>
                                    <h1 className='font-medium'>Priyanshu singh</h1>
                                    <p className='text-sm text-muted-foreground'>Lorem ipsum dolor, sit amet consectetur adipisicin</p>
                                </div>
        
                            </div>
                            <div className='flex flex-col my-2 text-gray-600'>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <User2></User2>
                                    <Button variant="link">Profile</Button>
                                </div>
                                <div className='flex w-fit  items-center gap-2 cursor-pointer'>
                                    <LogOut></LogOut>
                                    <Button variant="link">Logout</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                 )
                }
                
            </div>
        </div>
       
    </div>
  )
}

export default navBar;