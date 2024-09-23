import React from 'react';

const Apropos = () => {
    return (
        <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-40'>
            <h1 className='font-extrabold text-3xl mb-6 text-center text-gray-800'>À Propos</h1>
            <p className='mb-4 text-gray-700'>
                Notre application de création de CV et de lettres de motivation vous permet de générer des documents professionnels facilement, grâce à l&apos;intelligence artificielle. Nous offrons également des fonctionnalités telles que :
            </p>
            <h2 className='font-bold text-2xl mt-4 mb-2'>Génération de CV</h2>
            <p className='mb-4 text-gray-700'>
                Créez votre CV en quelques étapes simples et personnalisez-le selon vos besoins.
            </p>
            <h2 className='font-bold text-2xl mt-4 mb-2'>Génération de Lettres de Motivation</h2>
            <p className='mb-4 text-gray-700'>
                Générez des lettres de motivation sur mesure. Chaque utilisateur bénéficie de 5 crédits gratuits pour générer des lettres, après quoi un système de paiement permet d&apos;acquérir plus de crédits.
            </p>
            <h2 className='font-bold text-2xl mt-4 mb-2'>Offres d&apos;emploi</h2>
            <p className='mb-4 text-gray-700'>
                Accédez aux offres d&apos;emploi disponibles dans les 7 pays où nous opérons : Mali, Côte d&apos;Ivoire, Sénégal, Togo, Bénin, Burkina Faso, et Niger.
            </p>
        </div>
    );
};

export default Apropos;
