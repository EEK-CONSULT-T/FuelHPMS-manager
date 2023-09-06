import GenIcon from "./gen_icon";
import { BsPencilSquare, BsGearFill, BsBellFill, BsCaretDownFill, BsPersonFillGear, BsPersonVcardFill, BsFileText, BsFileTextFill, BsPersonVcard, BsCalendar2Check, BsExclamationTriangleFill, BsExclamationTriangle } from 'react-icons/bs';
import { FaCalendarCheck, FaExclamationTriangle, FaHouseUser, FaPrint, FaUsers, FaUsersCog } from 'react-icons/fa';

const DashOverview = () => {
    // bg-[url('/img/hero-pattern.svg')]
    return (
        <div className="mx-3 my-3 px-2 py-4 border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex flex-row"> 
                <div className="overview-box basis-1/4 relative">
                    <GenIcon icon={<BsPersonVcard size="70" className="text-light-blue-400 p-1 border-none mb-2"/>}/>
                    <p className="text-gray-600 font-light tracking-wide text-sm">Welcome</p>
                    <h2 className="text-blue-gray-800 text-xl font-medium">John Doe</h2>
                    <GenIcon icon={<BsPersonFillGear size="200" className="text-light-blue-400 -mt-32 ml-5 opacity-10 resize"/>}/>
                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyxlgRybS8RO7BL8L3MkotFnQTz-qP_YeUF_iUxu9lnvBpVusEULo8tIoBQYqDGcDg0Xo&usqp=CAU" alt=""
                    className="rounded-full border-8 absolute top-5 left-20 opacity-10" /> */}
                    <button className="bg-gray-300 absolute bottom-12 border border-gray-400 opacity-70 -mt-32 hover:bg-gray-400 px-3 py-2 text-xs w-36 rounded-md text-gray-900 uppercase font-thin tracking-wider">
                        <GenIcon icon={<BsPencilSquare size="16" className="text-gray-900 m-0 p-0 float-left"/>}/>
                        &nbsp;Edit Profile
                    </button>
                </div>

                <div className="overview-box basis-1/4">
                    <GenIcon icon={<FaUsersCog size="70" className="text-teal-400 mb-2"/>}/>
                    <h2 className="text-blue-gray-800 text-xl font-medium">System Users</h2>
                    <p className="text-gray-500 font-light tracking-wide text-sm">25 Active</p>
                </div>

                <div className="overview-box basis-1/2">
                    <div className="flex flex-row bg-gray-100 px-3 pt-4 pb-1 rounded-md border border-gray-200 hover:bg-gray-200">
                        <GenIcon icon={<BsFileText size="50" className="text-pink-500 mb-2 mr-2"/>}/>
                        <h2 className="text-blue-gray-800 text-xl font-medium">System Report
                            <p className="text-gray-500 font-light tracking-wide text-sm">Generate Reports Here</p>
                        </h2>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="w-2">
                                    <GenIcon icon={<BsCalendar2Check size="20" className="text-red-500"/>}/>
                                </td>
                                <td>Aug, 2023 <p>NOT PAID</p></td>
                                <td className="text-center"><GenIcon icon={<FaExclamationTriangle size="34" className="text-yellow-700 border border-gray-300 rounded-md p-2 hover:bg-gray-200"/>}/></td>
                            </tr>
                            <tr>
                                <td className="w-2">
                                    <GenIcon icon={<BsCalendar2Check size="20" className="text-teal-400"/>}/>
                                </td>
                                <td>Aug, 2023 <p>NOT PAID</p></td>
                                <td className="text-center"><GenIcon icon={<FaPrint size="34" className="text-gray-800 border border-gray-300 rounded-md p-2 hover:bg-gray-200"/>}/></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {/* <GenIcon icon={<BsFileTextFill size="50" className="text-pink-500 mb-2"/>}/>
                    <h2 className="text-blue-gray-800 text-xl font-medium">System Report</h2>
                    <p className="text-gray-500 font-light tracking-wide text-sm">Generate Reports Here</p> */}
                </div>
            </div>
        </div>
    );
};

export default DashOverview;