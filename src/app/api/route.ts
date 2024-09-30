import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST() {
  let browser = null;

  try {
    // Lancement du navigateur Puppeteer
    browser = await puppeteer.launch({
      args: ['--hide-scrollbars', '--disable-web-security'],
      headless: true,
    });

    const page = await browser.newPage();

    // Contenu HTML à inclure dans le PDF
    const content = `
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { font-family: Arial, sans-serif; }
        </style>
      </head>
      <body class="p-6 bg-white">
        <h1 class="text-3xl font-bold text-blue-600">CV pour l'ID</h1>
        <p class="mt-4 text-gray-800">Ceci est un CV généré à partir d'une page HTML.</p>
      </body>
      </html>
    `;

    // Définir le contenu de la page
    await page.setContent(content);

    // Génération du PDF à partir de la page
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Retourner le PDF en réponse
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume.pdf`,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du PDF :", error);
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close(); // Fermer le navigateur après utilisation
    }
  }
}
