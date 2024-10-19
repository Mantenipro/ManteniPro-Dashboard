/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import SignatureCanvas from 'react-signature-canvas';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function TicketClosed() {
  const [orderId, setOrderId] = useState('');
  const [solution, setSolution] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const sigCanvas = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validaciones básicas
    if (!orderId || !solution || !startDate || !endDate) {
      setErrorMessage('Por favor, complete todos los campos.');
      setSuccessMessage('');
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos a un servidor
    const formData = {
      orderId,
      solution,
      startDate,
      endDate,
      clientApproval: sigCanvas.current.getTrimmedCanvas().toDataURL(), // Obtén la firma
    };

    console.log('Datos del formulario:', formData); // Simulación de envío

    // Simulación de éxito
    setSuccessMessage('Ticket cerrado exitosamente.');
    setErrorMessage('');
    
    // Reiniciar el formulario (opcional)
    setOrderId('');
    setSolution('');
    setStartDate('');
    setEndDate('');
    sigCanvas.current.clear();
  };

  return (
    <div className={`${montserrat.className}  relative flex h-dvh flex-row lg:flex-grow`}>
      <main className='flex-1  overflow-hidden'> {/* Mantener el contenido dentro de un área sin scroll para el main */}
      <div className="mb-4 text-center"> {/* Div para el título con margen inferior */}
          <h1 className="text-2xl font-bold" style={{ color: '#2E3A59' }}>Cierre de Ticket</h1> {/* Título centrado */}
        </div>

        {successMessage && <div className='text-green-600'>{successMessage}</div>}
        {errorMessage && <div className='text-red-600'>{errorMessage}</div>}

        <div className='mx-auto max-w-lg overflow-y-auto h-[595px] rounded bg-[#F5F5F5] shadow-md pb-40 md:pb-32'> {/* Contenedor para scroll */}
          <form className='p-4 text-sm' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label className='mb-2 font-bold text-gray-700' htmlFor='orderId'>Id de la Orden</label>
              <input
                type='text'
                id='orderId'
                className='w-full rounded border p-2'
                placeholder='Ingrese el ID de la orden'
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)} // Captura el ID
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-2 font-bold text-gray-700' htmlFor='solution'>Solución elaborada por el ingeniero</label>
              <textarea
                id='solution'
                className='w-full rounded border p-2'
                rows='4'
                placeholder='Describa la solución elaborada'
                value={solution}
                onChange={(e) => setSolution(e.target.value)} // Captura la solución
              ></textarea>
            </div>

            <div className='flex flex-col'>
              <label className='mb-2 font-bold text-gray-700' htmlFor='startDate'>Fecha de Inicio</label>
              <input
                type='date'
                id='startDate'
                className='w-full rounded border p-2'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)} // Captura la fecha de inicio
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-2 font-bold text-gray-700' htmlFor='endDate'>Fecha de Término</label>
              <input
                type='date'
                id='endDate'
                className='w-full rounded border p-2'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)} // Captura la fecha de término
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-2 font-bold text-gray-700' htmlFor='clientApproval'>VoBo del Cliente</label>
              <SignatureCanvas
                ref={sigCanvas}
                penColor='black'
                canvasProps={{ className: 'w-full rounded border p-2' }}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}


