import styles from './home.module.css';
import Main_Layout from '../components/Main_Layout';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import DropdownMenu from '@/components/DropdownMenu';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { generateTrainingsplan } from '@/utils/generateTrainingsplan';
import { Zielzeit } from '@/data/trainingsPlans';
import { Progress } from '@/types/progress';

export default function HomePage() {
    const router = useRouter();
    const [zielzeit, setZielzeit] = useState<Zielzeit | ''>('');
   
    const handleSubmit = () => {
        if (zielzeit) {
            const newPlan = generateTrainingsplan(zielzeit);
            const oldProgress: Progress = JSON.parse(localStorage.getItem('completedTrainings') || '{}');
            const completedWeeks = Math.max(...Object.keys(oldProgress).map(Number)); // Get the highest completed week

            // Calculate remaining weeks based on completed weeks
            const remainingWeeks = newPlan.plan.slice(completedWeeks);

            // Merge old progress with the new plan
            const mergedProgress = remainingWeeks.reduce((acc, week) => {
                const weekKey = week.woche;
                acc[weekKey] = oldProgress[weekKey] || '';
                return acc;
            }, {} as Progress);

            // Save the merged progress back to local storage
            localStorage.setItem('completedTrainings', JSON.stringify(mergedProgress));

            router.push({
                pathname: '/dein-plan',
                query: { trainingsplan: JSON.stringify(newPlan) },
            });
        } else {
            alert("Bitte wähle eine Zielzeit aus.");
        }
    };

    const handleSelectZielzeit = (value: string) => {
        if (value === '' || ['2:30 h', '2:10 h', '2:00 h', '1:50 h', '1:40 h', '1:30 h'].includes(value)) {
            setZielzeit(value as Zielzeit); // Type assertion to Zielzeit
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
          {/* <br />
          <br />
          <p>Wie viele Wochen hast du Zeit?</p>
          <DropdownMenu
                title="Wochen"
                options={['4', '5', '6', '7', '8', '9', '10', '11', '12']}
                onSelect={(value) => setWochen(parseInt(value))}
            /> */}
          <br />
          <br />
          <p>In welcher Zeit willst du ans Ziel kommen?</p>
          <DropdownMenu
                title="Zielzeit"
                options={['2:30 h', '2:10 h', '2:00 h', '1:50 h', '1:40 h', '1:30 h']}
                onSelect={handleSelectZielzeit}
            />
          <br />
          <br />
          {/* <p>Wie oft pro Woche kannst du trainieren?</p>
          <DropdownMenu
                title="Einheiten pro Woche"
                options={['2', '3', '4', '5', '6']}
                onSelect={(value) => setEinheiten(parseInt(value))}
            />
          <br />
          <br /> */}
          <input className="btn btn-primary" type="button" value="Plan erstellen" onClick={handleSubmit} />
        </div>
        <Navbar />
      </Main_Layout>
    );
  }
