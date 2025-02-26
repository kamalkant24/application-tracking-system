import { useState, useRef, useEffect } from "react";
import star from "../assets/img/icons/star.png"

const Accordion = ({ title, children, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border-b-[2px] border-transparent rounded-xl overflow-hidden w-full" style={{
      borderImageSource: "linear-gradient(90deg, #3169D0 0%, rgba(49, 105, 208, 0.730162) 30.14%, rgba(49, 105, 208, 0) 100%)",
      borderImageSlice: 1,
    }}>
      {/* Accordion Header */}
      <button
        className="w-full flex justify-between items-center py-3"
        onClick={onToggle}
      >
        <span className="font-normal text-primary text-xl">{title}</span>
        <span className={`w-5 h-5 transition-transform ${isOpen ? "rotate-45" : ""}`} >
          <img src={star} alt="star"/>
        </span>
      </button>

      {/* Accordion Content with Smooth Transition */}
      <div
        ref={contentRef}
        style={{ height: `${height}px`, transition: "height 0.3s ease-in-out" }}
        className="overflow-hidden"
      >
        <div className="pb-4 text-lg font-light">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
