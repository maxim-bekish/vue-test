<template>
   <main class="container">
      <Sort @update-sort="handleSortUpdate" />
      <Pagination v-if="characters.results.length" :characters="characters" :loadPreviousPage="loadPreviousPage"
         :loadNextPage="loadNextPage" :loadStepPage="loadStepPage" :displayedPagination="displayedPagination" />
      <section v-if="characters.results.length" class="cards">
         <div v-for="(item, index) in characters.results" :key="index" class="card">
            <div class="card-img">
               <img :src="item.image" alt="img">
            </div>
            <div class="content">
               <div class="content-name-status">
                  <h3 class="mb-5">
                     <a href="#">{{ item.name }}</a>
                  </h3>
                  <div class="content-status">
                     <div class="status-life"
                        :class="{ red: item.status === 'Dead', green: item.status === 'Alive', black: item.status === 'unknown' }">
                     </div>
                     <p>{{ item.status }} - {{ item.species }} </p>
                  </div>
               </div>
               <div class="content-last-location">
                  <span class="mb-5">Last known location:</span>
                  <a href="#">{{ item.location.name }}</a>
               </div>
               <div class="content-first-seen">
                  <span class="mb-5">First seen in:</span>
                  <a href="#">{{ item.origin.name }}</a>
               </div>
            </div>
         </div>
      </section>
   </main>
</template>

<script>
import Pagination from './Pagination.vue'
import Sort from './Sort.vue'
import { reactive, computed } from 'vue'

export default {
   components: {
      Pagination, Sort
   },
   setup() {
      const maxDisplayed = 5; // Максимальное количество отображаемых страниц
      const characters = reactive({
         stepsPagination: [],
         results: [],
         info: {},
         currentPage: 1,
      });
      async function fetchCharacters(url) {
         try {
            const response = await fetch(url);
            const data = await response.json();
            characters.results = data.results;
            characters.info = data.info;
            characters.stepsPagination = [];
            for (let i = 1; i <= data.info.pages; i++) {
               characters.stepsPagination.push(i);
            }
            return data;
         } catch (error) {
            throw new Error('Failed to fetch characters');
         }
      }
      fetchCharacters('https://rickandmortyapi.com/api/character')
      const displayedPagination = computed(() => {
         let startPage = Math.max(characters.currentPage - Math.floor(maxDisplayed / 2), 1);
         let endPage = Math.min(startPage + maxDisplayed - 1, characters.info.pages);

         if (endPage - startPage + 1 < maxDisplayed) {
            startPage = Math.max(endPage - maxDisplayed + 1, 1);
         }

         return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
      });
      async function loadNextPage() {
         if (characters.info.next != null) {
            characters.currentPage += 1
            const newCharacters = await fetchCharacters(characters.info.next);
            characters.results = newCharacters.results;
            characters.info = newCharacters.info;
         }
      }
      async function loadPreviousPage() {
         if (characters.info.prev != null) {
            characters.currentPage -= 1
            const newCharacters = await fetchCharacters(characters.info.prev);
            characters.results = newCharacters.results;
            characters.info = newCharacters.info;
         }
      }
      async function loadStepPage(page) {
         characters.currentPage = page;
         const newCharacters = await fetchCharacters(`https://rickandmortyapi.com/api/character?page=${page}`);
         characters.results = newCharacters.results;
         characters.info = newCharacters.info;
      }
      async function handleSortUpdate(sortData) {
         console.log(sortData);
         const newCharacters = await fetchCharacters(
            `https://rickandmortyapi.com/api/character/?page=1&name=${sortData.sortName}&status=${sortData.sortStatus}`
         );
         characters.results = newCharacters.results;
         characters.info = newCharacters.info;
      }
      return {
         handleSortUpdate,
         characters,
         loadNextPage,
         loadPreviousPage,
         loadStepPage,
         displayedPagination
      };
   },
};

</script>

<style scoped>
main {
   padding: 20px 0;
   background-color: rgb(39, 43, 51);
}

.cards {
   margin: 30px 0;
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