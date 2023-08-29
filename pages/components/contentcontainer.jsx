import DashOverview from "./content/dashboard.jsx";
import NavBar from "./content/navbar.jsx";

const ContentContainer = () => {
    return (
        <div className="content-container">
            <NavBar />
            <DashOverview />
            {/* <h1 className="text-light-green-900">This is the main content</h1> */}
        </div>
    );
};

export default ContentContainer;