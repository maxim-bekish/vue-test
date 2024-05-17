<template>
   <section>
      <form id="formSort" class="sort">
         <div>
            <label for="selectName">Sort Name</label>
            <input @input="valid(sortName)" v-model="www.sortName" id="selectName" type="text">
         </div>
         <div>
            <label for="selectStatus">Sort Status</label>
            <select v-model="www.sortStatus" id="selectStatus">
               <option selected value="alive">alive</option>
               <option value="dead">dead</option>
               <option value="unknown">unknown</option>
            </select>
         </div>

         <button @click="submit" :disabled="www.isDisabled" type="button">
            Применить
         </button>
         <button @click="reset" :disabled="www.isDisabled" type="button">
            Сброс
         </button>
      </form>
   </section>
</template>


<script setup>
import { reactive, ref, computed, watch, onUpdated } from 'vue'
import { useRoute, useRouter } from 'vue-router';
//const emit = defineEmits(['update-sort']);
const www = reactive({
   sortStatus: 'alive',
   sortName: 'rick',
   isDisabled: false,
});
const router = useRouter()
function submit() {
   //emit('update-sort', { sortStatus: www.sortStatus, sortName: www.sortName });
   router.push({
      path: `/page/${true}/1`,
      query: {
         sortStatus: www.sortStatus,
         sortName: www.sortName
      }
   })

}
function reset() {
   router.push({ path: `/page/${false}/1` })
}
function valid(str) {

   if (/^[а-яА-ЯёЁ]+$/.test(str)) {
      www.isDisabled = true
   } else {
      www.isDisabled = false
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