/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react';

const dateOptions = ['Recientes', 'Últimos'];

const DateFilter = ({ selectedDate, setSelectedDate }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current && showDropdown) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [showDropdown]);

  useEffect(() => {
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
  }, []);

  const handleCheckboxChange = (option) => {
    setSelectedDate(option === selectedDate ? '' : option);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-transparent border-none p-1 text-sm md:text-base rounded-md bg-gradient-to-r from-[#21262D] to-[#414B66] flex items-center space-x-1"
      >
        <img src="/icon/calendar-icon.png" alt="Fecha" className="h-4 w-4 md:h-5 md:w-5" />
        <span>{selectedDate || 'Fecha'}</span>
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="fixed bg-white text-black w-40 p-1 rounded-md shadow-md z-50 max-h-40 overflow-y-auto sm:w-48 md:w-64 md:max-h-60"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <ul className="text-black">
            {dateOptions.map((option, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-1 hover:bg-blue-100 cursor-pointer text-xs md:text-sm"
                onClick={() => handleCheckboxChange(option)}
              >
                <span className={selectedDate === option ? 'font-medium' : ''}>
                  {option}
                </span>
                <input
                  type="checkbox"
                  checked={selectedDate === option}
                  readOnly
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

export default DateFilter;





