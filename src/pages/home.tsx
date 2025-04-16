import styles from './home.module.css';
import Main_Layout from '../components/Main_Layout';
import Header from '@/components/Header';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { generateTrainingsplan } from '@/utils/generateTrainingsplan';
import { Zielzeit } from '@/data/trainingsPlans';
import ZielzeitSelector from '@/components/ZielzeitSelector';


export default function HomePage() {
    const router = useRouter();
    const [zielzeit, setZielzeit] = useState<Zielzeit | ''>('');
   
    const handleSubmit = () => {
        if (!zielzeit) {
            alert("Bitte wähle eine Zielzeit aus.");
            return;
        }
            const newPlan = generateTrainingsplan(zielzeit);
           
            router.push({
                pathname: '/dein-plan',
                query: { trainingsplan: JSON.stringify(newPlan) },
            });
    };

    const handleZielzeitSelect = (value: Zielzeit) => {
      setZielzeit(value);
    };
    

    return (
      <Main_Layout>
        <Header />
        <div className={styles['bg-image']}>
        <div className="ms-4 d-flex flex-column align-items-start" style={{ gap: '1rem' }}> {/* Flexbox Container */}
           
          <br />
          <p className="button bg-light text-dark border border-primary d-inline-block p-2 rounded"
          >
            In welcher Zeit willst du ans Ziel kommen?
          </p>
          <br />

          <ZielzeitSelector zielzeit={zielzeit} onSelect={handleZielzeitSelect} />

          <br />
          <br />
          <br />
         
          <input className="btn btn-primary" type="button" value="Plan erstellen" onClick={handleSubmit} />
        </div>
        </div>

      </Main_Layout>
    );
  }
