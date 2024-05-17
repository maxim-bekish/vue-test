<template>
   <section>
      <form id="formSort" class="sort">
         <div>
            <label for="selectName">Sort Name</label>
            <input @input="valid(sortName)" v-model="sortName" id="selectName" type="text">
         </div>
         <div>
            <label for="selectStatus">Sort Status</label>
            <select v-model="sortStatus" id="selectStatus">
               <option selected value="alive">alive</option>
               <option value="dead">dead</option>
               <option value="unknown">unknown</option>
            </select>
         </div>
         <button @click="submit" :disabled="isDisabled" type="button">Применить</button>
      </form>
   </section>
</template>


<script>
import { ref } from 'vue';

export default {
   emits: ['update-sort'],
   setup(_, { emit }) {
      let sortStatus = ref('alive');
      let sortName = ref('');
      let isDisabled = ref('false');
      function submit() {
         emit('update-sort', { sortStatus: sortStatus.value, sortName: sortName.value });
      }
      function valid(str) {
      
         if (/^[а-яА-ЯёЁ]+$/.test(str)) {
            isDisabled.value = true
         } else{
            isDisabled.value = false
         }
         console.log(isDisabled)
      }
      return { sortStatus, sortName, submit,isDisabled, valid }
   }
}
</script>
<style scoped>
.sort {
   display: flex;
   justify-content: start;
   align-items: center;
   margin-top: 10px;
   gap: 20px;
}

label {
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 500;
   color: white;
}

input,
select:focus-visible {
   outline: 0;
}

input,
select,
button {
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 500;
   color: black;
   width: 130px;
   margin-left: 10px;
   border: 0;
   border-radius: 4px;
   height: 30px;
}
</style>