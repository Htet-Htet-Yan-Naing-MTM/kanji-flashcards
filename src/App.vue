<template>
  <div id="app" class="inner">
    <h1 class="txt-center">Kanji Flashcards</h1>

    <!-- Get random flashcard -->
    <button @click="randomCard" class="cmn-btn">Random</button>

    <!-- Display random kanji card -->
    <div class="container">
      <kanjiCard :info="kanjiList[current]" :key="current"/>
    </div>

    <!-- Previous and Next button -->
    <div class="cmn-btn-list">
      <button @click="prevCard" class="cmn-btn">Previous</button>
      <button @click="nextCard" class="cmn-btn">Next</button>
    </div>

    <!-- Create new flashcard modal box -->
    <div v-if="showForm" class="modal-overlay">
      <div class="modal-content">
        <span class="close-btn" @click="showForm = false">&times;</span>
        <kanjiForm @add-kanji="handleAddKanji" />
      </div>
    </div>

    <h2 class="txt-center">All kanji cards</h2>
    <div @click="showForm = true" style="cursor: pointer">+ Create New Card</div>

    <!-- Filter by keyword -->
    <input type="text" v-model="searchKey" class="search-box" placeholder="Search...">

    <!-- All flashcard display by filtered -->
    <div class="kanji-list">
      <kanjiCard v-for="(item,i) in filteredList" :info="item" :key="i"/>
    </div>
  </div>
</template>

<script>
import { db } from './firebase/index.js' 
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'

import kanjiCard from './components/kanjiCard.vue'
import kanjiForm from './components/kanjiForm.vue'

export default {
  components: { kanjiCard , kanjiForm},
  data() {
    return {
      showForm: false,
      searchKey: '',
      current: 0,
      kanjiList: [] 
    }
  },
  created() {
    const q = query(collection(db, "kanji-cards"), orderBy("createdAt", "desc"));
    
    onSnapshot(q, (snapshot) => {
      this.kanjiList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  },
  methods: {
    randomCard() {
      this.current = Math.floor(Math.random() * this.kanjiList.length);
    },
    prevCard() {
      if (this.current > 0) {
        this.current = this.current - 1;
      }
    },
    nextCard() {
      if (this.current < this.kanjiList.length - 1) {
        this.current = this.current + 1;
      } else {
        this.current = 0;
      }
    },
    async handleAddKanji(newCard) {
      try {
        // This adds the new card directly to Firebase
        await addDoc(collection(db, "kanji-cards"), {
          kanji: newCard.kanji,
          meaning: newCard.meaning,
          reading: newCard.reading,
          createdAt: new Date() 
        });
        
        this.showForm = false;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
  computed: {
    filteredList() {
      return this.kanjiList.filter(
        item => {
          return item.kanji.includes(this.searchKey) || 
          item.meaning.includes(this.searchKey) || 
          item.reading.includes(this.searchKey)
        }
      );
    }
  }
}
</script>

<style>
.inner {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
}
.txt-center {
  text-align: center;
}
.container { 
  display: flex; 
  gap: 20px; 
  padding: 20px; 
  justify-content: center;
  padding-top: 50px;
}
.cmn-btn-list {
  max-width: 500px;
  margin: 0 auto 50px;
  display: flex;
  gap: 20px;
}
.cmn-btn {
  cursor: pointer;
  display: block;
  width: 200px;
  margin: 0 auto;
  padding: 10px 0;
  background-color: #42b983; 
  border: 0;
  color: white;
}
.cmn-btn:hover {
  background-color: white;
  color: #42b983;
  border: 1px solid #42b983;
}
.kanji-list {
  display: flex;
  margin: 20px auto 0;
  padding-top: 20px;
  flex-wrap: wrap;
}
.search-box {
  margin-left: auto;
  display: block;
  padding: 7px;
  width: 200px;
}
.kanji-list .flip-card {
  width: 31.5%;
  margin-bottom: 30px;
}
.kanji-list .flip-card:not(:nth-child(3n)) {
  margin-right: 2%;
}

/* Kanji Create Modal Popup */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}
.modal-content {
  background: white;
  padding: 50px 30px 30px;
  border-radius: 12px;
  position: relative;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.close-btn {
  position: absolute;
  top: 7px;
  right: 30px;
  font-size: 34px;
  cursor: pointer;
  color: black;
}
.close-btn:hover {
  color: red;
}
</style>

