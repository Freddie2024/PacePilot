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
    handleCheckboxChange: (day: string, woche: number) => void;
    handleRatingChange: (day: string, woche: number, rating: string) => void;
    backgroundColor: string; 
}

const WeekCard: React.FC<WeekCardProps> = ({ einheit, completedTrainings, handleCheckboxChange, handleRatingChange, backgroundColor }) => {
    return (
            <div className="col-md-4 mb-4">
                <div style={{ backgroundColor }} className="card fixed-card">
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
                                    <select
                                        value={completedTrainings[`${einheit.woche}-${day}`] || ''}
                                        onChange={(e) => handleRatingChange(day, einheit.woche, e.target.value)}
                                    >
                                        <option value="">Feedback</option>
                                        <option value="easy">zu leicht</option>
                                        <option value="just-right">genau richtig</option>
                                        <option value="hard">zu anstrengend</option>
                                        <option value="missed">Training ausgefallen</option>
                                    </select>
                                    <input
                                        type="checkbox"
                                        checked={!!completedTrainings[`${einheit.woche}-${day}`]}
                                        onChange={() => handleCheckboxChange(day, einheit.woche)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
    );
};

export default WeekCard; 