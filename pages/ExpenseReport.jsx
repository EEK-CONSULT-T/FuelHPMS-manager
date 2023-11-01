import React, { useState } from 'react'

const ExpenseReport = () => {
      const [expenses, setExpenses] = useState([]);
      const [selectedStation, setSelectedStation] = useState("");
      const [totalExpense, setTotalExpense] = useState(0);
      const [dateFrom, setDateFrom] = useState("");
      const [dateTo, setDateTo] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const [selectedCategory, setSelectedCategory] =
        useState("All Categories");

      const handleSelectChange = (e) => {
        setSelectedStation(e.target.value);
      };
      
        const fetchExpense = () =>{
            
        }





  return (
    <div>ExpenseReport</div>
  )
}

export default ExpenseReport