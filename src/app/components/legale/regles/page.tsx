import React from 'react';

const Regles = () => {
    return (
        <div className='max-w-4xl p-6 bg-white rounded-lg shadow-md mb-40'>
            <h1 className='font-extrabold text-3xl mb-6 text-center text-gray-800'>Règles d&apos;Utilisation</h1>
            <p className='mb-4 text-gray-700'>
                Les présentes règles d&apos;utilisation définissent les conditions d&apos;utilisation de notre application pour la génération de CV et lettres de motivation.
            </p>
            <h2 className='font-bold text-2xl mt-4 mb-2'>Comptes Utilisateurs</h2>
            <p className='mb-4 text-gray-700'>
                Pour accéder aux fonctionnalités de l&apos;application, vous devez créer un compte en fournissant des informations exactes et à jour. Vous êtes responsable de la sécurité de vos identifiants de connexion.
            </p>
            <h2 className='font-bold text-2xl mt-4 mb-2'>Crédits et Paiements</h2>
            <p className='mb-4 text-gray-700'>
                Les utilisateurs ont 5 crédits gratuits pour générer des lettres de motivation. Après utilisation de ces crédits, il est possible d&apos;acheter des crédits supplémentaires via notre système de paiement sécurisé.
            </p>
            <h2 className='font-bold text-2xl mt-4 mb-2'>Restrictions d&apos;Utilisation</h2>
            <p className='mb-4 text-gray-700'>
                Vous ne devez pas utiliser l&apos;application pour des activités illégales ou pour générer des contenus offensants ou diffamatoires.
            </p>
        </div>
    );
};

export default Regles;
