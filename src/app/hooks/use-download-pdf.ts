import { useState } from "react";  

export const useDownloadPdf = () => {
  const [isLoading, setIsLoading] = useState(false); 

  const apiUrl = 'https://wintrans.oumistore.com/bidoc/pdf.php'; // Chemin absolu vers votre API

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      // Retrieve data from LocalStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const loisirs = JSON.parse(localStorage.getItem('loisirs') || '[]');
      const languages = JSON.parse(localStorage.getItem('languages') || '[]');
      const formations = JSON.parse(localStorage.getItem('formations') || '[]');
      const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
      const diplomes = JSON.parse(localStorage.getItem('diplomes') || '[]');

      // Prepare the data to send to the API
      const dataToSend = {
        userData,
        loisirs,
        languages,
        formations,
        experiences,
        diplomes,
        id : '1'
      };

      // Send the data via POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(dataToSend),  // Send the local storage data as the request body
      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary <a> element and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDownload, isLoading };
};
