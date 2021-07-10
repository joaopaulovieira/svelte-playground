<script>
	import { setContext, onMount, afterUpdate } from 'svelte'

	import Navbar from './components/Navbar.svelte'
	import Form from './components/Form.svelte'
	import ExpensesList from './components/ExpensesList.svelte'
	import Totals from './components/Totals.svelte'
	import Modal from './components/Modal.svelte'

	let expenses = []

	let setName = '';
	let	setAmount = null;
	let setId = null;
	let isFormOpen = false;

	$: isEditing = !!setId;
	$: total = expenses.reduce((accumulator, current) => {
		return accumulator += current.amount;
	}, 0);

	function showForm() {
		isFormOpen = true;
	};

	function hideForm() {
		isFormOpen = false;

		setName = '';
		setAmount = null;
		setId = null;
	};

	function removeExpense(id) {
		expenses = expenses.filter(item => item.id !== id);
	};

	function clearExpenses() {
		expenses = [];
	};

	function addExpense({ name, amount }) {
		let expense = { id: Math.random() * Date.now(), name, amount };
		expenses = [expense, ...expenses];
	};

	function setModifiedExpense(id) {
		let expense = expenses.find(item => item.id === id);
		setId = expense.id;
		setName = expense.name;
		setAmount = expense.amount;
		showForm();
	};

	function editExpense({ name, amount }) {
		expenses = expenses.map(item => {
			return item.id === setId ? { ...item, name, amount } : { ...item }
		})

		setName = '';
		setAmount = null;
		setId = null;
	};

	setContext("remove", removeExpense);
	setContext("modify", setModifiedExpense);

	function setLocalStorage() {
		localStorage.setItem('expenses', JSON.stringify(expenses));
	};

	onMount(() => {
		expenses = localStorage.getItem('expenses')
		  ? JSON.parse(localStorage.getItem('expenses'))
			: [];
	});

	afterUpdate(setLocalStorage);
</script>

<Navbar {showForm}/>
<main class="content">
	{#if isFormOpen}
		<Modal>
			<Form
			name={setName}
			amount={setAmount}
			{addExpense}
			{isEditing}
			{editExpense}
			{hideForm} />
		</Modal>
	{/if}
	<Totals title="title expenses" {total} />
  <ExpensesList {expenses} />
	<button
	  type="button"
		class="btn btn-primary btn-block"
		on:click={clearExpenses}>
		clear expenses
	</button>
</main>