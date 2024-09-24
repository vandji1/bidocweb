"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { faTrash, faEdit, faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import Swal from 'sweetalert2';
import Image from 'next/image';
import Link from 'next/link';
import retourImage from '@/assets/img/closse_icon.png';

interface Language {
  langue: string;
  niveau: string;
}

const Languages: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadLanguages = () => {
      const savedLanguages = localStorage.getItem('languages');
      if (savedLanguages) {
        const parsedLanguages: Language[] = JSON.parse(savedLanguages);
        setLanguages(parsedLanguages);
      }
    };

    loadLanguages();
  }, []);

  const removeLanguage = (index: number) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette langue sera supprimée !",
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
        const updatedLanguages = languages.filter((_, i) => i !== index);
        localStorage.setItem('languages', JSON.stringify(updatedLanguages));
        setLanguages(updatedLanguages);
        Swal.fire('Supprimé!', 'La langue a été supprimée.', 'success');
      }
    });
  };

  const renderLanguage = (language: Language, index: number) => (
    <div key={index} className='text-base-100 bg-zinc-700  p-4 flex flex-row justify-between mb-2'>
      <div className='text-start'>
        <h3 className='font-bold'>{language.langue} - {language.niveau}</h3>
      </div>
      <div className='flex flex-row gap-4'>
        <button onClick={() => router.push(`Langues/${index}`)}>
          <FontAwesomeIcon icon={faEdit} size="lg" className='text-base-100' />
        </button>
        <button onClick={() => removeLanguage(index)}>
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
      <h1 className='text-neutral text-2xl font-bold mb-10'>Langues</h1>
      {languages.length === 0 ? (
        <p className='text-neutral mb-10'>Aucune langue enregistrée</p>
      ) : (
        languages.map(renderLanguage)
      )}
      <button onClick={() => router.push('Langues/new')} className='text-neutral bg-primary p-2 rounded-lg mt-10 w-full'>
        <FontAwesomeIcon icon={faAdd} size="lg" className='text-neutral' /> Ajouter une nouvelle langue
      </button>
    </div>
  );
};

export default Languages;
