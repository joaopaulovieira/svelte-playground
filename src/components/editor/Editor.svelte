<div
  bind:this={element}
  style="width:{width};height:{height}"
></div>

<script>
  import { createEventDispatcher, tick, onMount, onDestroy } from 'svelte'
  import * as ace from 'brace'
  import 'brace/mode/javascript'
  import 'brace/theme/solarized_dark'

  const dispatch = createEventDispatcher()
  
  export let value
  export let height = '100%'
  export let width = '100%'
  export let editor = null

  let element = null

  export const resizeOnNextTick = () => tick().then(() => { editor && editor.resize() })

  $: if (height !== null && width !== null) resizeOnNextTick()

  onMount(() => {
    editor = ace.edit(element)
    editor.getSession().setMode('ace/mode/javascript')
    editor.setTheme('ace/theme/solarized_dark')
    editor.setValue(value, 1)
    editor.on('change', () => {
      const content = editor.getValue()
      dispatch('input', content)
    })
    editor.getSession().setValue("// This is a Editor component!\n\n");
  })

  onDestroy(() => {
    if (editor) {
      editor.destroy()
      editor.container.remove()
    }
  })
</script>