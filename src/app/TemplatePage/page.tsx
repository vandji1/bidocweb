
import Image from "next/image";
import Link from "next/link";
import model1 from '@/assets/img/modelCV/model1.png';
import model2 from '@/assets/img/modelCV/model2.png';
import model3 from '@/assets/img/modelCV/model3.png';
import model4 from '@/assets/img/modelCV/model4.png';

export default function TemplatePage() {
    return (
        <div className="mb-40">
            <h1 className="p-4 font-bold text-2xl text-start md:pt-10 text-neutral ">Modèles de CV disponibles avec des couleurs personnalisables</h1>
            <div className="grid grid-cols-2 gap-4 m-4 md:grid-cols-4 md:px-20 ">
                <Link href="components/preview" className="w-full h-92 overflow-hidden rounded-2xl shadow-xl">
                    <Image src={model1} priority alt="Modèle 1 de CV" className="w-full h-full object-cover" />
                </Link>
                <Link href="model2" className="w-full h-92 overflow-hidden rounded-2xl shadow-xl">
                    <Image src={model2} priority alt="Modèle 2 de CV" className="w-full h-full object-cover" />
                </Link>
                <Link href="model3" className="w-full h-92 overflow-hidden rounded-2xl shadow-xl">
                    <Image src={model3} priority alt="Modèle 3 de CV" className="w-full h-full object-cover" />
                </Link>
                <Link href="model4" className="w-full h-92 overflow-hidden rounded-2xl shadow-xl">
                    <Image src={model4} priority alt="Modèle 4 de CV" className="w-full h-full object-cover" />
                </Link>
            </div>
        </div>
    );
}
