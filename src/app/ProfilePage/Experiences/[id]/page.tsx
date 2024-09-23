"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import retourImage from '@/assets/img/closse_icon.png'
import Image from 'next/image';
import Link from 'next/link';

interface Experience {
  Poste: string;
  Entreprise: string;
  description: string;
  startDate: string;
  endDate: string;
}

export default function EditExperience({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [poste, setPoste] = useState<string>('');
  const [entreprise, setEntreprise] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const loadExperience = () => {
      const savedExperiences = localStorage.getItem('experiences');
      if (savedExperiences) {
        const experiencesArray: Experience[] = JSON.parse(savedExperiences);
        const experienceToEdit = experiencesArray[Number(id)];
        if (experienceToEdit) {
          setPoste(experienceToEdit.Poste);
          setEntreprise(experienceToEdit.Entreprise);
          setDescription(experienceToEdit.description);
          setStartDate(experienceToEdit.startDate);
          setEndDate(experienceToEdit.endDate);
        }
      }
    };

    if (id !== 'new') {
      loadExperience();
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newExperience: Experience = {
      Poste: poste,
      Entreprise: entreprise,
      description,
      startDate,
      endDate,
    };

    const savedExperiences = localStorage.getItem('experiences');
    const experiencesArray: Experience[] = savedExperiences ? JSON.parse(savedExperiences) : [];

    if (id === 'new') {
      // Ajouter une nouvelle expérience
      experiencesArray.push(newExperience);
    } else {
      // Éditer l'expérience existante
      experiencesArray[Number(id)] = newExperience;
    }

    localStorage.setItem('experiences', JSON.stringify(experiencesArray));
    router.push('/ProfilePage/Experiences'); // Redirection vers la page des expériences
  };

  return (
    <div className='text-neutral p-10 text-center'>
        <Link href={'/ProfilePage/Experiences'}>
            <Image className='w-8 mb-10' src={retourImage} alt='retour'/>
        </Link>
      <h1 className='text-xl font-bold  mb-10'>{id === 'new' ? "Ajouter une Expérience" : "Éditer l'Expérience"}</h1>
      <form onSubmit={handleSubmit}>
        <div className='text-left mb-4 flex flex-col'>
          <label className='text-sm'>Poste :</label>
          <input
            type="text"
            value={poste}
            onChange={(e) => setPoste(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='text-left mb-4 flex flex-col'>
          <label>Entreprise :</label>
          <input
            type="text"
            value={entreprise}
            onChange={(e) => setEntreprise(e.target.value)}
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
        
        <button className='bg-primary rounded-lg p-4 w-full' type="submit">{id === 'new' ? "Ajouter l'expérience" : "Sauvegarder les modifications"}</button>
      </form>
    </div>
  );
} 
