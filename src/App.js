import React, { useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import uuid from "uuid/dist/v4";

const initialExpense = [
	{ id: uuid(), charge: "rent", amount: 1600 },
	{ id: uuid(), charge: "card payment", amount: 100 },
	{ id: uuid(), charge: "card removealt", amount: 2600 },
];

function App() {
	//****state values******* */

	// all expenses , add expense
	const [expenses, setExpenses] = useState(initialExpense);
	// single expense
	const [charge, setCharge] = useState("");

	//single amount
	const [amount, setAmount] = useState("");
	//****  functionality   ******* */

	const handleCharge = (e) => {
		setCharge(e.target.value);
	};
	const handleAmount = (e) => {
		setAmount(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (charge !== "" && amount > 0) {
			const singleExpense = { id: uuid(), charge, amount };
			setExpenses([...expenses, singleExpense]);
			setCharge("");
			setAmount("");
		} else {
			//handle alert
		}
	};
	return (
		<>
			<Alert />
			<h1>budget calculator</h1>
			<main className="App">
				<ExpenseForm
					charge={charge}
					amount={amount}
					handleCharge={handleCharge}
					handleAmount={handleAmount}
					handleSubmit={handleSubmit}
				/>
				<ExpenseList expenses={expenses} />
			</main>
			<h1>
				total spending:
				<span className="total">
					$
					{expenses.reduce((acc, curr) => {
						return (acc += parseFloat(curr.amount));
					}, 0)}
				</span>{" "}
			</h1>
		</>
	);
}

export default App;
