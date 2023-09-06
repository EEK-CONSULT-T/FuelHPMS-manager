import UserReg from "../user_regform.jsx";
import DashOverview from "./content/dashboard.jsx";
import NavBar from "./content/navbar.jsx";

const ContentContainer = ({ component }) => {
    return (
        <div className="flex">
            <div className="content-container">
                {component}
            </div>
        </div>
    );
};

export default ContentContainer;