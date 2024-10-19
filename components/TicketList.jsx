import React, { useState } from 'react';
import TaskCard from './TaskCard'; // Import the TaskCard component
import TicketDetail from './TicketDetail'; // Import the TicketDetail component

export default function TicketList({ tasksInProgress, tasksCompleted }) {
  const [activeTab, setActiveTab] = useState('inProgress'); // State to toggle between the two sections
  const [selectedTask, setSelectedTask] = useState(null); // State to hold the selected task

  const tasksToDisplay = activeTab === 'inProgress' ? tasksInProgress : tasksCompleted;

  const handleCardClick = (task) => {
    setSelectedTask(task); // Set the selected task when a card is clicked
  };

  return (
    <div className="flex w-full h-[80vh] md:h-[80vh] p-4 overflow-hidden bg-white rounded-xl shadow-lg">
      {/* Nuevo div con el tamaño ajustado */}
      <div className="flex max-w-[500px] flex-1">
        {/* Task List and Detail Section */}
        <div className="flex-1 min-w-[500px]"> {/* Agregado min-w aquí */}
          {/* Tabs */}
          <div className="flex flex-col mb-4">
            <div className="flex justify-between items-center">
              {/* En proceso button */}
              <button
                onClick={() => setActiveTab('inProgress')}
                className={`w-1/2 text-lg font-bold py-2 rounded-md ${activeTab === 'inProgress' ? 'bg-gray-300 text-gray-800' : 'text-gray-400'}`}
              >
                En proceso
              </button>
              {/* Completadas button */}
              <button
                onClick={() => setActiveTab('completed')}
                className={`w-1/2 text-lg font-bold py-2 rounded-md ${activeTab === 'completed' ? 'bg-gray-300 text-gray-800' : 'text-gray-400'}`}
              >
                Completadas
              </button>
            </div>
            {/* Línea separadora */}
            <div className="border-b border-gray-300 my-2" />
          </div>

          {/* Scrollable Task List with blur effect */}
          <div className="relative w-full h-[65vh] md:h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {/* Blur effect at top and bottom */}
            <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

            {/* Task cards list */}
            <div className="flex flex-col space-y-5 mt-4">
              {tasksToDisplay.map((task, index) => (
                <TaskCard
                  key={index}
                  picture={task.picture}
                  title={task.title}
                  idOrder={task.idOrder}
                  date={task.date}
                  onClick={() => handleCardClick(task)} // Add onClick handler to set the selected task
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Detail Section */}
      {selectedTask && (
        <TicketDetail task={selectedTask} /> // Show TicketDetail if a task is selected
      )}
    </div>
  );
}










