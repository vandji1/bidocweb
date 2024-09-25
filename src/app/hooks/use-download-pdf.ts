import { useState } from "react";  

export const useDownloadPdf = () => {
  const [isLoading, setIsLoading] = useState(false); 

  const apiUrl = '/api'; // Chemin absolu vers votre API
 

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ id: "10" }]), // Ajout du corps de la requête

      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Créer un élément <a> temporaire et déclencher le téléchargement
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
