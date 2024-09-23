'use client';

import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf'; 

interface PersonalInfo {
    name: string;
    surname: string;
    adresse: string;
    tel: string;
    mail: string;
    age?: string; // Optionnel
}

const Motivation = () => {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [entrepriseAdress, setEntrepriseAdress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [credits, setCredits] = useState<number>(2); // Crédits disponibles 

  // Get the current date
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' format

  // Load user data from local storage
  const loadUserData = (): PersonalInfo => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : {}; 
  };

  const personalInfo = loadUserData();
  
  const generateMotivationLetter = async () => { 
    if (!jobTitle || !employerName || !entrepriseAdress) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (!personalInfo.name || !personalInfo.surname || !personalInfo.adresse || !personalInfo.tel || !personalInfo.mail) {
      alert('Veuillez remplir tous les champs avant de générer une lettre de motivation.');
      router.push('/ProfilePage');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('https://api.edenai.run/v2/text/chat', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzRlZGNkMDktZTlmMC00YTU4LTgxMTMtMTAwNTRiMzI0NzBlIiwidHlwZSI6ImFwaV90b2tlbiJ9.NdENh6YugGNm2IS7PyPgn0AyOMB5PHX1i8KriKUMyn0', // Remplacez par votre clé API Edenai
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            providers: "openai/gpt-3.5-turbo",
            text: `Rédigez une lettre de motivation pour le poste de ${jobTitle} à l'entreprise ${employerName}. 
            Veuillez inclure l'adresse de l'employeur ${entrepriseAdress} ainsi que les informations personnelles du demandeur d'emploi suivantes : 
            Nom : ${personalInfo.name} ${personalInfo.surname}, Adresse : ${personalInfo.adresse}, Téléphone : ${personalInfo.tel}, Email : ${personalInfo.mail}.`,
            chatbot_global_action: `Vous êtes un générateur de lettres. Ajoutez les détails suivants dans la lettre : Nom de l'employeur, Nom du candidat, Adresse du candidat, Téléphone du candidat. Pour la date de la lettre, ajoutez la date : Fait le ${formattedDate}. Ne pas inclure de placeholders tels que [ ] — fournissez des informations complètes.`,
            previous_history: [],
            temperature: 0.4,
            max_tokens: 400
          })
      });

      const data = await response.json(); 
      
      if (data && data["openai/gpt-3.5-turbo"] && data["openai/gpt-3.5-turbo"].generated_text) {
        setGeneratedLetter(data["openai/gpt-3.5-turbo"].generated_text);
        
        setCredits(prev => prev - 1);
        localStorage.setItem('credits', JSON.stringify(credits - 1));
        
      } else {
        alert('La génération de la lettre a échoué. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la génération de la lettre de motivation :', error);
      alert('Impossible de générer la lettre. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    
    // Ajustez la largeur selon vos besoins
    const pageWidth = doc.internal.pageSize.getWidth() - 40; // 10 unités de marge de chaque côté
    const textLines = doc.splitTextToSize(generatedLetter, pageWidth);

    doc.text(textLines, 10, 10); // Position du texte
    doc.save('lettre_de_motivation.pdf'); // Nom du fichier PDF
};


  useEffect(() => { 
    const storedCredits = localStorage.getItem('credits');
    if (storedCredits) {
      setCredits(JSON.parse(storedCredits));
    }
  }, []);

  return (
    <div className='text-neutral p-4 mt-10'>
      <input
        className='border rounded-lg p-2 w-full mb-2' 
        placeholder="Titre du poste"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <input
        className='border rounded-lg p-2 w-full mb-2'
        placeholder="Nom de l'entreprise"
        value={employerName}
        onChange={(e) => setEmployerName(e.target.value)}
      />
      <input
        className='border rounded-lg p-2 w-full mb-2'
        placeholder="Adresse de l'entreprise"
        value={entrepriseAdress}
        onChange={(e) => setEntrepriseAdress(e.target.value)}
      />
      <button className='p-4 bg-primary w-full' onClick={generateMotivationLetter}>
        Générer la lettre
      </button>
      {credits > 0 && (
        <p className='p-2'>Vous avez actuellement {credits} crédits disponibles</p>
      )}
      {loading && <p>Chargement...</p>}
      {generatedLetter && (
        <div 
          className='mt-4 '
          dangerouslySetInnerHTML={{ __html: generatedLetter.replace(/\n/g, '<br />') }}
        />
      )}
      {generatedLetter && (
        <button className='p-4 bg-primary w-full mt-4 mb-40' onClick={downloadPDF}>
          Télécharger en PDF
        </button>
      )}
    </div>
  );
};

export default Motivation;
