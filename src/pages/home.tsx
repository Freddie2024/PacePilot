export default function HomePage() {
    return (
      <div>
        <h1>Einstellungen</h1>
        <p>Wähle dein Trainingsziel:</p>
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Trainingsziel
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">10km-Lauf</a></li>
                <li><a className="dropdown-item" href="#">Halbmarathon</a></li>
            </ul>
        </div>
        <p>Wie viele Wochen hast du Zeit?</p>
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
        <p>In welcher Zeit willst du ans Ziel kommen?</p>
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Zielzeit
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">10km-Lauf</a></li>
                <li><a className="dropdown-item" href="#">Halbmarathon</a></li>
            </ul>
        </div>
        <p>Wie oft pro Woche kannst du trainieren?</p>
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
      </div>
    );
  }
  