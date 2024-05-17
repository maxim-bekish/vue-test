<template>
   <header>
      <section class="header-up">
         <a href="/">
            <img :src="logo" alt="Логотип">
         </a>
         <nav>
            <ul>
               <li>
                  <a target="_blank" href="https://cv-maxim-bekish.vercel.app/">my site</a>
               </li>
               <li>
                  <a target="_blank" href="https://detmir.vercel.app/"> дет мир(react)</a>
               </li>
               <li>
                  <a target="_blank" href="https://rickandmortyapi.com/"> Источник Api</a>
               </li>
            </ul>
         </nav>
      </section>
      <div class="header-down">
         <h1>The Rick and Morty</h1>
         <div>
            <img :src="background" alt="Логотип">
         </div>
      </div>
   </header>
</template>

<script setup>

import logo from './../public/assets/logo.svg'
import background from './../public/assets/background.svg'

</script>

<style scoped>
h1 {
   font-family: sans-serif;
   font-weight: 900;
   white-space: nowrap;
   font-size: 114px;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   position: absolute;
}

.header-up {
   padding: 20px;
   display: flex;
   align-items: center;
   justify-content: space-between;
}

.header-down {
   position: relative;
}

.header-down div {
   display: flex;
   opacity: .1;
   justify-content: center;
}

.header-up li a {
   text-decoration: none;
   color: black;
   font-family: cursive;
   font-size: 22px;
   font-weight: 500;
}

.header-up li a:active {
   color: black;
}

.header-up li a:hover {
   opacity: .6;
}

nav ul {
   width: 400px;
   display: flex;
   align-items: center;
   justify-content: space-between;
}
</style>