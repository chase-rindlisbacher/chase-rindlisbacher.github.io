// MainPage.tsx
import { Outlet } from "react-router-dom"; // Used for nested routes
import PageBanner from "./PageBanner";
import './GameCards.css';
import './MainPage.css';
import Breadcrumbs from "./Breadcrumbs";

export default function MainPage() {
    return (
        <main>
            <PageBanner />
            {/* Navigation stays consistent across routes */}
            <Breadcrumbs />
            <div className="main-content">
                {/* This is where the dynamic content will be injected */}
                <Outlet /> {/* The selected game's content will render here based on the route */}
            </div>
        </main>
    );
}
