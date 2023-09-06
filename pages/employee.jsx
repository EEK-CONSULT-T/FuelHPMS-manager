// import "/styles/globals.css";
 
// import { ThemeProvider } from "@material-tailwind/react";
 
// export default function MyApp({ Component, pageProps }) {
//   return (
//     <ThemeProvider>
//       <Component {...pageProps} />
//     </ThemeProvider>
//   );
// }

"use client";
import Link from 'next/link'
import SideBar from "./components/sidebar";
import NavBar from './components/content/navbar'
import ContentCont from "./components/contentcontainer";
import { ThemeProvider, Button, Alert } from "@material-tailwind/react";

const Employee = ({ Component, pageProps }) => {
    return (
        <div>
            <SideBar />
            <ContentCont component={<EmpLayout />}/>
        </div>
    );
};

const EmpLayout = () => {
    return (
        <div>
            <NavBar />
            Employee Page
            <Button>Button</Button>

            <div className="flex w-full flex-col gap-2">
            <Alert color="blue">An info alert for showing message.</Alert>
            <Alert color="red">An error alert for showing message.</Alert>
            <Alert color="green">A success alert for showing message.</Alert>
            <Alert color="amber">A warning alert for showing message.</Alert>
            </div>
        </div>
    );
};

export default Employee;
export { Alert, Button };