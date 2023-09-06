import { BsPencilSquare, BsGearFill, BsBellFill, BsCaretDownFill } from 'react-icons/bs';
import { FaThLarge } from 'react-icons/fa';

const NavBar = () => {
    return (
        <div className="w-full h-12 bg-gray-200 px-3 py-2 border-b-2 border-light-blue-400">
            <h3 className="header-text float-left">Dashboard</h3>
            {/* <MyIcon icon={<FaThLarge size="18"/>} text='Notivication' /> */}
            {/* <nav className="flex sm:justify-center space-x-4">
            {[
                ['Home', '/dashboard'],
                ['Team', '/team'],
                ['Projects', '/projects'],
                ['Reports', '/reports'],
            ].map(([title, url]) => (
                <a href={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
            ))}
            </nav> */}
            {/* <a href="#">User</a> */}
            {/* <div className="bg-light-blue-200 py-1 w-auto flex flex-row-reverse float-right"> */}
            <div className="w-auto py-1 flex flex-row-reverse">
                {/* <NavbarIcon icon={<BsPencilSquare size="20"/>} text='Edit' /> */}
                <div className="mx-3 w-15 h-6 flex hover:bg-white shadow-lg rounded-3xl">
                    <img src="https://img.freepik.com/premium-photo/business-woman-pointing-copyspace-isolated-white-wall_396254-76.jpg" alt=""
                    className="w-6 h-6 rounded-3xl border-solid border-2 border-gray-500" />
                    <MyIcon icon={<BsCaretDownFill size="13"/>} text='Settings' />
                </div>
                <NavbarIcon icon={<BsGearFill size="15"/>} text='Settings' />
                <NavbarIcon icon={<BsBellFill size="15"/>} text='Notivication' />
                {/* <input type="text" placeholder="Search" className="mx-2 my-1 px-5 rounded-3xl h-10 outline-none"/> */}
            </div>
            
        </div>
    );
};

const MyIcon = ({ icon }) => (
    <div className="mx-1 my-2 text-gray-500">{icon}</div>
);

const NavbarIcon = ({ icon, text = 'tooltip' }) => (
    <div className="navbar-icon group">
        {icon}

        {/* <span className="sidebar-tooltip group-hover:scale-100 tracking-widest font-normal uppercase">
            {text}
        </span> */}
    </div>
);

export default NavBar;
