import React, { useEffect, useRef, useState } from "react";
import ITaskSortProps from "./interface";
import styles from "./index.module.scss";
import { SortedByType } from "types/SortedByType";

const data: { id: SortedByType; title: string }[] = [
  { id: null, title: "-" },
  { id: "new", title: "date (new ones first)" },
  { id: "old", title: "date (old ones first)" },
  { id: "low", title: "priority (low first)" },
  { id: "high", title: "priority (high first)" }
];

const TaskSort: React.FC<ITaskSortProps> = ({ sortTasks, sortedBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const sortRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortTasks = (by: SortedByType) => {
    sortTasks(by);
    setIsOpen(false);
  };

  const handleSetCurrentTitle = () => {
    const newObg = data.find((value) => value.id === sortedBy);
    setCurrentTitle(newObg?.title || "");
  };

  const closeMenu = (event: MouseEvent) => {
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    handleSetCurrentTitle();
  }, [sortedBy]);

  useEffect(() => {
    handleSetCurrentTitle();
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={sortRef}>
      <div className={styles.main}>
        <p className={styles.title}>Sort by:</p>
        <button
          className={styles.openBtn}
          onClick={toggleDropdown}
          data-testid="sortOpenBtn"
        >
          {currentTitle}
        </button>
      </div>
      <div
        className={`${styles.menu} ${isOpen ? styles.slideDown : ""}`}
        data-testid="sortMenu"
      >
        {data.map((value) => (
          <button
            onClick={() => handleSortTasks(value.id)}
            className={`${styles.sortbtn} ${
              sortedBy === value.id ? styles.sortbtn__isActive : ""
            }`}
            key={value.id}
          >
            {value.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskSort;
