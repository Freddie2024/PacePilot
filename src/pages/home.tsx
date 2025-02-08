import styles from './home.module.css';
import Main_Layout from '../components/Main_Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/header';
import Navbar from '@/components/navbar';
import DropdownMenu from '@/components/DropdownMenu';

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
        <Header />
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
          <DropdownMenu
                title="Wochen"
                options={['4', '5', '6', '7', '8', '9', '10', '11', '12']}
                onSelect={(value) => setWochen(parseInt(value))}
            />
          <br />
          <br />
          <p>In welcher Zeit willst du ans Ziel kommen?</p>
          <DropdownMenu
                title="Zielzeit"
                options={['2:30 h', '2:10 h', '2:00 h', '1:50 h', '1:40 h', '1:30 h']}
                onSelect={setZielzeit}
            />
          <br />
          <br />
          <p>Wie oft pro Woche kannst du trainieren?</p>
          <DropdownMenu
                title="Einheiten pro Woche"
                options={['2', '3', '4', '5', '6']}
                onSelect={(value) => setEinheiten(parseInt(value))}
            />
          <br />
          <br />
          <input className="btn btn-primary" type="button" value="Plan erstellen" onClick={handleSubmit} />
        </div>
        <Navbar />
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
  