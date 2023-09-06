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
      </div>
    );
  }
  
  export default Layout