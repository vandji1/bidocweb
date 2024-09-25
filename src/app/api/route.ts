import { NextResponse } from 'next/server';
import chromium from 'chrome-aws-lambda';

export async function POST() {
  let browser = null;

  try {
    // Configuration pour chrome-aws-lambda
    const options = {
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    };

    // Lancer le navigateur
    browser = await chromium.puppeteer.launch(options);
    const page = await browser.newPage();

    // Contenu HTML pour le PDF
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

    // Injection du contenu HTML dans la page
    await page.setContent(content);

    // Génération du PDF
    const pdfBuffer = await page.pdf({ format: 'a4' });

    // Retourner le PDF
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
      await browser.close(); // Fermer le navigateur si ouvert
    }
  }
}
