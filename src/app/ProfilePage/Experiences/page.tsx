"use client";

import React, { useEffect, useState,} from 'react';
import { useRouter } from 'next/navigation';
import { faTrash, faEdit, faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import Swal from 'sweetalert2';
import Image from 'next/image';
import Link from 'next/link';
import retourImage from '@/assets/img/closse_icon.png'

interface Experience {
  Poste: string;
  Entreprise: string;
  description: string;
  startDate: string;
  endDate: string;
}

const Experiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadExperiences = () => {
      const savedExperiences = localStorage.getItem('experiences');
      if (savedExperiences) {
        const parsedExperiences: Experience[] = JSON.parse(savedExperiences);
        setExperiences(parsedExperiences);
      }
    };

    loadExperiences();
  }, []);

  const removeExperience = (index: number) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette expérience sera supprimée !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler',
      // Vous pouvez aussi appliquer les couleurs ici
      customClass: {
        confirmButton: 'bg-primary text-neutral hover:bg-secondary rounded-md',
        cancelButton: 'bg-red-500 text-white hover:bg-red-600 rounded-md',
        popup: 'bg-base-100 rounded-lg', // Couleur de fond de la boîte
        title: 'text-xl font-bold text-neutral' // Style du titre 
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        localStorage.setItem('experiences', JSON.stringify(updatedExperiences));
        setExperiences(updatedExperiences);
        Swal.fire('Supprimé!', 'Votre expérience a été supprimée.', 'success');
      }
    });
  };
  

  const renderExperience = (experience: Experience, index: number) => (
    <div key={index} className='text-base-100 bg-neutral p-4 flex flex-row justify-between mb-2'>
      <div className='text-start'>
        <h3 className='text font-bold'>{experience.Poste} Chez {experience.Entreprise}</h3>
        <p className='text-sm font-normal'>{experience.description}</p>
        <p className='text-sm font-thin'>{`De ${experience.startDate} à ${experience.endDate}`}</p>
      </div>
      <div className='flex flex-row gap-4'>
        <button onClick={() => router.push(`Experiences/${index}`)}>
          <FontAwesomeIcon icon={faEdit} size="lg" className='text-base-100' />
        </button>
        <button onClick={() => removeExperience(index)}>
          <FontAwesomeIcon icon={faTrash} size="lg" className='text-base-100' />
        </button>
      </div>
    </div>
  );

  return (
    <div className='p-10 text-center mb-20'> 
    <Link href={'/ProfilePage'}>
            <Image className=' w-8 mb-10' src={retourImage} alt='retour'/>
        </Link>
      <h1 className='text-neutral text-2xl font-bold mb-10'>Expériences</h1>
      {experiences.length === 0 ? (
        <p className='text-neutral mb-10'>Aucune expérience enregistrée</p>
      ) : (
        experiences.map(renderExperience)
      )}
      <button onClick={() => router.push('Experiences/new')} className='text-neutral bg-primary p-4 rounded-lg mt-10 w-full'>
        <FontAwesomeIcon icon={faAdd} size="lg" className='text-neutral' /> Ajouter une nouvelle expérience
      </button>
    </div>
  );
};

export default Experiences;
