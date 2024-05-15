<template>
   <Header />
   <Main />
   <Footer />

</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import Main from './Main.vue'
export default {
   components: {
      Header, Footer, Main
   },
}

</script>

<style>
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

a {
   text-decoration: none;
}

a:hover {
   opacity: 0.8;
}
li {
   list-style: none;
}
.mb-5 {
   margin-bottom: 5px;
}

.container {
   max-width: 1920px;
   padding: 0 20px;
   width: 100%;
   margin: 0 auto;
}
</style>