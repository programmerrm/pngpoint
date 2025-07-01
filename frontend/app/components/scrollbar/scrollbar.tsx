import { useEffect, useState } from "react";
import { ReactIcons } from "~/utils/reactIcons";

export default function Scrollbar() {
    const { GoArrowDown } = ReactIcons; // Changed to "up" icon
    const [isVisible, setIsVisible] = useState(false);

    // Check scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed right-4 bottom-4 w-[55px] h-[55px] rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer z-[9999] shadow-md transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
            }`}
        >
            <GoArrowDown className="text-2xl" />
        </button>
    );
}
