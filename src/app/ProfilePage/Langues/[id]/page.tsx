"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import retourImage from '@/assets/img/closse_icon.png';
import Image from 'next/image';
import Link from 'next/link';

interface Language {
  langue: string;
  niveau: string;
}

export default function EditLanguage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [langue, setLangue] = useState<string>('');
  const [niveau, setNiveau] = useState<string>('Débutant'); // Par défaut "Débutant"

  useEffect(() => {
    const loadLanguage = () => {
      const savedLanguages = localStorage.getItem('languages');
      if (savedLanguages) {
        const languagesArray: Language[] = JSON.parse(savedLanguages);
        const languageToEdit = languagesArray[Number(id)];
        if (languageToEdit) {
          setLangue(languageToEdit.langue);
          setNiveau(languageToEdit.niveau);
        }
      }
    };

    if (id !== 'new') {
      loadLanguage();
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newLanguage: Language = {
      langue,
      niveau,
    };

    const savedLanguages = localStorage.getItem('languages');
    const languagesArray: Language[] = savedLanguages ? JSON.parse(savedLanguages) : [];

    if (id === 'new') {
      // Ajouter une nouvelle langue
      languagesArray.push(newLanguage);
    } else {
      // Éditer la langue existante
      languagesArray[Number(id)] = newLanguage;
    }

    localStorage.setItem('languages', JSON.stringify(languagesArray));
    router.push('/ProfilePage/Langues'); // Redirection vers la page des langues
  };

  return (
    <div className='text-neutral p-2 text-center mb-40'>
      <Link href={'/ProfilePage/Langues'}>
        <Image className='w-8 mb-10' src={retourImage} alt='retour' />
      </Link>
      <h1 className='text-xl font-bold mb-10'>
        {id === 'new' ? "Ajouter une Langue" : "Éditer la Langue"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='text-left mb-4 flex flex-col'>
          <label className='text-sm'>Langue :</label>
          <input
            type="text"
            value={langue}
            onChange={(e) => setLangue(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='text-left mb-8 flex flex-col'>
          <label className='text-sm'>Niveau :</label>
          <select
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            required
          >
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
            <option value="Courant">Courant</option>
          </select>
        </div>
        <button className='bg-primary rounded-lg p-2 w-full' type="submit">
          {id === 'new' ? "Ajouter la langue" : "Sauvegarder les modifications"}
        </button>
      </form>
    </div>
  );
}
