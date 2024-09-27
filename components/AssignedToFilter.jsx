/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react';

const assignedToOptions = ['Alan Urban', 'Roberto Alvarez', 'Uriel Gonzalez'];

const normalizeString = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

const AssignedToFilter = ({ selectedAssignedTo, setSelectedAssignedTo }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const filteredOptions = assignedToOptions.filter((option) =>
    normalizeString(option).includes(normalizeString(searchTerm))
  );

  useEffect(() => {
    const updateDropdownPosition = () => {
      if (buttonRef.current && showDropdown) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    };

    updateDropdownPosition(); 
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleCheckboxChange = (option) => {
    if (selectedAssignedTo.includes(option)) {
      setSelectedAssignedTo(selectedAssignedTo.filter((person) => person !== option));
    } else {
      setSelectedAssignedTo([...selectedAssignedTo, option]);
    }
  };

  const handleNameClick = (option) => {
    handleCheckboxChange(option); 
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        className="bg-transparent border-none p-1 text-sm md:text-base rounded-md bg-gradient-to-r from-[#21262D] to-[#414B66] flex items-center space-x-1"
      >
        <img src="/icon/assignment-icon.png" alt="Asignado a" className="h-4 w-4 md:h-5 md:w-5" />
        <span>Encargado</span>
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="fixed bg-white text-black w-48 p-2 rounded-md shadow-md z-50 max-h-40 overflow-y-auto sm:w-64 md:w-72 md:max-h-60"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md text-xs md:text-sm"
          />
          <ul className="mt-2 text-black">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-1 hover:bg-blue-100 cursor-pointer text-xs md:text-sm"
                onClick={() => handleNameClick(option)} 
              >
                <span className={selectedAssignedTo.includes(option) ? 'font-medium' : ''}>
                  {option}
                </span>
                <input
                  type="checkbox"
                  checked={selectedAssignedTo.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="ml-2 h-3 w-3 md:h-4 md:w-4"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AssignedToFilter;



















