export default function Header() {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 mb-3 mb-sm-0">
            <h1 className="h4 mb-0">Guess That Song</h1>
          </div>
          <div className="col-12 col-sm-6">
            <nav>
              <ul className="nav justify-content-center justify-content-sm-end">
                <li className="nav-item">
                  <a href="index.html" className="nav-link text-white">Home</a>
                </li>
                <li className="nav-item">
                  <a href="login.html" className="nav-link text-white">Log In</a>
                </li>
                <li className="nav-item">
                  <a href="leaderboard.html" className="nav-link text-white">Leaderboard</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}