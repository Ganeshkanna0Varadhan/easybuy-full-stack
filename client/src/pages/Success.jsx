import confetti from 'canvas-confetti';
import React, { useEffect } from 'react'
import { HiHome } from 'react-icons/hi';
import { Link } from 'react-router-dom'

const Success = () => {
  useEffect(() => {
    const duration = 2 * 1000;
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
    <section className="w-full min-h-[75vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="bg-white rounded-3xl shadow-md p-4 lg:p-8 max-w-md w-full flex flex-col items-center gap-5 border-t-[6px] border-emerald-500 animate-fadeIn">
        
        <div className="bg-emerald-100 p-4 rounded-full animate-scaleIn">
          <span className="text-emerald-600 text-5xl">🎉</span>
        </div>
        
        <h2 className="text-2xl lg:text-3xl font-bold text-emerald-700 text-center">
          Order Placed Successfully!
        </h2>

        <p className="text-gray-600 text-center text-sm lg:text-base leading-relaxed">
          Your order has been received and is now being processed. Thank you for shopping with us!
        </p>

        <Link
          to="/"
          className="mt-2 inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-full hover:bg-emerald-700 transition-all font-medium shadow-sm"
        >
          <HiHome size={18} /> Go to Home
        </Link>
      </div>
    </section>
  )
}

export default Success