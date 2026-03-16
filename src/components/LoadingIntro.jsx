import { useEffect } from "react";
import sandyLoading from "../assets/loading.gif";

export default function LoadingIntro({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone(); // tell App that loading is finished
    }, 1000);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg)] z-[9999]">
      <img
        src={sandyLoading}
        alt="Loading..."
        className="w-40 h-40 object-contain"
      />
    </div>
  );
}