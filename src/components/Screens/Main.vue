<template>
  <div class="edit-form container">
    <div class="row">
      <div class="col-sm-6 col-md-6 col-lg-6 shadow" style="cursor: pointer;" onclick="window.location='/customer';">
        <h4 class="differ1">Soy Cliente</h4>
        <img class="image" src="../../assets/consumidor.jpg">
      </div>
      <div class="col-sm-6 col-md-6 col-lg-6 shadow" style="cursor: pointer;" onclick="window.location='/owner';">
        <h4 class="differ2">Soy Dueño de empresa</h4>
        <img class="image" src="../../assets/tienda.jpg">
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 100%;
  margin: auto;
}
.shadow {
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 20px 6px -6px #999;
    z-index: 10;
    height: 330px;
    width: 250px;
    background:white;
    margin-top: 20px;
    margin-left: 380px;

    padding: 10px;
}
.image{
    margin-left: 80px;
    height: 240px;
    width: 400px;
}
.differ1{
    margin-left: 210px;
    margin-top: 10px;
}
.differ2{
    margin-left: 145px;
    margin-top: 10px;
}
</style>
