<template>
   <main class="container">
      <section class="sort">
         <form>
            <div>
               <label for="selectName">sort Name</label>
               <select name="" id="selectName">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
               </select>
            </div>
            <div>
               <label for="selectStatus">sort Status</label>
               <select name="" id="selectStatus">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
               </select>
            </div>
         </form>
      </section>
      <section class="cards">
         <div v-for="(item, index) in data.results" :key="index" class="card">
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
      <section class="pagination">
         <button type="button">
            <a :href="data.info.prev">prev</a>
         </button>
         <ul>
            <!--<li v-for="(item, index) in numberOfPages" :key="index"></li>-->
         </ul>
         <button type="button">
            <a :href="data.info.next">next</a>
         </button>
      </section>
   </main>
</template>

<script>
import { useQuery } from '@tanstack/vue-query';

export default {
   setup() {
      const { isPending, isFetching, isError, data, error } = useQuery({
         queryKey: ['todos'],
         queryFn: fetchCharacters,
      });

      async function fetchCharacters() {
         try {
            const response = await fetch('https://rickandmortyapi.com/api/character');
            const data = await response.json();
            
            return data; // Возвращаем только массив с персонажами
         } catch (error) {
            throw new Error('Failed to fetch characters');
         }
      }

      return { isPending, isFetching, isError, data, error };
   },
};

</script>

<style>
main {
   background-color: rgb(39, 43, 51);
}

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