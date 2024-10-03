import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function TicketCard({ title, description, username, date, priority, ticketId }) {

  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const priorityClass = {
    Alta: 'text-red-500 bg-red-100',
    Media: 'text-yellow-500 bg-yellow-100',
    Baja: 'text-green-500 bg-green-100',
  }[priority] || 'text-gray-500 bg-gray-100';

  return (
    <Link href={'StatusDetail'}>
      <button
        className={`mb-2 rounded-lg p-2 shadow-md transition-all duration-200 ${isHovered ? 'bg-gradient-to-r from-[#21262D] to-[#414B66]' : 'bg-white'} md:mb-3 md:rounded-xl md:p-3 md:shadow-lg`} // Para desktop
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ maxWidth: '300px' }} // Ajusta el ancho máximo de la tarjeta en móvil y tablet
      >
        <div className='flex items-start justify-between'>
          <span className={`rounded-full px-1 py-0.5 text-xs ${priorityClass}`}>
            {priority}
          </span>
          <span
            className={`text-xs ${isHovered ? 'text-white' : 'text-gray-400'}`}
          >
            {date}
          </span>
        </div>
        <h3
          className={`mb-1 text-base font-semibold ${isHovered ? 'text-white' : 'text-gray-900'}`}
        >
          {title}
        </h3>
        <p
          className={`mb-2 text-xs ${isHovered ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {description}
        </p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <img
              src='/profile.jpg'
              alt={username}
              className='mr-1 h-6 w-6 rounded-full'
            />
            <span
              className={`text-xs ${isHovered ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {username}
            </span>
          </div>
          <span
            className={`text-xs ${isHovered ? 'text-gray-300' : 'text-gray-500'}`}
          >
            {ticketId}
          </span>
        </div>
      </button>
    </Link>
  )
}

export default TicketCard;














