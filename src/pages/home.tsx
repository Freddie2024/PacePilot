import styles from './home.module.css';
import Main_Layout from '../components/Main_Layout';

export default function HomePage() {
    return (
      <Main_Layout>
        <div className={styles['bg-image']}>
        
          <p>Wähle dein Trainingsziel:</p>
          <div className="btn-group dropend">
              <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Trainingsziel
              </button>
              <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">10km-Lauf</a></li>
                  <li><a className="dropdown-item" href="#">Halbmarathon</a></li>
              </ul>
          </div>
          <br />
          <br />
          <p>Wie viele Wochen hast du Zeit?</p>
          <div className="btn-group dropend">
              <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Wochen
              </button>
              <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">4</a></li>
                  <li><a className="dropdown-item" href="#">5</a></li>
                  <li><a className="dropdown-item" href="#">6</a></li>
                  <li><a className="dropdown-item" href="#">7</a></li>
                  <li><a className="dropdown-item" href="#">8</a></li>
                  <li><a className="dropdown-item" href="#">9</a></li>
                  <li><a className="dropdown-item" href="#">10</a></li>
                  <li><a className="dropdown-item" href="#">11</a></li>
                  <li><a className="dropdown-item" href="#">12</a></li>
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
                  <li><a className="dropdown-item" href="#">Hauptsache ankommen / ca. 2:30 h</a></li>
                  <li><a className="dropdown-item" href="#">2:10 h</a></li>
                  <li><a className="dropdown-item" href="#">unter 2:00 h</a></li>
                  <li><a className="dropdown-item" href="#">unter 1:50 h</a></li>
                  <li><a className="dropdown-item" href="#">unter 1:40 h</a></li>
                  <li><a className="dropdown-item" href="#">unter 1:30 h</a></li>
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
                  <li><a className="dropdown-item" href="#">2</a></li>
                  <li><a className="dropdown-item" href="#">3</a></li>
                  <li><a className="dropdown-item" href="#">4</a></li>
                  <li><a className="dropdown-item" href="#">5</a></li>
                  <li><a className="dropdown-item" href="#">6</a></li>
              </ul>
          </div>
          <br />
          <br />
          <input className="btn btn-primary" type="submit" value="Plan erstellen"></input>
        </div>
      </Main_Layout>
    );
  }
  