"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import retourImage from '@/assets/img/closse_icon.png';
import Image from 'next/image';
import Link from 'next/link';

interface Formation {
  Titre: string;
  Etablissement: string;
  description: string;
  startDate: string;
  endDate: string;
}

export default function EditFormation({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [titre, setTitre] = useState<string>('');
  const [etablissement, setEtablissement] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const loadFormation = () => {
      const savedFormations = localStorage.getItem('formations');
      if (savedFormations) {
        const formationsArray: Formation[] = JSON.parse(savedFormations);
        const formationToEdit = formationsArray[Number(id)];
        if (formationToEdit) {
          setTitre(formationToEdit.Titre);
          setEtablissement(formationToEdit.Etablissement);
          setDescription(formationToEdit.description);
          setStartDate(formationToEdit.startDate);
          setEndDate(formationToEdit.endDate);
        }
      }
    };

    if (id !== 'new') {
      loadFormation();
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFormation: Formation = {
      Titre: titre,
      Etablissement: etablissement,
      description,
      startDate,
      endDate,
    };

    const savedFormations = localStorage.getItem('formations');
    const formationsArray: Formation[] = savedFormations ? JSON.parse(savedFormations) : [];

    if (id === 'new') {
      // Ajouter une nouvelle formation
      formationsArray.push(newFormation);
    } else {
      // Éditer la formation existante
      formationsArray[Number(id)] = newFormation;
    }

    localStorage.setItem('formations', JSON.stringify(formationsArray));
    router.push('/ProfilePage/Formations'); // Redirection vers la page des formations
  };

  return (
    <div className='text-neutral p-2 text-center mb-40'>
      <Link href={'/ProfilePage/Formations'}>
        <Image className='w-8 mb-10' src={retourImage} alt='retour' />
      </Link>
      <h1 className='text-xl font-bold mb-10'>{id === 'new' ? "Ajouter une Formation" : "Éditer la Formation"}</h1>
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
          <label>Etablissement :</label>
          <input
            type="text"
            value={etablissement}
            onChange={(e) => setEtablissement(e.target.value)}
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
          <label>Date de début :</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='text-left mb-4 flex flex-col'>
          <label>Date de fin :</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>

        <button className='bg-primary rounded-lg p-2 w-full' type="submit">{id === 'new' ? "Ajouter la formation" : "Sauvegarder les modifications"}</button>
      </form>
    </div>
  );
}
