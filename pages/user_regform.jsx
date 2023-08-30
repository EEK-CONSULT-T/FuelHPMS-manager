
const UserReg = () => (
    <div className="flex flex-row p-4">
        <div className="basis-1/3 user-regform">
            <h2>Sign Up</h2>
            <p className="subheader">Enter user details to register</p>
            {/* <div className="basis-1/4"></div> 
            <div className="basis-2/4">*/}
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
            {/* </div>
            <div className="basis-1/4"></div> */}
        </div>
        <div className=" basis-1/2">
            Users View
        </div>
    </div>
);

export default UserReg;