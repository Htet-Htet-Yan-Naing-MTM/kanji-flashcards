<template>
  <div class="flip-card" @click="isFlipped = !isFlipped"> 
    <div class="flip-card-inner" :class="{ 'is-flipped': isFlipped }">
      <div class="flip-card-front"> 
        <h1>{{ info.kanji }}</h1> 
      </div>

      <div class="flip-card-back">
        <p>Meaning: {{ info.meaning }}</p>
        <p>Reading: {{ info.reading }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info'],
  data() {
    return {
      isFlipped: false,
    }
  }
}
</script>

<style>
/* Flip card design */
.flip-card {
  background-color: transparent;
  width: 300px;
  height: 300px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flip-card-inner.is-flipped {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  text-align: center;
  align-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  color: black;
}

.flip-card-back {
  color: black;
  transform: rotateY(180deg);
}
</style>