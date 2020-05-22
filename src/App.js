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

	// set alert state

	const [alert, setAlert] = useState({ show: false });
	//****  functionality   ******* */
	//handle charge
	const handleCharge = (e) => {
		setCharge(e.target.value);
	};
	//handle amount
	const handleAmount = (e) => {
		setAmount(e.target.value);
	};
	//handle alert

	const handleAlert = ({ text, type }) => {
		setAlert({ show: true, type, text });
		setTimeout(() => {
			setAlert({ show: false });
		}, 3000);
	};
	//edit
	const [edit, setEdit] = useState(false);
	//edit item
	const [id, setId] = useState(0);
	//handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		if (charge !== "" && amount > 0) {
			if (edit) {
				let tempExpenses = expenses.map((item) => {
					return item.id === id ? { ...item, charge, amount } : item;
				});
				setExpenses(tempExpenses);
				setEdit(false);
				handleAlert({ type: "success", text: "item edited" });
			} else {
				const singleExpense = { id: uuid(), charge, amount };
				setExpenses([...expenses, singleExpense]);
			}

			setCharge("");
			setAmount("");
			handleAlert({ type: "success", text: "item added" });
		} else {
			handleAlert({
				type: "danger",
				text: `charge can't be empty value and amount value has to be larger than 0`,
			});
		}
	};
	const clearItem = () => {
		setExpenses([]);
		handleAlert({ type: "danger", text: "all items deleted" });
	};

	const handleDelete = (id) => {
		let tempExpense = expenses.filter((item) => item.id !== id);
		setExpenses(tempExpense);
		handleAlert({ type: "danger", text: "item deleted" });
	};

	const handleEdit = (id) => {
		let expense = expenses.find((item) => item.id === id);
		let { charge, amount } = expense;
		setCharge(charge);
		setAmount(amount);
		setEdit(true);
		setId(id);
	};
	return (
		<>
			{alert.show && <Alert type={alert.type} text={alert.text} />}

			<h1>budget calculator</h1>
			<main className="App">
				<ExpenseForm
					charge={charge}
					amount={amount}
					handleCharge={handleCharge}
					handleAmount={handleAmount}
					handleSubmit={handleSubmit}
					edit={edit}
				/>
				<ExpenseList
					expenses={expenses}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					clearItems={clearItem}
				/>
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
