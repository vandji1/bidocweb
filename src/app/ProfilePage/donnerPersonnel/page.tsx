'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import retourImage from '@/assets/img/closse_icon.png'

const ProfilePage = () => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [skills, setSkills] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [tel, setTel] = useState('');
    const [mail, setMail] = useState('');
    const [adresse, setAdresse] = useState('');

    // Charger les données sauvegardées depuis localStorage
    useEffect(() => {
        const loadData = () => {
            const savedData = localStorage.getItem('userData');
            if (savedData) {
                const userData = JSON.parse(savedData);
                setName(userData.name || '');
                setSurname(userData.surname || '');
                setSkills(userData.skills || '');
                setProfileImage(userData.profileImage || '');
                setTel(userData.tel || '');
                setMail(userData.mail || '');
                setAdresse(userData.adresse || '');
                setAge(userData.age || ''); // Assurez-vous d'inclure l'âge
            }
        };
        loadData();
    }, []);

    // Sauvegarder les données dans localStorage
    const handleSave = () => {
        const userData = {
            name,
            surname,
            skills,
            tel,
            mail,
            adresse,
            age,
            profileImage: profileImage || null,
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        router.push('/ProfilePage'); // Redirige vers la page d'accueil ou une autre page
    };

    const pickImage = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (event: Event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];

            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfileImage(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        };

        input.click();
    };

    return (
        <div className="container p-4 mb-40 bg-base-100 md:mt-4 ">
            <Link href={'/ProfilePage'}>
                <Image className='w-8 mb-10' src={retourImage} alt='retour' />
            </Link>
            <h1 className="text-2xl font-bold mb-4 text-neutral text-center">Données personnelles</h1>
            <div className='flex flex-row gap-2'>
                <div className="mb-4">
                    <label className="block text-xs text-neutral">Nom:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-neutral" />
                </div>
                <div className="mb-4">
                    <label className="block text-xs  text-neutral">Prénom:</label>
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-neutral" />
                </div>
            </div>
            <div className='flex flex-row gap-2'>
                <div className="mb-4">
                    <label className="block text-xs text-neutral">Téléphone:</label>
                    <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-neutral" />
                </div>
                <div className="mb-4">
                    <label className="block text-xs text-neutral">Email:</label>
                    <input type="email" value={mail} onChange={(e) => setMail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-neutral" />
                </div>
            </div>

            <div className='flex flex-row gap-2'>
                <div className="mb-4 flex-1">
                    <label className="block text-xs  text-neutral">Adresse:</label>
                    <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-neutral" />
                </div>
                <div className="mb-4  w-12">
                    <label className="block text-xs  text-neutral">Âge:</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-neutral" />
                </div>
            </div>


            <div className="mb-4">
                <label className="block text-xs text-neutral">Que voulez-vous faire comme travail ?</label>
                <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-neutral" />
            </div>
            <div className=' flex flex-col justify-center items-center'>
                <button onClick={pickImage} className="bg-base-100 text-neutral p-2 rounded  ">Choisir votre photo</button>
                {profileImage && (
                    <div className="mt-4">
                        <Image src={profileImage} alt="Image de profil" className="w-24 h-24 rounded-full" width={96} height={96} />
                    </div>
                )}
                <button onClick={handleSave} className="bg-primary text-neutral p-2 rounded mt-4 text-lg font-bold px-10 w-full">Enregistrer</button>
            </div>
        </div>
    );
};

export default ProfilePage;
