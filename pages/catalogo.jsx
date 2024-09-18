import React from 'react';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import AddButton from '../components/AddButton';
import SortTeams from '../components/SortTeams';
import Title from '../components/Title'; 

const Catalogo = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <Title />  {/* Añadir el componente Title */}
        <SearchBar />
        <div className="mt-6 flex justify-between items-center">
          <SortTeams />
          <AddButton />
        </div>
      </main>
    </div>
  );
};

export default Catalogo;





