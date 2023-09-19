import AddInvestor from "@/components/investment/addInvestor";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

import { useState } from "react";
import { CSVLink } from "react-csv";
import { FaFileDownload } from "react-icons/fa";
import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";
import AddStation from "../stations./addStation";

const TABLE_HEAD = ["No.", "Type", "Amount (Ghc)", "Date",];

const TABLE_ROWS = [
    {   
        index: 1,
        type: "Fuel",
        amount: "20000",
        date: "12/12/2021",
    },
    {
        index: 2,
        type: "Fuel",
        amount: "20000",
        date: "12/12/2021",
    },

];

export default function ExpenseList() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Expense List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all stations
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button*/}
            <div className="flex justify-between px-4 pt-8">
              <div className="flex items-center">
                <button className=" text-blue-500 px-4 py-2 rounded-lg border border-blue-500 flex">
                  Download report
                  <FaFileDownload className="ml-2" size={18} />
                </button>
              </div>
            </div>
            <AddStation />
            {/* <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button> */}
            {/*  <div className=" flex  items-center  pt-8">
                   <CSVLink
                  filename={"givings_report.csv"}
                  // data={csvData}
                  // headers={headers}
                >
                  <button className="bg-blue-500 text-white px-6 py-1 rounded-md hover:bg-blue-800 flex items-center">
                    Download report
                    <FaFileDownload className="ml-2" size={18} />
                  </button>
                </CSVLink> 
                  </div>*/}
          </div>
        </div>
        {/**start */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex gap-4">
            {/* <div className="">
              <label htmlFor="category" className="py-1 ">
                Date from
              </label>
              <Input
                type="date"
                className="border-2 px-4 "
                value={dateFrom}
                onChange={handleDateFromChange}
              />
            </div> */}
            {/* <div className="">
              <label htmlFor="category" className="py-1 ">
                Date to
              </label>
              <Input
                type="date"
                className="border-2 px-4 "
                value={dateFrom}
                onChange={handleDateFromChange}
              />
            </div> */}
            {/* <div>
        
              <div className="">
                <label htmlFor="category" className="py-1 ">
                  Sort by
                </label>

                <Select
                  className="border-2 px-4 "
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                >
                  <Option disabled>Descending</Option>
                  <Option value="desc">Descending</Option>
                  <Option value="asc">Ascending</Option>
                </Select>
              </div>
            </div> */}
          </div>
          <div className="flex items-center">
            {/* <div className="flex justify-between px-4 pt-8 items-center">
              <div className="flex items-center">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex"
                  onClick=""
                >
                  Add Investor
                  <FaFileDownload className="ml-2" size={18} />
                </button>
              </div>
            </div> */}
            <div className=" flex  w-full md:w-72">
              <Input
                label="Search"
                value={searchTerm}
                onChange={handleSearchTermChange}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ index, type, amount, date }) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {type}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                        {amount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                        {date}
                    </Typography>
                  </td>

                  {/* <td className={classes}>
                    <Menu>
                      <MenuList>
                        <Link href={"/InvestorDetails"}>
                          <MenuItem>View Details</MenuItem>
                        </Link>

                        <MenuItem className="text-red-500">Delete</MenuItem>
                      </MenuList>

                      <MenuHandler>
                        <IconButton variant="text">
                          <HiDotsHorizontal className="h-4 w-4" />
                        </IconButton>
                      </MenuHandler>
                    </Menu>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>

      {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter> */}
    </Card>
  );
}
