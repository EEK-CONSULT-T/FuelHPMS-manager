import Sidebar from "../components/sidebar";
import Navbar from '../components/content/navbar'
import DashOverview from '../components/content/dashboard'

function Layout({ component }) {
    return (
      <div className="flex">
        <Sidebar />
        {component}
        {/* <DashOverview />
        <UserReg /> */}
      </div>import UserReg from "../user_regform.jsx";
import DashOverview from "./content/dashboard.jsx";
import Navbar from "./content/navbar.jsx";

const ContentContainer = ({ component, props}) => {
    return (
        <div className="content-container">
            <Navbar />
            {component}
            {/* <DashOverview />
            <UserReg /> */}
            {/* <h1 className="text-light-green-900">This is the main content</h1> */}
        </div>
    );
};

export default ContentContainer;
    );
  }
  
  export default Layout