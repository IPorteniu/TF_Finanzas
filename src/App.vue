<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand" style="color: orange">WellnessTrainers.io</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/subscribers" class="nav-link">HOME</a>
        </li>
        <li class="nav-item">
          <a href="/register" class="nav-link">Register</a>
        </li>
      </div>
    </nav>
    <!-- Router View -->
    <div class="container mt-3">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
</style>
