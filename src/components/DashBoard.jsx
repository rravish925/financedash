import React, { useState } from 'react'
import walletImg from './assets/wallet.webp'
import expenseImg from './assets/expense.png'
import balanceImg from './assets/balance.png'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { BarChart, Bar, XAxis, YAxis,CartesianGrid } from 'recharts'
import { ResponsiveContainer } from "recharts";

function DashBoard({transaction}) {
  const [data, setData] = useState(transaction)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    date: '',
    amount: '',
    category: '',
    type: 'Income'
  })
  const sortedData =[... data].sort(
          (a,b) => new Date(b.date) - new Date(a.date)        // for changing the order of the record.
          )
  const handleAdd = () =>{
    if(!form.date || !form.amount || !form.category ||!form.type){
      alert('All fields are required')
      return
    }
   if (editIndex !== null) {
    // EDIT MODE
    const updatedData = [...data]
    updatedData[editIndex] = { ...form, amount: Number(form.amount) }
    setData(updatedData)
    setEditIndex(null)
  } else {
    // ADD MODE
    setData([...data, { ...form, amount: Number(form.amount) }])
  }

  setForm({ date: '', amount: '', category: '', type: 'Income' })
  setShowForm(false)
}
  const handleDelete = (itemToDelete) =>{
    if(window.confirm('Are you sure?')){
    const updateData = data.filter(item => item!== itemToDelete)
    setData(updateData)
    }
  }
  const [search, setSearch] = useState('')
  const filteredData =sortedData.filter((item) =>
  item.category.toLowerCase().includes(search.toLowerCase())
)
  const [editIndex , setEditIndex] = useState(null)
  const handleEdit = (item) => {
    const index = data.indexOf(item)
    setForm(item)
    setEditIndex(index)
    setShowForm(true)
  }

    // initialize the variable
    let Income = 0;
    let Expense = 0;

    // looping the transactions.
    for(let i = 0; i< data.length; i++){
        let item = data[i];
        if(item.type === 'Income'){
            Income = Income + item.amount;
        }else{
            Expense = Expense + item.amount;
        }
    }
    // adding charts
    const chartData = [{name: 'Income',value:Income},
      {name: 'Expense',value: Expense}
    ]
    const Colors = ['#22c55e', '#ef4444']
    // calculation of balance here 
    const balance = Income - Expense;

    const combCategoryData = Object.values(
      data.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = { name: item.category, Income: 0,Expense:0 }
          }
          if(item.type === 'Income'){
            acc[item.category].Income += item.amount
          } else{
            acc[item.category].Expense += item.amount
          }  
          return acc
      }, {})
    )
    // Role
    const [role, setRole] = useState("Admin");
    return (
    <div className=' p-12 font-semibold text-xl min-h-screen'>
      <h1 className='flex flex-wrap justify-center font-bold text-3xl'>Finance Dashboard</h1>

      <div className="flex justify-between items-center">
        <h2 className='text-2xl font-semibold pt-10'>Dashboard Overview</h2>
        <select value={role} onChange={(e) => setRole(e.target.value)} className={`px-4 py-2 rounded-lg border font-semibold outline-none${role === "Admin" ? "bg-green-100 text-green-700 border-green-400" : "bg-blue-100 text-blue-700 border-blue-400"}`}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>
      <div className='h-56 border-t-2 mt-5 flex flex-wrap justify-around pt-10'>

        <div className='w-96 h-60 border-2 rounded-xl m-8 shadow-lg flex justify-between items-center p-4'>
          <div>
            <p className='pb-5 text-2xl'>Total Income</p>
            <p className='text-3xl font-bold'>₹{Income}</p>
          </div>  
          <img src={walletImg} alt='wallet' className='object-cover w-44 h-44 mt-14' />  
        </div>
         
        <div className='w-96 h-60 border-2 rounded-xl m-8 shadow-lg flex justify-between items-center p-4'>
          <div>
            <p className='pb-5 text-2xl'>Total Expense</p>
            <p className='text-3xl font-bold'>₹{Expense}</p>
          </div>  
          <img src={expenseImg} alt='wallet' className='object-cover w-32 h-32 mt-5' />  
        </div>

        <div className='w-96 h-60 border-2 rounded-xl m-8 shadow-lg flex justify-between items-center p-4'>
          <div>
            <p className='pb-5 text-2xl'>Total Balance</p>
            <p className='text-3xl font-bold'>₹{balance}</p>
          </div>  
          <img src={balanceImg} alt='wallet' className='object-cover w-40 h-40 mt-5' />  
        </div> 
      </div>

  {/* Transaction section */}
      <div className='mt-40'>
        <h2 className='text-2xl font-semibold mb-5'>Transaction</h2>
        <hr className='border border-gray-200'></hr>
        <div className='mt-5 flex wrap gap-7'>
          <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} alt='Search Items' placeholder='Search by Category...' className='w-5/6 h-11 border-2 rounded-lg p-4' />
          {role === 'Admin' && (
          <button className="w-52 h-11 border-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setShowForm(true)}>Add Transaction</button>
          )}
        </div>
      </div>
      {showForm && (
        <div className='bg-white p-6 rounded-xl shadow-lg mt-6 mb-6 max-w-3xl mx-auto'>
          <div className='grid grid-cols-2 gap-7'>
            <input type='Date'  placeholder='DD-MM-YYYY' onChange ={(e) => setForm({...form, date: e.target.value})} className='border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none' />
            <input type='number' placeholder='Amount' onChange= {(e) => setForm({...form, amount: e.target.value})}  className='border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none' />
            <input onChange={(e) => setForm({ ...form, category: e.target.value })} type='text' placeholder='Category' className='border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none' />
            <select onChange= {(e) => setForm({...form, type: e.target.value})} className='border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none'>
              <option>Select Type</option>
              <option value= 'Income'>Income</option>
              <option value= 'Expense'>Expense</option>
            </select>
          </div>
          <div className='flex justify-evenly pl-12 pr-12 mt-6'>
            <button onClick ={()=> setShowForm(false)} className='w-40 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300'>Cancel</button>
            <button onClick = {handleAdd} className='w-40 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Save</button>
          </div>
        </div>
      )}
  {/* Table design */}
      <div className='border-2 rounded-lg mt-8'>
        <table className='w-full text-left'>
          <thead className='bg-slate-50'>
            <tr className='h-12'>
              <th className='pl-3'>Date</th>
              <th className='pl-3'>Amount</th>
              <th className='pl-3'>Category</th>
              <th className='pl-3'>Type</th>
              {role === "Admin" && 
                <th className="text-center">Action</th>
              }
            </tr>
          </thead>
          
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td className='text-center p-4 text-gray-500'>No data found</td>
              </tr>
            ):(
            filteredData.map((item, index) => (
              <tr key={index} className='border-t'>
                <td className='p-3'>{item.date}</td>
                <td className='p-3'>₹{item.amount}</td>
                <td className='p-3'>{item.category}</td>
                <td className='p-3'>
                  <span className={
                    item.type === 'Income' ? 'text-green-600' : 'text-red-600'
                  }>{item.type}</span>
                </td>
                {role === "Admin" && (
                <td className=''>
                  <div className='flex justify-evenly'>
                    <button onClick={() => handleDelete(item)} className='flex items-center  text-gray-900 '>🗑 Delete</button>
                    <button onClick={()=> handleEdit(item)} className= 'text-gray-900 '>✏️ Edit</button>
                  </div>  
                </td>
                )}  
              </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
{/* charts */}
        <h1 className='mt-32 text-center text-blue-500 font-bold text-3xl border-b-2 border-y-gray-700'>Visual overview of your income and expenses</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
          <div className='bg-white rounded-2xl shadow-lg p-6 mt-10 w-fit mx-auto flex-col justify-center items-center'>
            <h2 className='text-xl font-semibold text-center mb-4'>Income vs Expense</h2>
            <PieChart width={400} height={350}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                dataKey="value"
                label >
                {
                  chartData.map((entry,index) =>(
                  <Cell key={index} fill={Colors[index]} />
                  ))
                }
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold">₹{balance}</text>
              <Tooltip />
              <Legend />
              </PieChart>
            </div>
    {/* chart 2 */}
          <div className='bg-white rounded-2xl shadow-lg p-6 mt-10 w-full max-w-2xl mx-auto'>
            <h2 className='text-xl font-semibold text-center mb-4'>Income & Expense by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={combCategoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-20} textAnchor='end' interval={0} height={70}/>
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="Income" fill="#22c55e" />   
                <Bar dataKey="Expense" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>  
          </div>
        </div>  
      </div>         
  )
}

export default DashBoard
