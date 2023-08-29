import { BsPersonLinesFill, BsPersonWorkspace, BsHouseFill, BsCapsule, BsGearWideConnected } from 'react-icons/bs';
import { FaHouseUser, FaHourglassEnd, FaListAlt } from 'react-icons/fa';

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-light-blue-900 text-gray-500 shadow-lg z-10">
            {/* <i>1</i>
            <i>2</i>
            <i>3</i>
            <i>4</i>
            <i>5</i> */}
            <SidebarIcon icon={<BsHouseFill size="24"/>} text='Home' />
            <Divider />
            <SidebarIcon icon={<BsPersonLinesFill size="22"/>} text='Employee' />
            <SidebarIcon icon={<FaListAlt size="22"/>} text='Records' />
            <SidebarIcon icon={<BsCapsule size="20"/>} text='Home' />
            <SidebarIcon icon={<BsHouseFill size="20"/>} text='Home' />
            {/* <Divider /> */}
            <SidebarIcon icon={<BsGearWideConnected size="20"/>} text='Settings' />
        </div>
    );
};

const SidebarIcon = ({ icon, text = 'tooltip' }) => (
    <div className="sidebar-icon group">
        {icon}

        <span className="sidebar-tooltip group-hover:scale-100 tracking-widest font-normal uppercase">
            {text}
        </span>
    </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;