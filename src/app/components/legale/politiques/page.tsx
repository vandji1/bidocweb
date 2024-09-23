import React from 'react';

const Politique = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-40">
            <h1 className="font-extrabold text-3xl mb-6 text-center text-gray-800">Politique de Confidentialité</h1>
            <p className="mb-4 text-gray-700">
                Cette politique de confidentialité décrit comment votre information personnelle est collectée, utilisée et partagée lorsque vous utilisez notre application de création de CV et lettres de motivation.
            </p>
            <h2 className="font-bold text-2xl mt-4 mb-2">Informations collectées</h2>
            <p className="mb-4 text-gray-700">
                Nous collectons vos informations telles que votre nom, adresse email, et informations de paiement uniquement lorsque vous vous inscrivez et effectuez des transactions sur l&apos;application.
            </p>
            <h2 className="font-bold text-2xl mt-4 mb-2">Utilisation des informations</h2>
            <p className="mb-4 text-gray-700">
                Les informations collectées sont utilisées pour vous fournir les fonctionnalités de l&apos;application telles que la génération de CV et lettres de motivation, la gestion des crédits, et le traitement des paiements.
            </p>
            <h2 className="font-bold text-2xl mt-4 mb-2">Partage des informations</h2>
            <p className="mb-4 text-gray-700">
                Nous ne partageons vos informations personnelles avec des tiers que lorsque cela est nécessaire pour traiter vos paiements ou respecter des obligations légales.
            </p>
            <h2 className="font-bold text-2xl mt-4 mb-2">Sécurité</h2>
            <p className="mb-4 text-gray-700">
                Nous mettons en œuvre des mesures de sécurité pour protéger vos informations personnelles contre tout accès non autorisé.
            </p>
        </div>
    );
};

export default Politique;
