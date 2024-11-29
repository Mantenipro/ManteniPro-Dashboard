import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar-'
import SortTeams from '../components/SortTeams-'
import Title from '../components/Title-'
import UserCard from '../components/UserCard'
import LefthDashboard from '@/components/LefthDashboard-'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import AddUser from '@/components/AddUser'
import { fetchUsers, getCurrentUser } from '@/pages/api/api'
import useAuth2 from "../hooks/useAuth2";
const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const CatalogoDeUsuarios = () => {
  useAuth2()
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [usuarios, setUsuarios] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortCriteria, setSortCriteria] = useState('')
  const [currentUser, setCurrentUser] = useState(null)


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  useEffect(() => {
    const fetchData = async () => {
      const usuarios = await fetchUsers()
      setUsuarios(usuarios)
    }

    const fetchCurrentUser = async () => {
      const user = await getCurrentUser()
      setCurrentUser(user)
    }

    fetchData()
    fetchCurrentUser()

    const interval = setInterval(() => {
      fetchData()
    }, 3000) // Actualiza cada 3 segundos

    return () => clearInterval(interval)
  }, [])

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria)
  }

  const handleUserDelete = (userId) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.filter((user) => user._id !== userId)
    )
    fetchUsers()
  }

  const sortedUsuarios = [...usuarios].sort((a, b) => {
    if (sortCriteria === 'A a la Z') {
      return a.name.localeCompare(b.name)
    } else if (sortCriteria === 'Z a la A') {
      return b.name.localeCompare(a.name)
    } else if (sortCriteria === 'Antiguo a reciente') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    } else if (sortCriteria === 'Reciente a antiguo') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } 
    return 0
  })
  
  const filteredUsuarios = sortedUsuarios.filter((user) => {
    // Excluir al usuario actual
    if (user._id === currentUser?.id) {
      return false
    }

    // Si el usuario actual es un administrador secundario, excluir al administrador principal
    if (
      currentUser?.adminType === 'secundario' &&
      user.adminType === 'principal'
    ) {
      return false
    }

    // Filtrar por nombre
    return user.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div
      className={`${montserrat.className} relative flex h-dvh flex-row lg:flex-grow`}
    >
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        <LefthDashboard />
      </div>
      <main className='flex-1 p-4'>
        <div className='flex lg:items-center lg:justify-between'>
          <div className='left-4 top-4 z-50 lg:hidden'>
            <button
              onClick={toggleMenu}
              className='rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
          <SearchBar
            className='w-1/2 md:w-1/3'
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <AddUser className='text-sm' />
        </div>

        <div className='mb-4 mt-4'>
          <Title className='text-2xl'>Catálogo de Usuarios</Title>
          <div className='mt-4 flex items-center justify-between'>
            <SortTeams
              sortCriteria={sortCriteria}
              setSortCriteria={handleSortChange}
            />
          </div>
        </div>

        <div className='animate-fadeIn h-[30rem] w-full space-y-8 overflow-y-auto rounded-lg bg-white p-4 shadow-xl scrollbar-hide'>
          {filteredUsuarios.length > 0 ? (
            filteredUsuarios.map((user, index) => (
              <UserCard key={index} user={user} onDelete={handleUserDelete} />
            ))
          ) : (
            <div className='text-center text-2xl text-gray-500'>
              No hay usuarios disponibles.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default CatalogoDeUsuarios
