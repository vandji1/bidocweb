import { useDownloadPdf } from "@/app/hooks/use-download-pdf";
import {
  Download,
  ListRestart,
  LoaderCircle,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";

const ResumeToolKit = ({
  toolTip,
}: {
  toolTip: ReactZoomPanPinchContentRef;
}) => {
  const { handleDownload, isLoading } = useDownloadPdf();

  return (
    <div className="flex mb-2 absolute top-10 left-[50%] -translate-x-[50%] backdrop-blur-lg rounded z-10 bg-primary border border-primary/20">
      <button
        className="hover:bg-white py-2.5 px-3.5 border-l border-primary/20"
        onClick={() => toolTip.zoomIn(0.1)}
      >
        <ZoomInIcon className="w-10 h-10 text-neutral"/>
      </button>
      <button
        className="hover:bg-white py-2.5 px-3.5 border-l border-primary/20"
        onClick={() => toolTip.zoomOut(0.1)}
      >
        <ZoomOutIcon className="w-10 h-10  text-neutral "/>
      </button>
      <button
        className="hover:bg-white py-2.5 px-3.5 border-l border-primary/20"
        onClick={() => toolTip.resetTransform()}
      >
        <ListRestart className="w-10 h-10  text-neutral "/>
      </button>
      <button
        className="hover:bg-white py-2.5 px-3.5 border-l border-primary/10"
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoaderCircle className="animate-spin w-10 h-10 text-neutral/20" />
        ) : (
          <Download className="w-10 h-10  text-neutral "/>
        )}
      </button>
    </div>
  );
};

export default ResumeToolKit;
