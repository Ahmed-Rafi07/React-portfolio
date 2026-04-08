const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="nav-wrap">
      <nav className="navbar container">
        <a href="#home" className="logo" aria-label="Go to home section">
          Rafi.dev
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle dark and light theme"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
