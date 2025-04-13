import confetti from 'canvas-confetti';
import React, { useEffect, useState } from 'react'
import { HiHome } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
  const location = useLocation();
  useEffect(() => {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;

    const confettiInterval = setInterval(() => {
      if (Date.now() > animationEnd) {
        clearInterval(confettiInterval);
      }

      // Random confetti burst
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 250); // every 250ms

    return () => {
      clearInterval(confettiInterval);
    };
  }, []);

  return (
    <section className='m-2 flex-col gap-2 w-full max-w-full flex justify-center items-center max-h-[100vh] min-h-[75vh] bg-green-700 p-4 rounded mx-auto'>
      <div
        className={`
          transition-all  ease-out transform text-center 
          text-slate-100 md:text-lg lg:text-3xl font-bold animate-wiggle
        `}>
        🎉 Order Placed Successfully! 🎉  
      </div>
      <Link to={'/'} className='font-semibold text-sm lg:text-base text-white border animate-fadeIn flex gap-1 items-center justify-center rounded px-1 py-0.5'><HiHome size={18}/> Home</Link>
    </section>
  )
}

export default Success