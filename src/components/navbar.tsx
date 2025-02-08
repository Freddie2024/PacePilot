export default function Navbar() {
    return (
        <>
        <nav className="navbar navbar-light fixed-bottom bg-light">
            <div className="container-fluid justify-content-around">
                <div className="text-center">
                     <i className="bi bi-house" style={{ fontSize: '24px' }}></i>
                    <div style={{ fontSize: '10px' }}>Dein Plan</div>
                </div>
                <div className="text-center">
                    <i className="bi bi-calendar" style={{ fontSize: '24px' }}></i>
                    <div style={{ fontSize: '10px' }}>Aktuelle Woche</div>
                </div>
                <div className="text-center">
                    <i className="bi bi-gear" style={{ fontSize: '24px' }}></i>
                    <div style={{ fontSize: '10px' }}>Einstellungen</div>
                </div>
                <div className="text-center">
                    <i className="bi bi-info-circle" style={{ fontSize: '24px' }}></i>
                    <div style={{ fontSize: '10px' }}>FAQ</div>
                </div>
            </div>
        </nav>
        </>
    );
}