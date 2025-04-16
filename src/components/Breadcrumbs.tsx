// Navigation.tsx
import { Link, useLocation } from "react-router-dom";  // Link to navigate between pages and useLocation to check current route
import './Breadcrumbs.css';
import { HOME_BREADCRUMB } from "../Constants";

export default function Breadcrumbs() {
    const location = useLocation();  // Access current route location
    
    const pathnames = location.pathname.split('/')
    console.log(pathnames);
    const crumbs = [];

    // Check if the current path is the root path
    if (pathnames[1] !== "" && pathnames[1] !== 'characterInfo') {
        for (const pathname of pathnames) {
            if (pathname === "") {
                crumbs.push(
                    <li key={`bc${HOME_BREADCRUMB}`}>
                        <Link className="link" style={{color: "white"}} to="/">{HOME_BREADCRUMB}</Link>
                    </li>
                );
            }
            else {
                crumbs.push(
                    <li key={`bc${pathname}`}>
                        <Link className="link" style={{color: "white"}} to={`/${pathname}`}>{pathname}</Link>
                    </li>
                )
            }
        }

        return (
            <div className="crumbs-wrapper">
                <div className="crumbs">
                    <ul>
                        {crumbs}
                    </ul>
                </div>
            </div>
        );
    }
    else if (pathnames[1] !== "") {
        return (
            <div className="crumbs-wrapper">
                <div className="crumbs">
                    <ul>
                        <li key={`bc${HOME_BREADCRUMB}`}>
                            <Link className="link" style={{color: "white"}} to="/">{HOME_BREADCRUMB}</Link>
                        </li>
                        <li key={`bccharacterInfoHome`}>
                            <Link className="link" style={{color: "white"}} to={`/characterInfoHome`}>characterInfoHome</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return <div className="crumbs-wrapper"></div>;
}
