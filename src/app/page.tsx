'use client'

import { useEffect, useState } from 'react';
import Image from "next/image";
import { Html, Head, Main, NextScript } from 'next/document';
import cvImage from "@/assets/img/cover.png"
import lettreImage from "@/assets/img/motivation.png"
import factureImage from "@/assets/img/factu.png"
import Legale from "./components/legale/page";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Loader from './components/loader';
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loader state

  const handleClick = async () => {
    try {
      setLoading(true); // Active le loader  
    } catch (error) {
      console.error('Erreur lors de la navigation:', error);
      setLoading(false); // Désactiver le loader même en cas d'erreur
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : null}

      <div className="text-black m-4 md:flex md:flex-row gap-4 justify-center">

        <div className="bg-base-100 max-w-96 p-8 rounded-2xl mb-28 shadow-2xl">
          <div className="text-center">
            <h1 className="text-2xl font-black text-center my-4">Votre CV sur-mesure, en un rien d temps</h1>
            <h2 className="text-x font-normal text-center my-4 ">En seulement 5 secondes, obtenez un CV personalisé en remplissant votre  profil.</h2>
          </div>
          <Link href='/ProfilePage'>
            <div className="font-black bg-primary text-center p-2 rounded-xl text-neutral">Remplir  mon profile CV</div>
          </Link>
          <Image
            src={cvImage} // Assurez-vous d'utiliser un chemin absolu
            alt="Image de couverture"
            className="w-full rounded-lg my-4"
          />
        </div>

        <div className="bg-neutral max-w-96 p-8 rounded-2xl mb-28 shadow-2xl">
          <div className="text-center">
            <h1 className="text-2xl font-black text-center my-4 text-base-100">Créer une facture pro</h1>
            <h2 className="text-x font-normal text-center my-4 text-base-100">Votre facture pro en quelques secondes.</h2>
          </div>
          <Link href='/ProfilePage' onClick={() => handleClick()} >
            <div className="font-black bg-primary text-center p-2 rounded-xl text-neutral">Créer une facture de vente</div>
          </Link>
          <Image
            src={factureImage} // Assurez-vous d'utiliser un chemin absolu
            alt="Image de facture"
            className="w-full rounded-lg my-4"
            priority
          />
        </div>



        <div className="bg-secondary max-w-96 p-8 rounded-2xl mb-28 shadow-2xl">
          <div className="text-center">
            <h1 className="text-2xl font-black text-center my-4">Lettre de motivation e un Clic !</h1>
            <h2 className="text-x font-normal text-center my-4 ">Laissez-nous vous aider à créer une lettre convaincante e quelques secondes.</h2>
          </div>
          <Link href='/MotivationPage'>
            <div className="font-black bg-primary text-center p-2 rounded-xl text-neutral">Générer une lettre de motivation</div>
          </Link>
          <Image
            src={lettreImage} // Assurez-vous d'utiliser un chemin absolu
            alt="Image de couverture"
            className="w-full rounded-lg my-4"
          />
        </div>

      </div>
      <div className="mt-10 mb-40">
        <Legale />
      </div>

    </>
  );
}
