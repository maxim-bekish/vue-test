<template>
   <main class="container">
      <Sort />
      <Pagination v-if="characters.results.length" :characters="characters" :loadPreviousPage="loadPreviousPage"
         :loadNextPage='loadNextPage' :displayedPagination="displayedPagination" />
      <Cards v-if="characters.results.length" :characters="characters.results" />
   </main>

</template>

<script setup>
import Pagination from './Pagination.vue'
import Sort from './Sort.vue'
import Cards from './Cards.vue'
import { reactive, ref, computed, watch, onUpdated } from 'vue'
import { useRoute, useRouter } from 'vue-router';
const maxDisplayed = 5; // Максимальное количество отображаемых страниц
const router = useRouter()
const route = useRoute();
watch(route, () => {
   handleSortUpdate({
      sortStatus: route.query.sortStatus,
      sortName: route.query.sortName,
      sort: route.query.sort
   }, {
      page: Number(route.params.page),
      sort: JSON.parse(route.params.sort)
   });

});
components: {
   Pagination, Sort, Cards
}
const characters = reactive({
   stepsPagination: [],
   results: [],
   info: {},
   currentPage: 1,
   error: {
      status: false,
      message: ''
   },
});
async function fetchCharacters(url, name = "") {
   characters.currentPage = Number(route.params.page)
   try {
      const response = await fetch(url);
      const data = await response.json();
      characters.error.status = data.error ? true : false;
      characters.error.message = data.error || '';
      if (!characters.error.status) {
         characters.results = data.results;
         characters.info = data.info;
         characters.stepsPagination = [];
      }
      for (let i = 1; i <= data.info.pages; i++) {
         characters.stepsPagination.push(i);
      }
      return data;
   } catch (error) {
      console.error('Ошибочка: ' + characters.error.message);
      alert(`Ошибочка: "${characters.error.message}." \nКрч, нет таких имен "${name}", попробуй дрогое имя`)
   }
}
//fetchCharacters(`https://rickandmortyapi.com/api/character?page=${route.params.page}`)
handleSortUpdate({
      sortStatus: route.query.sortStatus,
      sortName: route.query.sortName,
      sort: route.query.sort
   }, {
      page: Number(route.params.page),
      sort: JSON.parse(route.params.sort)
   })
const displayedPagination = computed(() => {
   let startPage = Math.max(characters.currentPage - Math.floor(maxDisplayed / 2), 1);
   let endPage = Math.min(startPage + maxDisplayed - 1, characters.info.pages);
   if (endPage - startPage + 1 < maxDisplayed) {
      startPage = Math.max(endPage - maxDisplayed + 1, 1);
   }
   return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});
function loadNextPage() {
   //if (characters.info.next != null) {
   //   characters.currentPage += 1
   //   const newCharacters = await fetchCharacters(characters.info.next);
   //   characters.results = newCharacters.results;
   //   characters.info = newCharacters.info;
   //}
   if (characters.currentPage === characters.info.pages) return characters.info.pages
   characters.currentPage += 1
   router.push({ path: `/page/${characters.currentPage}` })

}
function loadPreviousPage() {
   //if (characters.info.prev != null) {
   //   characters.currentPage -= 1
   //   const newCharacters = await fetchCharacters(characters.info.prev);
   //   characters.results = newCharacters.results;
   //   characters.info = newCharacters.info;
   //}
   if (characters.currentPage === 1) return 1
   characters.currentPage -= 1
   router.push({ path: `/page/${characters.currentPage}` })
}
async function handleSortUpdate(query, params) {
   console.log(params)
   let URL = `https://rickandmortyapi.com/api/character?page=${params.page}`
   let URL_SORT = `https://rickandmortyapi.com/api/character/?page=${params.page}&name=${query.sortName}&status=${query.sortStatus}`
   const newCharacters = await fetchCharacters(params.sort ? URL_SORT : URL, query.sortName
   );
   if (!characters.error.status) {
      characters.results = newCharacters.results;
      characters.info = newCharacters.info;
   }
}
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