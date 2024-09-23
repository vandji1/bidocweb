"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import retourImage from '@/assets/img/closse_icon.png';
import Image from 'next/image';
import Link from 'next/link';

interface Loisir {
  Titre: string;
  Description: string;
}

export default function EditLoisir({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [titre, setTitre] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const loadLoisir = () => {
      const savedLoisirs = localStorage.getItem('loisirs');
      if (savedLoisirs) {
        const loisirsArray: Loisir[] = JSON.parse(savedLoisirs);
        const loisirToEdit = loisirsArray[Number(id)];
        if (loisirToEdit) {
          setTitre(loisirToEdit.Titre);
          setDescription(loisirToEdit.Description);
        }
      }
    };

    if (id !== 'new') {
      loadLoisir();
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newLoisir: Loisir = {
      Titre: titre,
      Description: description,
    };

    const savedLoisirs = localStorage.getItem('loisirs');
    const loisirsArray: Loisir[] = savedLoisirs ? JSON.parse(savedLoisirs) : [];

    if (id === 'new') {
      // Ajouter un nouveau loisir
      loisirsArray.push(newLoisir);
    } else {
      // Éditer le loisir existant
      loisirsArray[Number(id)] = newLoisir;
    }

    localStorage.setItem('loisirs', JSON.stringify(loisirsArray));
    router.push('/ProfilePage/Loisirs'); // Redirection vers la page des loisirs
  };

  return (
    <div className='text-neutral p-10 text-center'>
      <Link href={'/ProfilePage/Loisirs'}>
        <Image className='w-8 mb-10' src={retourImage} alt='retour' />
      </Link>
      <h1 className='text-xl font-bold mb-10'>{id === 'new' ? "Ajouter un Loisir" : "Éditer le Loisir"}</h1>
      <form onSubmit={handleSubmit}>
        <div className='text-left mb-4 flex flex-col'>
          <label className='text-sm'>Titre :</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='text-left mb-4 flex flex-col'>
          <label>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
          />
        </div>
        
        <button className='bg-primary rounded-lg p-4 w-full' type="submit">{id === 'new' ? "Ajouter le loisir" : "Sauvegarder les modifications"}</button>
      </form>
    </div>
  );
}
