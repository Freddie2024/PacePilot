import React from 'react';

interface Training {
    [key: string]: string;
}

interface Einheit {
    woche: number;
    training: Training;
}

interface WeekCardProps {
    einheit: Einheit;
    completedTrainings: { [key: string]: string };
    handleFeedback: (_day: string, _woche: number, _rating: string) => void;
    backgroundColor: string; 
}

const WeekCard: React.FC<WeekCardProps> = ({ einheit, completedTrainings, handleFeedback, backgroundColor }) => {
    return (
            <div className="col-md-4 mb-4">
                <div style={{ backgroundColor }} className="card fixed-card shadow">
                    <div className="card-body">
                        <h5 className="card-title">Woche {einheit.woche}</h5>
                        <ul className="list-group list-group-flush">
                            {Object.entries(einheit.training).map(([day, training]) => (
                               <li className="list-group-item" key={day}>
                               <strong>{day}: </strong>  
                               {training.split("\n").map((line, index) => (
                                   <React.Fragment key={index}>
                                       {line}
                                       <br />
                                   </React.Fragment>
                               ))}
                                 <div className="d-flex flex-column align-items-center" style={{ gap: "4px" }}>
                                <div className="d-flex justify-content-between w-100">
                                    {[
                                        { value: "1", emoji: "😂", label: "zu leicht" },
                                        { value: "2", emoji: "😃", label: "easy" },
                                        { value: "3", emoji: "🙂", label: "genau richtig" },
                                        { value: "4", emoji: "😅", label: "anstrengend" },
                                        { value: "5", emoji: "😰", label: "sehr schwer" },
                                        { value: "missed", emoji: "❌", label: "ausgefallen" },
                                    ].map(({ value, emoji, label }) => (
                                        <label key={value} className="d-flex flex-column align-items-center">
                                            <input
                                                type="radio"
                                                name={`feedback-${einheit.woche}-${day}`}
                                                value={value}
                                                checked={completedTrainings[`${einheit.woche}-${day}`] === value}
                                                onChange={() => handleFeedback(day, einheit.woche, value)}
                                                style={{ display: "none" }}
                                            />
                                            <span
                                                style={{
                                                    fontSize: "1.2rem",
                                                    cursor: "pointer",
                                                    opacity: completedTrainings[`${einheit.woche}-${day}`] === value ? 1 : 0.5,
                                                }}
                                            >
                                                {emoji}
                                            </span>
                                            <span style={{ display: 'none' }}>{label}</span>
                                        </label>
                                    ))}
                                    </div>
                                </div>

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
    );
};

export default WeekCard; 