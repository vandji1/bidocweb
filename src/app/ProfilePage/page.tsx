'use client'; // Indiquer que c'est un Client Component

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBagShopping, faCertificate, faLanguage, faKey, faFilm, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import profil from '@/assets/img/profile.png' 
import Loader from '../components/loader';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Person {
  id: number;
  nom: string;
  icon: string;
  iconNom: string;
  link: string;
}

const iconMapping: { [key: string]: IconDefinition } = {
  person: faUser,
  bag: faBagShopping,
  certificate: faCertificate,
  language: faLanguage,
  key: faKey,
  film: faFilm,
};

export default function Profile() {
  const [personalInfo, setPersonalInfo] = useState({
    profileImage: '',
    name: 'Votre Nom',
    surname: 'Prénom',
    skills: 'Quel travail vous avez besoin ?',
  });
  const [data, setData] = useState<Person[]>([]); 
 
  const [loading, setLoading] = useState(false); // Loader state 

  const handleClick = async () => {
    try {
      setLoading(true); // Active le loaderm  
    } catch (error) {
      console.error('Erreur lors de la navigation:', error);
      setLoading(false); // Désactiver le loader même en cas d'erreur
    }
  };

  useEffect(() => {
    
    const loadData = async () => { 
      setLoading(true)
      const jsonData = await import('@/json/profile.json');
      setData(jsonData.default);
      setLoading(false)
      

      // Charger les informations personnelles depuis localStorage
      const storedInfo = localStorage.getItem('personalInfo');
      if (storedInfo) {
        setPersonalInfo(JSON.parse(storedInfo));
        setLoading(false)
      }
 
    };

    loadData();
  }, []);

  const renderIcon = (iconName: string) => {
    const iconKey = iconName.split('-')[0]; // On extrait la partie avant le tiret
    return iconMapping[iconKey] ? (
      <FontAwesomeIcon icon={iconMapping[iconKey]} size="lg" className='text-neutral' />
    ) : null;
  };

  return (
    <div style={{ padding: '15px' }}>
      <div className='flex justify-left items-center gap-4 bg-base-100 rounded-lg p-4'>
        <Image
          src={personalInfo.profileImage || profil}
          alt="Profile Picture"
          width={80}
          height={80}
          className='rounded-full border  border-primary'
          priority
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <h2 className='font-bold text-xl text-neutral'>{personalInfo.name} {personalInfo.surname}</h2>
          </div>
          <p className='font-normal text-sm text-neutral'>{personalInfo.skills}</p>
        </div>
      </div>

      {loading ? (
        <Loader/>
      ) : (
        <div style={{ height: '75%', overflowY: 'scroll' }}>
          {data.map((item) => (
            <Link onClick={() => handleClick()}   href={`/ProfilePage/${item.link}`} key={item.id}>
              <div className='flex flex-row justify-between p-4 border-b-2 my-4'>
                <div className='flex justify-center'>
                  {renderIcon(item.iconNom)}
                  <span className='mx-4 font-bold text-lg text-neutral'>{item.nom}</span>
                </div>
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 
