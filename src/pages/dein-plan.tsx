import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface Training {
    [key: string]: string;
}

interface Einheit {
    woche: number;
    training: Training;
}

export default function DeinPlan() {
    const router = useRouter();
    const { trainingsplan } = router.query;

    const parsedPlan = trainingsplan ? JSON.parse(trainingsplan as string) : null;

    const [completedTrainings, setCompletedTrainings] = useState<{ [key: string]: string }>({});
    const [completedWeeks, setCompletedWeeks] = useState<number>(0);

    useEffect(() => {
        const savedProgress = localStorage.getItem('completedTrainings');
        if (savedProgress) {
            setCompletedTrainings(JSON.parse(savedProgress));
        }
    }, []);

    const handleCheckboxChange = (day: string, woche: number) => {
        setCompletedTrainings((prev) => ({
            ...prev,
            [`${woche}-${day}`]: prev[`${woche}-${day}`] ? '' : 'completed',
        }));
    };

    const handleRatingChange = (day: string, woche: number, rating: string) => {
        setCompletedTrainings((prevTrainings) => {
            const updatedTrainings = {
                ...prevTrainings,
                [`${woche}-${day}`]: rating,
            };

            // Überprüfen, ob alle Trainings der Woche bewertet wurden
            const allTrainings = Object.keys(parsedPlan.plan[woche - 1].training); // Trainings für die aktuelle Woche
            const ratedCount = allTrainings.filter((trainingDay) => {
                return (updatedTrainings[`${woche}-${trainingDay}`] !== ''); // Check if the training has been rated
            }).length;

            // Update completed weeks based on ratedCount
            if (ratedCount === allTrainings.length) {
                setCompletedWeeks((prevWeeks) => Math.max(prevWeeks, woche)); // Zähle die Woche nur, wenn alle Trainings bewertet wurden
            } else {
                // Optional: Wenn nicht alle bewertet sind, die Woche nicht zählen
                setCompletedWeeks((prevWeeks) => Math.min(prevWeeks, woche - 1)); // Reduziere die Anzahl der erledigten Wochen, falls nötig
            }

            return updatedTrainings; // Return the updated trainings state
        });
    };

    const totalWeeks = parsedPlan ? parsedPlan.plan.length : 0;

    return (
        <div>
            <h1>Dein Trainingsplan</h1>
            <p>
                {completedWeeks} von {totalWeeks} geschafft, noch {totalWeeks - completedWeeks} weitere bis zum Halbmarathon.
            </p>
            {parsedPlan ? (
                <div>
                    <h2>Zielzeit: {parsedPlan.zielzeit}</h2>                    
                    <button onClick={() => router.push('/settings')}>Zielzeit ändern</button>

                    <ul>
                        {parsedPlan.plan.map((einheit: Einheit, index: number) => (
                            <li key={index}>
                                Woche {einheit.woche}:
                                <ul>
                                    {Object.entries(einheit.training).map(([day, training]) => (
                                        <li key={day}>
                                            <input
                                                type="checkbox"
                                                checked={!!completedTrainings[`${einheit.woche}-${day}`]}
                                                onChange={() => handleCheckboxChange(day, einheit.woche)}
                                            />
                                            {day}: {training}
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
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Kein Trainingsplan verfügbar.</p>
            )}
        </div>
    );
}
