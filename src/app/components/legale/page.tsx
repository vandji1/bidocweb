import Link from 'next/link';
import React from 'react';

export default function Legale() {
    return (
        <div className="text-center text-neutral">
            <h1 className="font-black mb-4 text-2xl">Informations Légales</h1>
            <div className="flex flex-col gap-2">
                <Link href="components/legale/politiques">
                    <div>Politique de Confidentialité</div>
                </Link>
                <Link href="components/legale/regles">
                <div>Règles d&#39;Utilisation</div> 
                </Link>
                <Link href="components/legale/apropos">
                    <div>À Propos</div>
                </Link>
            </div>
        </div>
    );
}
