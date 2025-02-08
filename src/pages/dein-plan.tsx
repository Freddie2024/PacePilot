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

        if (!completedTrainings[`${woche}-${day}`]) {
            setCompletedWeeks((prev) => Math.max(prev, woche));
        }
    };

    const handleRatingChange = (day: string, woche: number, rating: string) => {
        setCompletedTrainings((prev) => ({
            ...prev,
            [`${woche}-${day}`]: rating,
        }));
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
                                                <option value="">Bewertung</option>
                                                <option value="easy">War total easy</option>
                                                <option value="just-right">Genau richtig</option>
                                                <option value="hard">War zu anstrengend</option>
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
