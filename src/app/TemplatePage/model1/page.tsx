'use client'
'use client'
'use client'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

// Créer un document PDF
const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Informations Personnelles</Text>
                <Text style={styles.text}>Nom: John Doe</Text>
                <Text style={styles.text}>Adresse: 1234 Main St, Anytown</Text>
                <Text style={styles.text}>Téléphone: +1 234 567 890</Text>
                <Text style={styles.text}>Email: johndoe@example.com</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Compétences</Text>
                <Text style={styles.text}>JavaScript</Text>
                <Text style={styles.text}>React, React Native</Text>
                <Text style={styles.text}>Node.js</Text>
                <Text style={styles.text}>HTML, CSS</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Expériences Professionnelles</Text>
                <Text style={styles.subHeader}>Développeur Full Stack chez TechCorp</Text>
                <Text style={styles.text}>Janvier 2020 - Présent</Text>
                <Text style={styles.text}>
                    Responsable du développement des applications web et mobiles en utilisant les technologies React et Node.js.
                </Text>
                <Text style={styles.subHeader}>Développeur Front-end chez WebStart</Text>
                <Text style={styles.text}>Juin 2018 - Décembre 2019</Text>
            </View>
        </Page>
    </Document>
);

// Composant principal avec Tailwind CSS pour rendre responsive
export default function model1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100 text-neutral">
            <h1 className="text-2xl font-bold mb-4 text-center">Générer un PDF avec React</h1>

            {/* Lien pour télécharger le PDF */}
            <PDFDownloadLink
                document={<MyDocument />}
                fileName="mon_cv.pdf" 
            >
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Télécharger le PDF
                </button>
            </PDFDownloadLink>

            {/* Visualiseur PDF pour prévisualiser le document dans le navigateur */}
            <div className="mt-8 w-full max-w-4xl mx-auto">
                <div className="h-[500px] w-full sm:w-[90%] md:w-[80%] lg:w-full">
                    <PDFViewer showToolbar={false} className="w-full h-full">
                        <MyDocument />
                    </PDFViewer>
                </div>
            </div>
        </div>
    );
};

// Créer des styles pour le PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 20,
    },
    section: {
        marginBottom: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 14,
        marginBottom: 6,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 12,
        marginBottom: 4,
    },
});