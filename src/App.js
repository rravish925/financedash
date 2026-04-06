import './App.css';
import DashBoard from './components/DashBoard';

function App() {
  const transaction = [
    { date: "2026-04-26" , amount: 9000 , type: "Income" , category: "Salary" },
    { date: "2026-04-31" , amount: 2000 , type: "Expense" , category: "House Rent" },
    { date: "2026-04-01" , amount: 1500 , type: "Expense" , category: "Food" },
    { date: "2026-04-03" , amount: 15000 , type: "Income" , category: "Business" },
    { date: "2026-04-01" , amount: 9000 , type: "Expense" , category: "Home Appliance" }
  ];
  return (
    <div>
      <DashBoard transaction = {transaction} />
    </div>
  );
}

export default App;
