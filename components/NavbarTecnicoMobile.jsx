import React from 'react'
import { Person, Settings, ExitToApp, ArrowBack } from '@mui/icons-material'

export default function NavbarTecnicoMobile() {
  return (
    <header className='flex flex-col lg:hidden'>
      <div className='flex items-center gap-5 p-2'>
        <ArrowBack className='mr-auto size-5 text-slate-600' />
        <Settings className='size-5 text-slate-600' />
        <Person className='size-5 text-slate-600' />
        <ExitToApp className='size-5 text-slate-600' />
      </div>
      <div className='grid w-full bg-gradient-to-b from-[#31416d] to-[#232c48]'>
        <span className='place-content-center p-1 text-center text-lg font-medium text-slate-300 md:p-2 md:text-2xl'>
          Mantenipro
        </span>
      </div>
    </header>
  )
}
