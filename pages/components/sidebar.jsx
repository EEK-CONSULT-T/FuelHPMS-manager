import Link from 'next/link'
import { BsPersonLinesFill, BsPersonWorkspace, BsHouseFill, BsCapsule, BsGearWideConnected, BsCaretLeft, BsCaretLeftFill } from 'react-icons/bs';
import { FaHouseUser, FaHourglassEnd, FaListAlt, FaTruck } from 'react-icons/fa';
import MyIcon from './content/gen_icon'

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-light-blue-900 text-gray-500 shadow-lg z-10">
            {/* <i>1</i>
            <i>2</i>
            <i>3</i>
            <i>4</i>
            <i>5</i> */}
            <Link href="/"><SidebarIcon icon={<BsHouseFill size="22"/>} text='Home' /></Link>
            <Divider />
            <Link href="/employee"><SidebarIcon icon={<BsPersonLinesFill size="22"/>} text='Employee' /></Link>
            <Link href="/waybill"><SidebarIcon icon={<FaTruck size="22"/>} text='Waybill' /></Link>
            <SidebarIcon icon={<FaListAlt size="22"/>} text='Records' />
            <SidebarIcon icon={<BsHouseFill size="22"/>} text='Home' />
            {/* <Divider /> */}
            <SidebarIcon icon={<BsGearWideConnected size="22"/>} text='Settings' />
        </div>
    );
};

const SidebarIcon = ({ icon, text = 'tooltip' }) => (
    <div className="sidebar-icon group">
        {icon}

        <span className="sidebar-caret group-hover:scale-100">
            <MyIcon icon={<BsCaretLeftFill size="24"/>} />
        </span>
        <span className="sidebar-tooltip group-hover:scale-100 tracking-widest font-normal uppercase clear-both">
            {text}
        </span>
    </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;