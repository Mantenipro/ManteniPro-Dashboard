import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SortTeams from '../components/SortTeams';
import Title from '../components/Title';
import UserCard from '../components/UserCard';
import LefthDashboard from '@/components/LefthDashboard';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import AddEmployee from '@/components/AddEmployee';
import { getAllUsers } from '@/api/api'; // Asegúrate de que esta función esté en tu API
import useAuth2 from "../hooks/useAuth2";
import useAuth3 from "../hooks/useAuth3";
const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const CatalogoDeTecnicos = () => {
  useAuth2();
  useAuth3()
  const [showProfilesMenu, setShowProfilesMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]); // Cambiar "tecnicos" a "usuarios"
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [company, setCompany] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
  
        if (token && email) {
          // Obtener todos los usuarios
          const users = await getAllUsers(token);
  
          // Encontrar al usuario que coincide con el email del localStorage
          const currentUser = users.find(user => user.email === email);
  
          if (currentUser) {
            setCompany(currentUser.company); // Establecer la empresa del usuario
  
            // Filtrar usuarios que sean admin o tecnicos, no coincidan con el usuario actual, y no tengan adminType 'principal'
            const filteredUsers = users.filter(
              user =>
                (user.role === 'admin' || user.role === 'tecnico') &&
                user.company === currentUser.company &&
                user.email !== email && // Excluir el perfil del usuario actual
                user.adminType !== 'principal' // Excluir usuarios con adminType 'principal'
            );
  
            setUsuarios(filteredUsers); // Asignar los usuarios filtrados
          }
        }
      } catch (error) {
        //console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  
    const interval = setInterval(() => {
      fetchData();
    }, 3000); // Actualiza cada 3 segundos
  
    return () => clearInterval(interval);
  }, []);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleUserDelete = (userId) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.filter((user) => user._id !== userId)
    );
  };

  const sortedUsuarios = [...usuarios].sort((a, b) => {
    if (sortCriteria === 'A a la Z') {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === 'Z a la A') {
      return b.name.localeCompare(a.name);
    } else if (sortCriteria === 'Antiguo a reciente') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortCriteria === 'Reciente a antiguo') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const filteredUsuarios = sortedUsuarios.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${montserrat.className} relative flex h-dvh flex-row lg:flex-grow`}>
      <div className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}>
        <LefthDashboard />
      </div>
      <main className='flex-1 p-4'>
        <div className='flex lg:items-center lg:justify-between'>
          <div className='left-4 top-4 z-50 lg:hidden'>
            <button onClick={toggleMenu} className='rounded-md bg-[#21262D] p-2 text-white focus:outline-none'>
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
          <SearchBar className='w-1/2 md:w-1/3' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <AddEmployee className='text-sm' />
        </div>

        <div className='mb-4 mt-4'>
          <Title className='text-2xl'>Catálogo de Empleados</Title>
          <div className='mt-4 flex items-center justify-between'>
            <SortTeams sortCriteria={sortCriteria} setSortCriteria={handleSortChange} />
          </div>
        </div>

        <div className='animate-fadeIn h-[70vh] md:h-[65vh] overflow-y-auto mt-8 space-y-6'>
          {filteredUsuarios.length > 0 ? (
            filteredUsuarios.map((user, index) => (
              <UserCard key={index} user={user} onDelete={handleUserDelete} />
            ))
          ) : (
            <div className='text-center text-2xl text-gray-500'>
              No hay empleados disponibles.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CatalogoDeTecnicos;


