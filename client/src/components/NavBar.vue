<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom border-gray" :class="{ 'fixed-top' : $route.name =='inicio' }" id="header">

    <h1 class="logo pl-2"><a href="/">Clientes</a></h1>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="icofont-navigation-menu"></span>
    </button>

    <div class="collapse navbar-collapse ml-auto text-right pr-2" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" :class="{ active: $route.name =='inicio' }">
          <a class="nav-link" href="/">Inicio</a>
        </li>
        <li class="nav-item" :class="{ active: $route.name =='promotores'}">
          <a class="nav-link" href="/promotores">Promotores</a>
        </li>
        <li class="nav-item" :class="{ active: $route.name =='evaluacion'}">
          <a class="nav-link" href="/evaluacion">Evaluación</a>
        </li>
      </ul>
    </div>

</nav>
</template>

<script>

export default {
  name: 'NavBar',
}
</script>

