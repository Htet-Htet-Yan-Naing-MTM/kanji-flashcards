<template>
	<div class="form-container">
		<input type="text" v-model="kanji" placeholder="kanji (e.g. 木)">
		<input type="text" v-model="meaning" placeholder="Write meaning (e.g. Tree)">
		<input type="text" v-model="reading" placeholder="Write read (e.g. もく)">
		<button @click="addNew">Add new flashcard</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			kanji : '',
			meaning : '',
			reading : '',
		}
	},
	methods: {
		addNew() {
			const kanjiCard = {
				kanji: this.kanji,
				meaning: this.meaning,
				reading: this.reading
			};
			this.$emit('add-kanji', kanjiCard);
			this.kanji = '',
			this.meaning = '',
			this.reading = ''
		}
	},
}
</script>

<style>
.form-container input {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box; 
}

.form-container button {
  width: 100%;
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>