export const ResumeComponent = () => {
  return ( 
    <div className="w-[210mm] h-[297mm] mx-auto p-8 bg-white text-black shadow-lg overflow-hidden  leading-tight print:shadow-none">
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
                    Vandji
                  </a>{" "}
                  by{" "}
                  <span className="capitalize">
                    dkjfkd kfjhdk
                  </span>
                </li> 
            </ul>
          </section> 
      </div>
    </div>
  );
};

export const renderToString = async () => {
  if (typeof window === "undefined") {
    // Server-side rendering
    const ReactDOMServer = (await import("react-dom/server")).default;
    return ReactDOMServer.renderToString(<ResumeComponent />);
  } else {
    // Client-side rendering
    const root = document.createElement("div");
    const ReactDOM = (await import("react-dom/client")).default;
    const { renderToString } = await import("react-dom/server");
    ReactDOM.createRoot(root).render(<ResumeComponent />);
    console.log("server");

    return renderToString(<ResumeComponent />);
  }
};
