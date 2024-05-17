<template>
   <section class="cards">
      <div v-for="(item, index) in characters" :key="index" class="card">
         <div class="card-img">
            <img :src="item.image" alt="img">
         </div>
         <div class="content">
            <div>
               <h3>
                  <a href="#">{{ item.name }}</a>
               </h3>
               <div class="content-status">
                  <div class="status-life"
                     :class="{ red: item.status === 'Dead', green: item.status === 'Alive', black: item.status === 'unknown' }">
                  </div>
                  <p>{{ item.status }} - {{ item.species }} </p>
               </div>
            </div>
            <div>
               <span>Last known location:</span>
               <a href="#">{{ item.location.name }}</a>
            </div>
            <div>
               <span>First seen in:</span>
               <a href="#">{{ item.origin.name }}</a>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>

const props = defineProps({
   characters: Object,
})
</script>

<style scoped>
.cards {
   display: flex;
   gap: 20px;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: center;
}

.status-life {
   width: 8px;
   height: 8px;
   margin-right: 4px;
   border-radius: 50%;
}

.content-status {
   display: flex;
   align-items: center;
}

.red {
   background-color: red;
}

.green {
   background-color: green;
}

.black {
   background-color: black;
}

.card {
   height: 220px;
   width: 600px;
   background-color: rgb(60, 62, 68);
   border-radius: 8px;
   display: flex;
   overflow: hidden;
}

.card-img {
   flex: 2 1 0%;
   width: 100%;
}

.card-img img {
   width: 100%;
   height: 100%;
   margin: 0px;
   opacity: 1;
   transition: opacity 0.5s ease 0s;
   object-position: center center;
   object-fit: cover;
}

.content {
   flex: 3 1 0%;
   position: relative;
   padding: 0.75rem;
   color: rgb(255, 255, 255);
   display: flex;
   flex-direction: column;
   justify-content: space-between;
}

h3 a {
   font-size: 1.5rem;
}

.content a {
   color: white;
   font-weight: 500;
   font-family: sans-serif;
}

.content span {
   display: block;
   color: rgb(158, 158, 158);
   font-size: 16px;
   font-weight: 500;
   font-family: sans-serif;
}
</style>