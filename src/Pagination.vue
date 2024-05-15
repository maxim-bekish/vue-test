<template>
   <section v-if="characters.results.length" class="pagination">
      <button @click="loadPreviousPage" type="button"> prev </button>
      <ul>
         <li v-if="characters.stepsPagination.length" @click="loadStepPage(page)" v-for="page in displayedPagination"
            :key="page" :class="{ 'active-paging': page === characters.currentPage }">
            {{ page }}
         </li>
      </ul>
      <button @click="loadNextPage" type="button"> next </button>
   </section>
</template>

<script>
export default {
   props: ['characters', 'loadPreviousPage', 'loadNextPage', 'loadStepPage', 'displayedPagination'],
};

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
   color: white;
   font-size: 20px;
   font-family: sans-serif;
   padding: 5px 10px;
   line-height: 20px;
   border-radius: 5px;
   border: 1px solid white;
}

.pagination ul .active-paging {
   color: rgb(243, 182, 15);
   border: 1px solid rgb(243, 182, 15);
}
</style>