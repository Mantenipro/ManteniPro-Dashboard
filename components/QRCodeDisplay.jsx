import React from 'react';
import Image from 'next/image';
import { Source_Sans_3 } from 'next/font/google';
import { saveAs } from 'file-saver';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const QRCodeDisplay = ({ qrCode }) => {
  const handleSave = async () => {
    if (!qrCode) {
      alert("No hay QR disponible.");
      return;
    }

    try {
      const response = await fetch(qrCode);
      const blob = await response.blob();
      const imageName = qrCode.split('/').pop(); // Extrae el nombre de la imagen desde la URL
      saveAs(blob, imageName); // Guarda la imagen
    } catch (error) {
      console.error("Error al guardar el QR:", error);
      alert("Ocurrió un error al intentar guardar el QR.");
    }
  };

  const handleShare = async () => {
    if (!qrCode) {
      alert("No hay QR disponible para compartir.");
      return;
    }

    try {
      // Intentamos usar la API de Web Share si está disponible
      if (navigator.share) {
        const response = await fetch(qrCode);
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        await navigator.share({
          title: 'QR del Equipo',
          text: 'Mira este código QR del equipo.',
          url: imageUrl,
        });
      } else {
        alert("Compartir no está disponible en este dispositivo.");
      }
    } catch (error) {
      console.error("Error al intentar compartir el QR:", error);
      alert("Ocurrió un error al intentar compartir el QR.");
    }
  };

  return (
    <div
      className={`${sourceSans3.className} lg:mt-6 lg:mr-4 bg-white rounded-lg px-6 py-4 max-w-[25rem] mt-3 flex flex-col justify-between min-h-[32rem] shadow-lg mx-3`}
    >
      <div className='w-full mb-4'>
        <Image
          src='/curved-shape.png'
          alt='Curved Shape'
          width={300}
          height={100}
          className='w-full object-cover'
        />
      </div>

      <div className='mb-5'>
        <Image
          src={qrCode || '/default-equipment.jpg'} 
          alt='Imagen del equipo'
          width={150}
          height={150}
          className='mx-auto'
        />
      </div>

      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-4'>
          QR <span className='underline decoration-[#FDB623]'>Equipo</span>
        </h2>
        <p className='text-gray-500'>
          ¡Haz que tu cliente disfrute la comodidad de aplicar este QR en su equipo ahora mismo!
        </p>
      </div>

      <div className='text-center space-x-4'>
        <button
          onClick={handleSave}
          className='bg-[#333333] text-white font-semibold inline-flex items-center justify-center rounded-md py-3 px-6 shadow-lg hover:shadow-xl transition-shadow'
        >
          Guardar
          <span className='ml-2 text-[#FDB623]'>→</span>
        </button>
        
        <button
          onClick={handleShare}
          className='bg-[#25D366] text-white font-semibold inline-flex items-center justify-center rounded-md py-3 px-6 shadow-lg hover:shadow-xl transition-shadow'
        >
          Compartir
          <span className='ml-2 text-[#FDB623]'>→</span>
        </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;





























