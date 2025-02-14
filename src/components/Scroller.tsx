import React, { useState, useEffect, useRef } from "react";
import styles from './Scroller.module.css';

interface ZielzeitScrollerProps {
  options: string[];
  onSelect: (value: string) => void;
}

const ZielzeitScroller: React.FC<ZielzeitScrollerProps> = ({ options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<string>(options[0]);
  const scrollerRef = useRef<HTMLDivElement>(null); // Use ref to access the scroller element

  const handleScroll = (e: React.WheelEvent) => {
    // Prevent the default scroll behavior
    e.preventDefault();
    const delta = e.deltaY;

    // Calculate the new index based on scroll direction
    let currentIndex = options.indexOf(selectedValue);
    currentIndex = (currentIndex + (delta > 0 ? 1 : -1) + options.length) % options.length;

    const newValue = options[currentIndex];
    setSelectedValue(newValue);
    onSelect(newValue); // Call the onSelect callback to update the state
  };

  useEffect(() => {
    // Manually add the event listener to the ref element with passive: false
    const scrollerElement = scrollerRef.current;
    if (scrollerElement) {
      scrollerElement.addEventListener("wheel", handleScroll, { passive: false });
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (scrollerElement) {
        scrollerElement.removeEventListener("wheel", handleScroll);
      }
    };
  }, [selectedValue]);

  return (
    <div className={styles["scroller-container"]} ref={scrollerRef}>
      <div className={styles["scroller"]}>
        {options.map((option, index) => (
          <div
            key={index}
            className={`${styles["scroller-option"]} ${option === selectedValue ? styles.selected : ""}`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZielzeitScroller;
