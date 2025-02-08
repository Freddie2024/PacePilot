import { useRouter } from 'next/router';

interface Training {
    [key: string]: string;
}

export default function DeinPlan() {
    const router = useRouter();
    const { trainingsplan } = router.query;

    const parsedPlan = trainingsplan ? JSON.parse(trainingsplan as string) : null;

    return (
        <div>
            <h1>Dein Trainingsplan</h1>
            {parsedPlan ? (
                <div>
                    <h2>Zielzeit: {parsedPlan.zielzeit}</h2>
                    <ul>
                        {parsedPlan.plan.map((einheit: any, index: number) => (
                            <li key={index}>
                                Woche {einheit.woche}:
                                <ul>
                                    {Object.entries(einheit.training).map(([day, training]) => (
                                        <li key={day}>
                                            {day}: {training as string}
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
