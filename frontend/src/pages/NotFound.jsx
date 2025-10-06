import React from 'react'
import notfound from "../assets/404.png"
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'

const NotFound = () => {

    const navigate = useNavigate()
    const handlebutton = ()=>{
        navigate("/")

    }
  return (
    <div className='w-[100vw] h-[100vh] bg-white' >
        <Nav/>
        <div className="flex flex-col justify-start  items-center gap-30 md:gap-14 ">
            <div className="image ">
            <img className='w-[100vh] h-[400px] md:h-[600px]' src={notfound} alt="" />


            </div>
            <div className="elems flex flex-col justify-between items-center gap-8  ">
                <h1 className='text-2xl text-bold text- text-center'>OOPS! PAGE NOT FOUND !</h1>
                <button onClick={handlebutton} className='bg-primary md:px-9 md:py-6 px-3 py-4 text-bold text-xl cursor-pointer hover:bg-hover-color  text-white rounded-3xl'>BACK TO HOME </button>
            </div>
        </div>


    </div>
  )
}

export default NotFound