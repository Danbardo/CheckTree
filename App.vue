<template>
<div class="container">
	<Node :checkState="0" :node="nodes"></Node>
</div>
</template>
<script>
import store from './store.js'
import Node from './Node.vue'

export default {
	name: 'App',
	components: {
		Node,
	},
	data() {
		return {
			'nodes': store,
		}
	},
}
</script>
<style>
body {
	font-family: Menlo, Consolas, monospace;
	color: #444;
}
.container{
	width:50%;
	margin:auto;
}
</style>
