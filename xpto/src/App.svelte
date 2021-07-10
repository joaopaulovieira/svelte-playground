<script>
	import Editor from './components/editor/Editor.svelte'
	import Header from './components/header/Header.svelte'

	let value = ''
</script>

<Header/>
<main>
	<h1>Svelte Playground!</h1>
	<Editor
		bind:value={value}
		height="500px"
	/>
</main>

<style src="./styles/main.scss"></style>
