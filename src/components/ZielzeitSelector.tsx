import React from "react";
import { Zielzeit } from "@/data/trainingsPlans";

interface ZielzeitSelectorProps {
  zielzeit: Zielzeit | "";
  onSelect: (value: Zielzeit) => void;
}

const zielzeitOptions: { value: Zielzeit; label: string }[] = [
  { value: "2:30 h", label: "2:30 h – dein erster Halbmarathon" },
  { value: "2:20 h", label: "2:20 h – locker durchlaufen, Hauptsache ankommen" },
  { value: "2:10 h", label: "2:10 h – regelmäßig am Start, heute mit Plan" },
  { value: "2:00 h", label: "2:00 h – gut vorbereitet, Ziel im Blick" },
  { value: "1:50 h", label: "1:50 h – ambitioniert, mit Fokus" },
  { value: "1:40 h", label: "1:40 h – Profi – du lebst für die PB" },
];

const ZielzeitSelector: React.FC<ZielzeitSelectorProps> = ({ zielzeit, onSelect }) => {
  return (
    <div className="d-flex flex-column gap-3 mt-3">
      {zielzeitOptions.map(({ value, label }) => (
        <button
          key={value}
          className={`btn btn-info btn-lg text-start zielzeit-button ${zielzeit === value ? "btn-success" : "btn-outline-info"}`}
          onClick={() => onSelect(value)}
        >
           <span>{label}</span>
           {zielzeit === value && <span className="ms-2">✔</span>}
        </button>
      ))}
    </div>
  );
};

export default ZielzeitSelector;
