<template>

   <footer>
      <div class="container footer ">
         <h2>
            Мои контакты
         </h2>
         <ul class="text">
            <li>
               <span>Почта: </span>
               <a target="blanc" href="mailto:maxamax997@gmail.com">maxamax997@gmail.com</a>
            </li>
            <li>
               <span>Телеграм: </span>
               <a target="blanc" href="https://t.me/maxa_max">@maxa_max</a>
            </li>
         </ul>
      </div>
   </footer>
</template>

<script setup>

</script>

<style scoped>
.footer {
   padding-bottom: 50px;
   gap: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
}

footer {
   padding-top: 15px;
   border-top: 10px dotted rgba(255, 255, 255, 0.2);
   background-color: rgb(39, 43, 51);

}

.text li span,
.text li a {
   text-decoration: none;
   font-family: cursive;
   font-size: 22px;
   color: white;
   font-weight: 500;
}

h2 {
   font-size: 30px;
   font-family: sans-serif;
   color: white;
}

.text li a {
   opacity: .7;
}

.text li a:hover {
   color: gray;
}
</style>