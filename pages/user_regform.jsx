import GenIcon from "./components/content/gen_icon";
import { BsPencilSquare, BsFileText, BsTrash, BsTrash3, BsTrashFill, BsCheckCircleFill, BsXCircleFill, BsXOctagonFill, BsExclamationTriangleFill} from 'react-icons/bs';
import { FaEdit, FaExclamationTriangle, FaHouseUser, FaPen, FaPenAlt, FaPenSquare, FaTimesCircle, FaTrashAlt, FaUsers, FaUsersCog } from 'react-icons/fa';

const UserReg = () => (
    <div className="flow-row-col p-4">

        <div className="user-regform">
            <h2 className="h2-text">Sign Up</h2>
            <p className="subheader">Enter user details to register</p>
            <form action="" className="">
                <div>
                    <p className="p-label">Name</p>
                    <input type="text" placeholder="Name" />
                </div>
                <div>
                    <p className="p-label">Contact</p>
                    <input type="phone" placeholder="Contact" />
                </div>
                <div>
                    <p className="p-label">Email</p>
                    <input type="Email" placeholder="Email" />
                </div>
                <div>
                    <p className="p-label">Role</p>
                    <select name="" id="">
                        <option selcted>Select Role</option>
                        <option>User</option>
                        <option>Administrator</option>
                    </select>
                </div>
                <div>
                    <p className="p-label">Password</p>
                    <input type="password" placeholder="Password" />
                </div>
                <div>
                    <p className="p-label">Repeat Password</p>
                    <input type="password" placeholder="Type password again" />
                </div>
                
                <button type="button" className="full-button">Register</button>
        
            </form>
        </div>

        <div className="user-viewform">
            <SucessTag iconname={<GenIcon icon={<BsCheckCircleFill size={18} className="float-left mx-2 my-1" />} />} color="bg-green-100 text-green-700" text="Great! Your data has been successfully saved"/>
            <SucessTag iconname={<GenIcon icon={<BsXOctagonFill size={18} className="float-left mx-2 my-1" />} />} color="bg-red-100 text-red-700" text="Oop..! Unknown error"/>
            <SucessTag iconname={<GenIcon icon={<FaExclamationTriangle size={18} className="float-left mx-2 my-1" />} />} color="bg-orange-100 text-orange-800" text="Oop..! Unknown error"/>
            <h2 className="h2-text">User View</h2>
            <p className="subheader">Preview of users' details</p>
            <table className="my-table table-auto">
                <thead>
                    <tr>
                        <th>Song</th>
                        <th>Artist</th>
                        <th>Year</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td>Malcolm Lockyer</td>
                        <td>1961</td>
                        <td className="text-right">
                            <button type="button" className="action-btn">
                                <GenIcon icon={<FaPenAlt size="14" className="text-teal-400"/>}/>
                            </button>
                            <button type="button" className="action-btn">
                                <GenIcon icon={<FaTrashAlt size="14" className="text-pink-500"/>}/>
                            </button>
                        </td>
                    </tr>
                    <tr className="bg-light-blue-50">
                        <td>Witchy Woman</td>
                        <td>The Eagles</td>
                        <td>1972</td>
                        <td className="text-right w-24">
                            <button type="button" className="action-btn">
                                <GenIcon icon={<FaPenAlt size="14" className="text-teal-400"/>}/>
                            </button>
                            <button type="button" className="action-btn">
                                <GenIcon icon={<FaTrashAlt size="14" className="text-pink-500"/>}/>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Shining Star</td>
                        <td>Earth, Wind, and Fire</td>
                        <td>1975</td>
                        <td className="text-right">
                            <button type="button" className="action-btn">
                                <GenIcon icon={<FaPenAlt size="14" className="text-teal-400"/>}/>
                            </button>
                            <button type="button" className="action-btn">
                                <GenIcon icon={<FaTrashAlt size="14" className="text-pink-500"/>}/>
                            </button>
                        </td>
                    </tr>
                    <tr className="bg-light-blue-50">
                        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td>Malcolm Lockyer</td>
                        <td>1961</td>
                        <td className="text-right">
                            <button type="button" className="action-btn">
                                <GenIcon icon={<FaPenAlt size="14" className="text-teal-400"/>}/>
                            </button>
                            <button type="button" className="action-btn">
                                <GenIcon icon={<FaTrashAlt size="14" className="text-pink-500"/>}/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const SucessTag = ( {iconname, color, text} ) => (
    <div className={`success-tag ${color}`}>
        {iconname}
        <p>{text}</p>
    </div>
);

export default UserReg;