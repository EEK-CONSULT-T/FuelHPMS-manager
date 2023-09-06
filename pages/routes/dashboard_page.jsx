// import Layout from './layout'
import SideBar from "../components/sidebar";
import Navbar from '../components/content/navbar'
import DashOverview from '../components/content/dashboard'
import ContentContainer from "../components/contentcontainer";

function DashboardPage() {
    return (
      
        <div className="flex">
            <SideBar />
            {/* <Channelbar /> */}
            {/* <ContentContainer /> */}
            <ContentContainer component={<DashOverview />}/>
        </div>
    );
  }
  
  export default DashboardPage