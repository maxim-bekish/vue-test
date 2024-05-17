<template>
   <section v-if="characters.results.length" class="pagination">
      <button @click="handlePageNavigation('Prev')" type="button"> prev </button>
      <ul>
         <li v-for="page in displayedPagination" :key="page" v-if="characters.stepsPagination.length"
            :class="{ 'active-paging': page === characters.currentPage }">
            <RouterLink :to="{
               path: `/page/${route.params.sort}/${page}`,
               query: {
                  sortStatus: route.query.sortStatus,
                  sortName: route.query.sortName
               }
            }">
               {{ page }}
            </RouterLink>
         </li>
      </ul>
      <button @click="handlePageNavigation('Next')" type="button"> next </button>
   </section>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineProps } from 'vue'
const route = useRoute();
const props = defineProps({
   characters: Object,
   handlePageNavigation: Function,
   displayedPagination: Array
})
</script>

<style scoped>
.pagination {
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top: 10px;
}

.pagination ul {
   gap: 5px;
   padding: 0 10px;
   display: flex;
}

.pagination button a {
   color: white;
}

.pagination button {
   border-radius: 5px;
   border: 0;
   outline: 0;
   padding: 5px 10px;
   background-color: #6e6e6e;
   color: white;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 500;
}

.pagination ul li {
   cursor: pointer;
   border-radius: 5px;
   border: 1px solid white;

}

.pagination ul li a {
   padding: 5px 10px;
   color: white;
   font-size: 20px;
   font-family: sans-serif;
   line-height: 20px;
}

.pagination ul .active-paging {
   color: rgb(243, 182, 15);
   border: 1px solid rgb(243, 182, 15);
}
</style>