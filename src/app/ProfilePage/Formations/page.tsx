"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { faTrash, faEdit, faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import Image from 'next/image';
import Link from 'next/link';
import retourImage from '@/assets/img/closse_icon.png';

interface Formation {
  Titre: string;
  Etablissement: string;
  description: string;
  startDate: string;
  endDate: string;
}

const Formations: React.FC = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadFormations = () => {
      const savedFormations = localStorage.getItem('formations');
      if (savedFormations) {
        const parsedFormations: Formation[] = JSON.parse(savedFormations);
        setFormations(parsedFormations);
      }
    };

    loadFormations();
  }, []);

  const removeFormation = (index: number) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette formation sera supprimée !",
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
        const updatedFormations = formations.filter((_, i) => i !== index);
        localStorage.setItem('formations', JSON.stringify(updatedFormations));
        setFormations(updatedFormations);
        Swal.fire('Supprimé!', 'La formation a été supprimée.', 'success');
      }
    });
  };

  const renderFormation = (formation: Formation, index: number) => (
    <div key={index} className='text-base-100 bg-neutral p-4 flex flex-row justify-between mb-2'>
      <div className='text-start'>
        <h3 className='font-bold'>{formation.Titre} - {formation.Etablissement}</h3>
        <p className='text-sm font-normal'>{formation.description}</p>
        <p className='text-sm font-thin'>{formation.startDate} - {formation.endDate}</p>
      </div>
      <div className='flex flex-row gap-4'>
        <button onClick={() => router.push(`Formations/${index}`)}>
          <FontAwesomeIcon icon={faEdit} size="lg" className='text-base-100' />
        </button>
        <button onClick={() => removeFormation(index)}>
          <FontAwesomeIcon icon={faTrash} size="lg" className='text-base-100' />
        </button>
      </div>
    </div>
  );

  return (
    <div className='p-2 text-center mb-40'>
      <Link href={'/ProfilePage'}>
        <Image className='w-8 mb-10' src={retourImage} alt='retour'/>
      </Link>
      <h1 className='text-neutral text-2xl font-bold mb-10'>Formations</h1>
      {formations.length === 0 ? (
        <p className='text-neutral mb-10'>Aucune formation enregistrée</p>
      ) : (
        formations.map(renderFormation)
      )}
      <button onClick={() => router.push('Formations/new')} className='text-neutral bg-primary p-2 rounded-lg mt-10 w-full'>
        <FontAwesomeIcon icon={faAdd} size="lg" className='text-neutral' /> Ajouter une nouvelle formation
      </button>
    </div>
  );
};

export default Formations;
