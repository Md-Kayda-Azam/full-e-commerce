import { useEffect, useRef, useState } from "react";

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef(null);

  const handleOutSide = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutSide);

    return () => {
      document.removeEventListener("click", handleOutSide);
    };
  }, []);

  // toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggleMenu, dropDownRef };
};

export default useToggle;
