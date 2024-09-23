"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import retourImage from '@/assets/img/closse_icon.png'
import Image from 'next/image';
import Link from 'next/link';

interface Diploma {
  Titre: string;
  Institution: string;
  description: string;
  dateObtention: string;
}

export default function EditDiploma({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [titre, setTitre] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dateObtention, setDateObtention] = useState<string>('');

  useEffect(() => {
    const loadDiploma = () => {
      const savedDiplomas = localStorage.getItem('diplomes');
      if (savedDiplomas) {
        const diplomasArray: Diploma[] = JSON.parse(savedDiplomas);
        const diplomaToEdit = diplomasArray[Number(id)];
        if (diplomaToEdit) {
          setTitre(diplomaToEdit.Titre);
          setInstitution(diplomaToEdit.Institution);
          setDescription(diplomaToEdit.description);
          setDateObtention(diplomaToEdit.dateObtention);
        }
      }
    };

    if (id !== 'new') {
      loadDiploma();
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDiploma: Diploma = {
      Titre: titre,
      Institution: institution,
      description,
      dateObtention,
    };

    const savedDiplomas = localStorage.getItem('diplomes');
    const diplomasArray: Diploma[] = savedDiplomas ? JSON.parse(savedDiplomas) : [];

    if (id === 'new') {
      // Ajouter un nouveau diplôme
      diplomasArray.push(newDiploma);
    } else {
      // Éditer le diplôme existant
      diplomasArray[Number(id)] = newDiploma;
    }

    localStorage.setItem('diplomes', JSON.stringify(diplomasArray));
    router.push('/ProfilePage/Diplomes'); // Redirection vers la page des diplômes
  };

  return (
    <div className='text-neutral p-2 text-center mb-40'>
        <Link href={'/ProfilePage/Diplomes'}>
            <Image className='w-8 mb-10' src={retourImage} alt='retour'/>
        </Link>
      <h1 className='text-xl font-bold  mb-10'>{id === 'new' ? "Ajouter un Diplôme" : "Éditer le Diplôme"}</h1>
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
          <label>Institution :</label>
          <input
            type="text"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
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
        <div className='text-left mb-4 flex flex-col'>
          <label>Date d&#39;obtention :</label>
          <input
            type="date"
            value={dateObtention}
            onChange={(e) => setDateObtention(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>
        <button className='bg-primary rounded-lg p-2 w-full' type="submit">{id === 'new' ? "Ajouter le diplôme" : "Sauvegarder les modifications"}</button>
      </form>
    </div>
  );
}
