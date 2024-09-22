// LocationFilter.js
import React, { useState, useRef, useEffect } from 'react';

const locationOptions = ['CDMX Álvaro Obregón', 'CDMX Azcapotzalco', 'CDMX Benito Juárez'];

const LocationFilter = ({ selectedLocations, setSelectedLocations }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const buttonRef = useRef(null);

  const filteredOptions = locationOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (buttonRef.current && showDropdown) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [showDropdown]);

  const handleCheckboxChange = (option) => {
    if (selectedLocations.includes(option)) {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== option));
    } else {
      setSelectedLocations([...selectedLocations, option]);
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-transparent border-none p-1 text-sm rounded-md bg-gradient-to-r from-[#21262D] to-[#414B66] flex items-center space-x-1"
      >
        <img src="/icon/location-icon.png" alt="Localización" className="h-4 w-4" />
        <span>Localización</span>
      </button>
      {showDropdown && (
        <div
          className="fixed bg-white text-black w-64 p-2 rounded-md shadow-md z-50"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            maxHeight: '50vh',
            overflowY: 'auto',
          }}
        >
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md text-black"
          />
          <ul className="mt-2 text-black">
            {filteredOptions.map((option, index) => (
              <li key={index} className="flex justify-between items-center p-2 hover:bg-blue-100 cursor-pointer">
                <span className={selectedLocations.includes(option) ? 'font-medium' : ''}>
                  {option}
                </span>
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="ml-2"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationFilter;




