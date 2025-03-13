import { Logo } from "./Logo";

export function Navigation({ children }) {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
}
