import Head from 'next/head';
import Image from 'next/image';
import React from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Cards from '@/components/Cards';
import Progrssings from '@/components/Progrssings';
import Recordings from '@/components/Recordings';
import Progressings from '@/components/Progrssings';
import Report from '@/components/Report';


import Header from '../components/Header';
import TopCards from '../components/TopCards';
import BarChart from '../components/BarChart';
import RecentOrders from '../components/RecentOrders';
import Dashboard from '@/components/Dashboard/Dashboard';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fuel Up Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-200 min-h-screen w-full">
<Dashboard/>
        {/* <Header />
        <Cards />
        <div className="p-4 grid md:grid-cols-1 grid-cols-1 gap-4 my-8">
           <Progrssings />
        </div> */}
      </main>
    </>
  );
}

