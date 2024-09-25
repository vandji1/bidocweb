import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';
export async function POST() { 

  try {
    const browser = await puppeteer.launch({
      args: [...chrome.args, '--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });

    const page = await browser.newPage();
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

    await page.setContent(content);
    const pdfBuffer = await page.pdf({ format: 'a4' });
    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume.pdf`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
