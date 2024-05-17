<template>
   <div class="background">
      <main class="container">
         <div v-if="error">Error: {{ error.message }}</div>
         <div style="color: brown;" v-if="isLoading">Loading...</div>
         <Sort />
         <Pagination v-if="characters.results.length" :characters="characters" />
         <Cards v-if="characters.results.length" :characters="characters.results" />
         <Pagination v-if="characters.results.length" :characters="characters" />
      </main>
   </div>
</template>

<script setup>
import Pagination from './Pagination.vue'
import Sort from './Sort.vue'
import Cards from './Cards.vue'
import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { URL_DEFAULT } from './constants'
import { useQuery } from '@tanstack/vue-query';

const router = useRouter()
const route = useRoute();

const characters = reactive({
   stepsPagination: [],
   results: [],
   info: {},
   currentPage: 1,
});
const { data, isLoading, error, refetch } = useQuery({
   queryKey: ['characters', route.query.sortStatus, route.query.sortName, route.params.page],
   queryFn: () => fetchCharacters(`${URL_DEFAULT}?page=${route.params.page}${route.query.sortName ? `&name=${route.query.sortName}` : ''}${route.query.sortStatus ? `&status=${route.query.sortStatus}` : ''}`),
});

watch(route, () => {
   refetch()

});
watch(data, () => {
   const content = data.value;
   if (!content.error) {
      characters.results = content.results || [];
      characters.info = content.info || {};
      characters.stepsPagination = [];
      if (content.info && content.info.pages) {
         for (let i = 1; i <= content.info.pages; i++) {
            characters.stepsPagination.push(i);
         }

      }
   } else {
      alert('Не коректное имя')
      router.push({
         path: `/`,
         query: {}
      })
   }
});
async function fetchCharacters(url) {
   characters.currentPage = Number(route.params.page)
   try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
   } catch (error) {
      console.log(error)
   }
}
</script>

<style scoped>
main {
   display: flex;
   gap: 20px;
   flex-direction: column;

}

.background {
   padding: 20px 0;
   background-color: rgb(39, 43, 51);
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