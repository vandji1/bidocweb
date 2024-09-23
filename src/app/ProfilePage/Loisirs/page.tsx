"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { faTrash, faEdit, faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import Image from 'next/image';
import Link from 'next/link';
import retourImage from '@/assets/img/closse_icon.png';

interface Loisir {
  Titre: string;
  Description: string;
}

const Loisirs: React.FC = () => {
  const [loisirs, setLoisirs] = useState<Loisir[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadLoisirs = () => {
      const savedLoisirs = localStorage.getItem('loisirs');
      if (savedLoisirs) {
        const parsedLoisirs: Loisir[] = JSON.parse(savedLoisirs);
        setLoisirs(parsedLoisirs);
      }
    };

    loadLoisirs();
  }, []);

  const removeLoisir = (index: number) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Ce loisir sera supprimé !",
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
        const updatedLoisirs = loisirs.filter((_, i) => i !== index);
        localStorage.setItem('loisirs', JSON.stringify(updatedLoisirs));
        setLoisirs(updatedLoisirs);
        Swal.fire('Supprimé!', 'Le loisir a été supprimé.', 'success');
      }
    });
  };

  const renderLoisir = (loisir: Loisir, index: number) => (
    <div key={index} className='text-base-100 bg-neutral p-4 flex flex-row justify-between mb-2'>
      <div className='text-start'>
        <h3 className='font-bold'>{loisir.Titre}</h3>
        <p className='text-sm font-normal'>{loisir.Description}</p>
      </div>
      <div className='flex flex-row gap-4'>
        <button onClick={() => router.push(`Loisirs/${index}`)}>
          <FontAwesomeIcon icon={faEdit} size="lg" className='text-base-100' />
        </button>
        <button onClick={() => removeLoisir(index)}>
          <FontAwesomeIcon icon={faTrash} size="lg" className='text-base-100' />
        </button>
      </div>
    </div>
  );

  return (
    <div className='p-2 text-center mb-40'>
      <Link href={'/ProfilePage'}>
        <Image className='w-8 mb-10' src={retourImage} alt='retour' />
      </Link>
      <h1 className='text-neutral text-2xl font-bold mb-10'>Loisirs</h1>
      {loisirs.length === 0 ? (
        <p className='text-neutral mb-10'>Aucun loisir enregistré</p>
      ) : (
        loisirs.map(renderLoisir)
      )}
      <button onClick={() => router.push('Loisirs/new')} className='text-neutral bg-primary p-2 rounded-lg mt-10 w-full'>
        <FontAwesomeIcon icon={faAdd} size="lg" className='text-neutral' /> Ajouter un nouveau loisir
      </button>
    </div>
  );
};

export default Loisirs;
