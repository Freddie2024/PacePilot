import styles from './home.module.css';
import Main_Layout from '../components/Main_Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
    const router = useRouter();
    const [zielzeit, setZielzeit] = useState<string>('');
    const [wochen, setWochen] = useState<number | null>(null);
    const [einheiten, setEinheiten] = useState<number | null>(null);

    const handleSubmit = () => {
        if (wochen !== null && einheiten !== null && zielzeit) {
            const trainingsplan = generateTrainingsplan(zielzeit, wochen, einheiten);
            router.push({
                pathname: '/dein-plan',
                query: { trainingsplan: JSON.stringify(trainingsplan) },
            });
            } else {
            alert("Bitte wähle eine Zielzeit, die Anzahl der Wochen und die Einheiten pro Woche aus.");
        }
    };

    return (
      <Main_Layout>
        <div className={styles['bg-image']}>
        
          {/* <p>Wähle dein Trainingsziel:</p>
          <div className="btn-group dropend">
              <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Trainingsziel
              </button>
              <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">10km-Lauf</a></li>
                  <li><a className="dropdown-item" href="#">Halbmarathon</a></li>
              </ul>
          </div> */}
          <br />
          <br />
          <p>Wie viele Wochen hast du Zeit?</p>
          <div className="btn-group dropend">
              <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Wochen
              </button>
              <ul className="dropdown-menu">
              {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                        <li key={value}>
                            <a className="dropdown-item" onClick={() => setWochen(value)}>
                                {value}
                            </a>
                        </li>
                    ))}
              </ul>
          </div>
          <br />
          <br />
          <p>In welcher Zeit willst du ans Ziel kommen?</p>
          <div className="btn-group dropend">
              <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Zielzeit
              </button>
              <ul className="dropdown-menu">
              {['2:30 h', '2:10 h', '2:00 h', '1:50 h', '1:40 h', '1:30 h'].map((value) => (
                        <li key={value}>
                            <a className="dropdown-item" onClick={() => setZielzeit(value)}>
                                {value}
                            </a>
                        </li>
                    ))}
              </ul>
          </div>
          <br />
          <br />
          <p>Wie oft pro Woche kannst du trainieren?</p>
          <div className="btn-group dropend">
              <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Tage pro Woche
              </button>
              <ul className="dropdown-menu">
              {[2, 3, 4, 5, 6].map((value) => (
                        <li key={value}>
                            <a className="dropdown-item" onClick={() => setEinheiten(value)}>
                                {value}
                            </a>
                        </li>
                    ))}
              </ul>
          </div>
          <br />
          <br />
          <input className="btn btn-primary" type="button" value="Plan erstellen" onClick={handleSubmit} />
        </div>
      </Main_Layout>
    );
  }
  
const generateTrainingsplan = (zielzeit: string, wochen: number, einheiten: number) => {
    // Logik zur Generierung des Trainingsplans basierend auf zielzeit und wochen
    // Beispiel: Rückgabe eines einfachen Plans
    return {
        wochen: wochen,
        einheiten: einheiten,
        zielzeit: zielzeit,
        plan: [
            { woche: 1, trainingseinheit: 'Lauf 3x pro Woche' },
            { woche: 2, trainingseinheit: 'Lauf 4x pro Woche' },
            // Füge hier weitere Einheiten hinzu
        ],
    };
};
  