import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: Request) {
  try {
    // Parse the request body and extract the 'id'
    const { id } = await req.json(); // Adjusted to destructure directly

    // Launch a Puppeteer browser instance without a graphical interface
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load the HTML content with Tailwind CSS styles
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

    // Generate the PDF
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    // Send the PDF as a response
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