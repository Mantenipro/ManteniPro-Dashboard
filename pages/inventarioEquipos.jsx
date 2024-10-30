import React, { useState, useEffect } from 'react';
import SearchBar2 from '../components/SearchBar2';
import AddButton from '../components/AddButton';
import InfoPanel2 from '../components/InfoPanel2';
import Title from '../components/Title';
import MachineCard from '../components/MachineCard';
import LefthDashboard from '@/components/LefthDashboard';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { getEquipmentByCompanyId, getAllUsers } from '@/api/api';
import { useRouter } from 'next/router';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const Catalogo = () => {
  const [machines, setMachines] = useState([]); // Equipos
  const [users, setUsers] = useState([]); // Usuarios
  const [owners, setOwners] = useState([]); // Propietarios
  const [selectedAssignedTo, setSelectedAssignedTo] = useState([]); // Cliente seleccionado
  const [selectedLocations, setSelectedLocations] = useState([]); // Ubicación seleccionada
  const [locations, setLocations] = useState([]); // Ubicaciones
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchUsersAndMachines = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (token && email) {
          const userList = await getAllUsers(token);
          setUsers(userList);

          if (!Array.isArray(userList) || userList.length === 0) {
            return;
          }

          const user = userList.find(user => user.email === email);
          const userId = user ? user._id : null;

          if (userId) {
            const data = await getEquipmentByCompanyId(userId, token);
            setMachines(data);

            // Extraer propietarios únicos de los equipos
            const uniqueOwners = [...new Set(data.map(machine => machine.owner))];
            setOwners(uniqueOwners);

            // Extraer ubicaciones únicas de los equipos
            const uniqueLocations = [...new Set(data.map(machine => machine.location))];
            setLocations(uniqueLocations);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndMachines();
  }, [router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Filtrar equipos basados en el cliente, la ubicación seleccionados y el término de búsqueda
  const filteredMachines = machines.filter(machine => {
    const matchesOwner = selectedAssignedTo.length === 0 || selectedAssignedTo.includes(machine.owner);
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(machine.location);
    const matchesSearchTerm = machine.model.toLowerCase().startsWith(searchTerm.toLowerCase()); // Filtrar por modelo

    return matchesOwner && matchesLocation && matchesSearchTerm;
  });

  return (
    <div className={`${montserrat.className} h-dvh flex flex-row lg:flex-grow relative`}>
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full fixed lg:static z-40`}
      >
        <LefthDashboard />
      </div>
      <main className='flex-1 p-6'>
        <div className='flex lg:items-center lg:justify-between'>
          <div className='lg:hidden top-4 left-4 z-50'>
            <button
              onClick={toggleMenu}
              className='text-white bg-[#21262D] p-2 rounded-md focus:outline-none'>
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
          <SearchBar2 className='w-1/2 md:w-1/3 ' searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Pasa el searchTerm */}
          <AddButton className='text-sm' />
        </div>

        <div className='mt-8 mb-4'>
          <Title className='text-2xl ml-4'>Catálogo de equipos</Title>
          <div className='mt-6 flex justify-between items-center'>
            <InfoPanel2
              owners={owners} // Pasar la lista de propietarios aquí
              selectedAssignedTo={selectedAssignedTo}
              setSelectedAssignedTo={setSelectedAssignedTo}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              locations={locations} // Pasar las ubicaciones al InfoPanel2
            />
          </div>
        </div>

        {/* Contenedor de 50vh con scroll para las tarjetas */}
        <div className='h-[70vh] md:h-[65vh] overflow-y-auto mt-8 space-y-6'>
          {filteredMachines.length > 0 ? (
            filteredMachines.map((machine, index) => (
              <MachineCard key={index} machine={machine} />
            ))
          ) : (
            <div>No hay equipos disponibles.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Catalogo;

































