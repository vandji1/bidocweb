"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { faTrash, faEdit, faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import Swal from 'sweetalert2';
import Image from 'next/image';
import Link from 'next/link';
import retourImage from '@/assets/img/closse_icon.png';

interface Diploma {
  Titre: string;
  Institution: string;
  description: string;
  dateObtention: string;
}

const Diplomas: React.FC = () => {
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadDiplomas = () => {
      const savedDiplomas = localStorage.getItem('diplomes');
      if (savedDiplomas) {
        const parsedDiplomas: Diploma[] = JSON.parse(savedDiplomas);
        setDiplomas(parsedDiplomas);
      }
    };

    loadDiplomas();
  }, []);

  const removeDiploma = (index: number) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Ce diplôme sera supprimé !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'bg-primary text-neutral hover:bg-secondary rounded-md',
        cancelButton: 'bg-red-500 text-white hover:bg-red-600 rounded-md',
        popup: 'bg-base-100 rounded-lg',
        title: 'text-xl font-bold text-neutral'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedDiplomas = diplomas.filter((_, i) => i !== index);
        localStorage.setItem('diplomas', JSON.stringify(updatedDiplomas));
        setDiplomas(updatedDiplomas);
        Swal.fire('Supprimé!', 'Votre diplôme a été supprimé.', 'success');
      }
    });
  };

  const renderDiploma = (diploma: Diploma, index: number) => (
    <div key={index} className='text-base-100 bg-neutral p-4 flex flex-row justify-between mb-2'>
      <div className='text-start'>
        <h3 className='font-bold'>{diploma.Titre} - {diploma.Institution}</h3>
        <p className='text-sm font-normal'>{diploma.description}</p>
        <p className='text-sm font-thin'>{`Date d'obtention: ${diploma.dateObtention}`}</p>
      </div>
      <div className='flex flex-row gap-4'>
        <button onClick={() => router.push(`Diplomes/${index}`)}>
          <FontAwesomeIcon icon={faEdit} size="lg" className='text-base-100' />
        </button>
        <button onClick={() => removeDiploma(index)}>
          <FontAwesomeIcon icon={faTrash} size="lg" className='text-base-100' />
        </button>
      </div>
    </div>
  );

  return (
    <div className='p-10 text-center mb-20'> 
      <Link href={'/ProfilePage'}>
        <Image className='w-8 mb-10' src={retourImage} alt='retour'/>
      </Link>
      <h1 className='text-neutral text-2xl font-bold mb-10'>Diplômes</h1>
      {diplomas.length === 0 ? (
        <p className='text-neutral mb-10'>Aucun diplôme enregistré</p>
      ) : (
        diplomas.map(renderDiploma)
      )}
      <button onClick={() => router.push('Diplomes/new')} className='text-neutral bg-primary p-4 rounded-lg mt-10 w-full'>
        <FontAwesomeIcon icon={faAdd} size="lg" className='text-neutral' /> Ajouter un nouveau diplôme
      </button>
    </div>
  );
};

export default Diplomas;
