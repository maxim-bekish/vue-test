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
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { maxDisplayed } from './constants'

const route = useRoute();
const router = useRouter()
const props = defineProps({
   characters: Object,
})

const displayedPagination = computed(() => {
   let startPage = Math.max(props.characters.currentPage - Math.floor(maxDisplayed / 2), 1);
   let endPage = Math.min(startPage + maxDisplayed - 1, props.characters.info.pages);
   if (endPage - startPage + 1 < maxDisplayed) {
      startPage = Math.max(endPage - maxDisplayed + 1, 1);
   }
   return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
})
function handlePageNavigation(event) {
   switch (event) {
      case "Prev":
         if (props.characters.currentPage === 1) return 1
         props.characters.currentPage -= 1
         break;
      case "Next":
         if (props.characters.currentPage === props.characters.info.pages) return props.characters.info.pages
         props.characters.currentPage += 1
         break;
   }
   router.push({
      path: `/page/${route.params.sort}/${props.characters.currentPage}`,
      query: route.query
   })
}
</script>

<style scoped>
.pagination {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 35px;

}

.pagination ul {
   gap: 5px;
   padding: 0 20px;
   display: flex;
   height: 100%;
}

.pagination button a {
   color: white;
}

.pagination button {
   height: 100%;
   border-radius: 5px;
   border: 0;
   outline: 0;
   padding: 0 10px;
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
   height: 100%;
   display: flex;
   align-items: center;
   padding: 0 10px;
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