import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import WeekCard from '@/components/WeekCard';

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
        <div className="container mt-4">
            <h1>Dein Trainingsplan</h1>
            <h2>Zielzeit: {parsedPlan.zielzeit}</h2>                    
            <button className="btn btn-primary ms-2" onClick={() => router.push('/settings')}>Zielzeit ändern</button>
         
            <div className="mb-3">
                <div className="row">
                    {Array.from({ length: totalWeeks }, (_, index) => (
                        <div className="col-4 mb-2" key={index}>
                            <span
                                className={`badge ms-2 me-2 ${index < completedWeeks ? 'bg-success' : 'bg-secondary'}`}
                            >
                                Woche {index + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="row">
                {parsedPlan ? (
                    parsedPlan.plan.map((einheit: Einheit, index: number) => (
                        <WeekCard
                            key={index}
                            einheit={einheit}
                            completedTrainings={completedTrainings}
                            handleCheckboxChange={handleCheckboxChange}
                            handleRatingChange={handleRatingChange}
                        />
                    ))
                ) : (
                    <p>Kein Trainingsplan verfügbar.</p>
                )}
            </div>
        </div>
    );
}
