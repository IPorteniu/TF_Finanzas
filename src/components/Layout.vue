<template>
  <div id="app">
    <div id="bootstrap-overrides">
      <!-- Navigation Bar -->
      <nav class="navbar mynav">
          <div class="logo">
              <h4>Caja Neydita</h4>
          </div>
          <ul class="nav-links">
              <li>
                  <a href="/subscribers">Inicio</a>
              </li>
              <li>
                  <a href="/register">Register</a>
              </li>
              
          </ul>
          <div class="burger" @click="navSlide">
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
          </div>
      </nav> 
      
      <section class="zoom">
        <!-- Router View -->
        <div class="container mt-3">
          <router-view/>
        </div>
      </section>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Layout',
  components: { },
  methods: {
    navSlide() {
    const burger = document.querySelector('.burger');
    console.log(burger);
    const nav = document.querySelector('.nav-links');
    console.log(nav);
    nav.classList.toggle('nav-action');
    burger.classList.toggle('toggle');
}
  }
}

</script>

<style scoped>
*{
    margin: 0px;
    padding: 0px; 
    box-sizing: border-box;
}

body {
    background-color: white;
}

h1 {
    color: white;
    font-size: 100px;
    font-family: 'Cabin', sans-serif;
}

p {
    color: black;
    text-align: justify;
    display: flex;
    width: 90%;
    letter-spacing: 2px;
    font-family: 'Cabin', sans-serif;
    padding: 15px;

}

#bootstrap-overrides nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 8vh;
    font-family: 'Cabin', sans-serif;
    background-color: white;
    position: fixed;
    top: 0;
    width: 100%;
}

#bootstrap-overrides .navbar {
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 8px 6px -6px #999;
    z-index: 1000;
}

#bootstrap-overrides .logo {
    color: black;
    letter-spacing: 3px;
    font-size: 26px;
}

#bootstrap-overrides .nav-links {
    display: flex;
    justify-content: space-around;
    width: 45%;
    margin: 0px;
    padding: 0px; 
    box-sizing: border-box;
}

#bootstrap-overrides .nav-links li {
    list-style: none;
    margin: 0px;
    padding: 0px; 
    box-sizing: border-box;
}

#bootstrap-overrides .nav-links a{
    text-decoration: none;
    color: black;
    /* font-weight: bold; */
    font-size: 18px;
    margin: 0px;
    padding: 0px; 
    box-sizing: border-box;
}

#bootstrap-overrides .burger {
    display: none;
    cursor: pointer;
}

#bootstrap-overrides .burger div{
    width: 20px;
    height: 2px;
    background-color: black;
    margin: 5px;
    transition: all 0.3s ease;
}

.myicons {
    width: 150px;
    height: 150px;
    display: block;
    margin-left: 80px;
    margin-right: auto;
    margin-bottom: 30px;
}

@media screen and (max-width:1024px){
    #bootstrap-overrides .nav-links {
       width: 50%;
   }

}



    body {
        overflow-x: hidden;
    }

    #bootstrap-overrides .nav-links{
        position: absolute;
        right: 0px;
        height: 92vh;
        top: 8vh;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40%;
        transform: translateX(100%);
        transition: transform 0.3s ease-in;
        z-index: 101;
    }

    #bootstrap-overrides .nav-links a {
        color: black;
        opacity: 100%;
    }

    #bootstrap-overrides .burger {
        display: block;
    }

    .zoom #layer1 {
        width: 200%;
        height: auto;
    }

    .zoom #layer2 {
        width: 100%;
        height: auto;
    }

    .myicons {
        width: 150px;
        height: 150px;
        margin-left: 135px;
        margin-right: auto;
        margin-bottom: 30px;
    }


#bootstrap-overrides .nav-action {
    transform: translateX(0%);
}

.toggle .line1{
    transform: rotate(-45deg) translate(-4px, 5px);
}

.toggle .line2{
    opacity: 0%;
}

.toggle .line3{
    transform: rotate(45deg) translate(-5px, -6px);
}

.zoom{
    width: 100%;
    height: 800px;
    position: relative;
    overflow: hidden;
    background: url(assets/my_background.png);
    background-size: cover;
}

</style>