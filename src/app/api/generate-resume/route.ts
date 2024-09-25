// src/app/api/generate-resume/route.ts
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body[0];

    // Lance un navigateur Puppeteer sans interface graphique
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Charge le contenu HTML avec les styles de Tailwind
    const content = `
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { font-family: Arial, sans-serif; }
        </style>
      </head>
      <body class="p-6 bg-white">
        <h1 class="text-3xl font-bold text-blue-600">CV pour l'ID ${id}</h1>
        <p class="mt-4 text-gray-800">Ceci est un CV généré à partir d'une page HTML.</p>
      </body>
      </html>
    `;
    
    await page.setContent(content);

    // Génère le PDF
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    // Envoie le PDF en réponse
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume.pdf',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
