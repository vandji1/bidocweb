'use client'

import { useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ResumeToolKit from "./resume-tool-kit";
import { ResumeComponent } from "./design";

const Model1 = () => {
  const resumeRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: MouseEvent) => {
    setPosition({
      x: position.x + e.movementX,
      y: position.y + e.movementY,
    });
  };

  return (
    <div className="p-4 relative w-full">
      <TransformWrapper
        ref={resumeRef}
        maxScale={2}
        centerOnInit={true}
        minScale={0.2}
        initialScale={0.4}
        limitToBounds={true}
        smooth={true}
      >
        {(toolTip) => (
          <>
            <ResumeToolKit toolTip={toolTip} />
            <TransformComponent
              wrapperStyle={{
                width: "100%",
                maxHeight: "100vh",
              }}
            >
              <div
                ref={resumeRef}
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  transformOrigin: "top left",
                  transform: `translate(${position.x}px, ${position.y}px)`,
                }}
                onMouseDown={() => {
                  // Add event listeners for drag
                  document.addEventListener("mousemove", handleDrag);
                  document.addEventListener("mouseup", () => {
                    document.removeEventListener("mousemove", handleDrag);
                  });
                }}
              >
                <ResumeComponent />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Model1;
