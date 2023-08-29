import '../styles/globals.css'
import SideBar from "./components/sidebar.jsx";
import Channelbar from "./components/channelbar";
import ContentContainer from "./components/contentcontainer.jsx";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex">
      <SideBar />
      {/* <Channelbar /> */}
      {/* <ContentContainer /> */}
      <ContentContainer />
    </div>
  );
  // return <Component {...pageProps} />
}

export default MyApp
