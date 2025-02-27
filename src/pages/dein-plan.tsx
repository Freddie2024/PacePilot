import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import WeekCard from '@/components/WeekCard';
import styles from './dein-plan.module.css';
import WeatherWithGeolocation from '@/components/WeatherWithGeolocation';

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
    const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);

    useEffect(() => {
        const savedProgress = localStorage.getItem('completedTrainings');
        if (savedProgress) {
            const parsedProgress = JSON.parse(savedProgress);
            console.log("Laden von localStorage:", parsedProgress);
            setCompletedTrainings(parsedProgress);  // Fortschritt im State setzen
        } else {
            console.log("Kein gespeicherter Fortschritt gefunden.");
        }
    }, []);
    
    const handleFeedback = (day: string, woche: number, rating: string) => {
        setCompletedTrainings((prevTrainings) => {
            const updatedTrainings = {
                ...prevTrainings,
                [`${woche}-${day}`]: rating, 
            };
    
            localStorage.setItem("completedTrainings", JSON.stringify(updatedTrainings));
            console.log("✅ Feedback gespeichert:", updatedTrainings);
    
            const completedWeeksList = Array.from({ length: totalWeeks }, (_, weekIndex) => {
                const week = weekIndex + 1;
                const allTrainings = Object.keys(parsedPlan.plan[weekIndex].training);
                return allTrainings.every((trainingDay) => {
                    const key = `${week}-${trainingDay}`;
                    return updatedTrainings[key] && updatedTrainings[key] !== '';
                }) ? week : null;
            }).filter(Boolean) as number[]; // Filtert `null`-Werte raus
    
            console.log("✅ Neue abgeschlossene Wochen:", completedWeeksList);
            setCompletedWeeks(completedWeeksList);
    
            return updatedTrainings;
        });
    };
    
        const handleNeuerPlan = () => {
        const userConfirmed = window.confirm(
            "Bist du sicher, dass du einen neuen Plan starten möchtest? Dies wird alle gespeicherten Daten unwiderruflich löschen!"
        );
    
        if (userConfirmed) {
            localStorage.removeItem("completedTrainings");
    
            setCompletedTrainings({});
            setCompletedWeeks([]);
    
            console.log("✅ Fortschritt wurde gelöscht, neuer Plan kann gestartet werden!");
    
            router.push("/home");
        } else {
            console.log("❌ Planwechsel abgebrochen.");
        }
    };
    

    const totalWeeks = parsedPlan ? parsedPlan.plan.length : 0;

    const colors = ['#f8d7da', '#d4edda', '#d1ecf1', '#fff3cd', '#cce5ff'];

    return (
        <>
        <div className={`${styles['bg-image']}`}></div>
        <div className={`container pt-3 px-3 ${styles.parentContainer}`}>
            <div className="border border-primary sticky-top bg-light mb-4 rounded" 
            style={{ zIndex: 1020, top: 10 }}>
                <h1 className="px-3 pt-2 fs-5"
                >
                    Dein Trainingsplan
                </h1>
                <h2 className="d-flex align-items-stretch gap-2 px-3">
                    <span className="badge bg-info text-dark d-flex align-items-center justify-content-center px-4 shadow-sm" 
                    style={{ height: '2rem', fontSize: '0.9rem'}}
                    >
                        Zielzeit: {parsedPlan ? parsedPlan.zielzeit : "Nicht gesetzt"}
                    </span>
                    <button 
                        className="btn btn-primary d-flex align-items-center justify-content-center px-4 shadow-sm" 
                        style={{ height: '2rem', fontSize: '0.9rem' }}
                        onClick={handleNeuerPlan}
                    >
                        Neuer Plan
                    </button>
                </h2>
                <div className="mb-1">
                    <div className="d-none d-sm-flex justify-content-between px-3">
                        {Array.from({ length: totalWeeks }, (_, index) => (
                            <span
                            key={index}
                            className={`badge ${completedWeeks.includes(index + 1) ? 'bg-success' : 'bg-secondary'} flex-grow-1 mx-1 shadow-sm`}
                        >
                            Woche {index + 1}
                            </span>
                        ))}
                    </div>
                    <div className="row d-sm-none px-3">
                        {Array.from({ length: totalWeeks }, (_, index) => (
                            <div className="col-4 mb-2" key={index}>
                                <span
                                    key={index}
                                    className={`badge ${completedWeeks.includes(index + 1) ? 'bg-success' : 'bg-secondary'} flex-grow-1 mx-1 shadow-sm`}
                                >
                                    Woche {index + 1}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="min-h-screen flex items-center justify-center bg-gray-200">
                     <WeatherWithGeolocation />
                </div>
            </div>           

            <div className="row px-3">
                {parsedPlan ? (
                    parsedPlan.plan.map((einheit: Einheit, index: number) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4 mb-2">
                            <WeekCard
                                einheit={einheit}
                                completedTrainings={completedTrainings}
                                handleFeedback={handleFeedback}
                                backgroundColor={colors[index % colors.length]}
                            />
                        </div>
                    ))
                ) : (
                    <p>Kein Trainingsplan verfügbar.</p>
                )}
            </div>
        </div>
        </>
    );
}
