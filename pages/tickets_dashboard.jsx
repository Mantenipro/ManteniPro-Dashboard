import React from 'react';
import SearchBar from '../components/SearchBar';
import TempSidebar from '../components/TempSidebar';
import Title from '../components/Title';
import BurgerMenu from '../components/BurgerMenu';
import InfoPanel from '../components/InfoPanel'; // Asegúrate de importar InfoPanel

const TicketsDashboard = () => {
  return (
    <div className="min-h-screen bg-white flex relative">
      <div className="relative">
        <TempSidebar /> 
      </div>

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <BurgerMenu className="text-sm" /> 
          <SearchBar className="w-1/2 md:w-1/3" />
        </div>

        <div className="mb-4">
          <Title className="text-2xl">Tickets</Title> 
          
        </div>

       
        <InfoPanel />

       
      </main>
    </div>
  );
};

export default TicketsDashboard;


