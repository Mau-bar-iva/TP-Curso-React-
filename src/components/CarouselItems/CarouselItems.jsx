import { useEffect, useRef, useState } from "react";
import "./CarouselItems.css";
import ChevronRightIcon from "../../assets/chevronRight.svg"
import ChevronLeftIcon from "../../assets/chevronLeft.svg"

export default function CarouselItems({ children }) {
    const carouselRef = useRef(null);

    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const updateArrows = () => {
        const el = carouselRef.current;
        if (!el) return;

        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    const scroll = (direction) => {
        const el = carouselRef.current;
        if (!el) return;

        const scrollAmount = 300;
        el.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    };

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        updateArrows();

        const resizeObserver = new ResizeObserver(() => {
            updateArrows();
        });

        resizeObserver.observe(el);

        el.addEventListener("scroll", updateArrows);

        return () => {
            resizeObserver.disconnect();
            el.removeEventListener("scroll", updateArrows);
        };
    }, [children]);

    return (
        <div className="carousel-wrapper">
            {showLeft && (
                <button className="nav-arrow left" onClick={() => scroll("left")}>
                    <img src={ChevronLeftIcon} alt="" />
                </button>
            )}

            <div className="carousel" ref={carouselRef}>
                {children}
            </div>

            {showRight && (
                <button className="nav-arrow right" onClick={() => scroll("right")}>
                    <img src={ChevronRightIcon} alt="" />
                </button>
            )}
        </div>
    );
}
