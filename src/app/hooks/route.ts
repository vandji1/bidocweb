import puppeteer from 'puppeteer-core';
import { NextRequest, NextResponse } from "next/server";
 
export async function POST(req: NextRequest) {
    let browser;
    const body = await req.json();

    try {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(60000);

        const htmlContent = `<div className="w-[210mm] h-[297mm] mx-auto p-8 bg-white text-black shadow-lg overflow-hidden  leading-tight print:shadow-none">
      <div className="flex flex-col h-full "> 
 

        {/* Certifications */} 
          <section className="mb-3">
            <h2 className="text-lg font-bold border-b border-gray-300 mb-1 uppercase">
              Certifications
            </h2>
            <ul className="mb-2 list-disc pl-3"> 
                <li>
                  <a
                    className="font-semibold text-blue-600 hover:underline"
                    href='https://xmsxs.com'
                  >
                    Vandji nume 
                  </a>{" "}
                  by{" "}
                  <span className="capitalize">
                    dkjfkd kfjhdk
                  </span>
                </li> 
            </ul>
          </section> 
      </div>
    </div>`;
        await page.setContent(htmlContent, {
            waitUntil: ["load", "domcontentloaded", "networkidle0"],
            timeout: 60000,
        });

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                right: "10px",
                left: "10px",
            },
        });
        await browser.close();

        const response = new NextResponse(pdf);
        response.headers.set("Content-Type", "application/pdf");
        response.headers.set(
            "Content-Disposition",
            "attachment; filename=resume.pdf"
        );

        return response;
    } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json(
            { error: "Failed to generate PDF" },
            { status: 500 }
        );
    }
}
