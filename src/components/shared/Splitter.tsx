import { useCallback, useRef, useEffect } from "react";

interface Props {
  onResize: (deltaX: number) => void;
}

export default function Splitter({ onResize }: Props) {
  const dragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      startX.current = e.clientX;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = e.clientX - startX.current;
      if (delta !== 0) {
        startX.current = e.clientX;
        onResize(delta);
      }
    };

    const handleMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onResize]);

  return (
    <div
      className="relative shrink-0 w-0 group"
      style={{ cursor: "col-resize" }}
    >
      {/* Hit zone */}
      <div
        className="absolute inset-y-0 -left-[6px] w-[12px] z-10"
        onMouseDown={handleMouseDown}
      />
      {/* Visible line */}
      <div className="absolute inset-y-0 left-0 w-px bg-gray-200 group-hover:bg-blue-300 transition-colors" />
      {/* Pill handle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[32px] rounded-full bg-blue-100/80 border border-blue-200/60 group-hover:bg-blue-200 group-hover:border-blue-300 transition-colors z-20 pointer-events-none" />
    </div>
  );
}
