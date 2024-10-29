import React from 'react'

const Register = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-7 text-yellow-400 text-2xl'>
        <center className='text-3xl text-yellow-400 font-bold'>
            Register
        </center>
        <div>

        <div>
            <h1 className='font-bold'>Your Account Address</h1>
            <h2 className='text-xl'>0xbC2b806d11c1959E709A3b6d20188140275EE364</h2>
        </div>
        <br />
        <div>
            <h1 className='font-bold'>Your Account Balance</h1>
            <h2 className='text-xl'>0.00002ETH</h2>
        </div>
        <br />
        
        <div className='flex flex-col'>
            <label className='text-yellow-400' htmlFor="">Enter Your Name</label>
            <input placeholder='Enter Your Name' className='h-12 px-2 bg-black border-2 border-yellow-400 w-80 text-yellow-400' type="text" />
        </div>
        </div>
    </div>
  )
}

export default Register