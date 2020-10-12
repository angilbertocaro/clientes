<template>
    <div id="hero">
      <div id="heroCarousel" class="carousel slide carousel-fade" data-ride="carousel">
        <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>
        <div class="carousel-inner" role="listbox">

          <!-- Slide 1 -->
          <div class="carousel-item active" style="background-image: url(./img/background-1.jpg)">
            <div class="carousel-container">
              <div class="container">
                <h2 class="animate__animated animate__fadeInDown">Bienvenido!</h2>
                <p class="animate__animated animate__fadeInUp">Este es su nuevo Sistema de seguimiento y evaluación de Prospectos, donde podra registrar y controlar de forma eficiente la informacion y evaluación de sus futuros clientes.  
                  </p>            
                </div>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="carousel-item" style="background-image: url(./img/background-2.jpg)">
            <div class="carousel-container">
              <div class="container">
                <h2 class="animate__animated animate__fadeInDown">Guarde todo lo necesario</h2>
                <p class="animate__animated animate__fadeInUp">Usted podrá mantener de segura toda la información relevante de sus prospectos. Tendrá la oportunidad de capturar todos los documentos que se necesiten para formar parte del expediente de sus futuros clientes, y podra consultarlo cuando lo deseé.</p>
              </div>
            </div>
          </div>

          <!-- Slide 3 -->
          <div class="carousel-item" style="background-image: url(./img/background-3.jpg)">
            <div class="carousel-container">
              <div class="container">
                <h2 class="animate__animated animate__fadeInDown">Evaluación y Seguimiento</h2>
                <p class="animate__animated animate__fadeInUp">Como parte del departamento de evaluación de prospectos tendrá acceso a toda la información y expedientes capturados por los promotores, podra evaluar a los prospectos para su respectiva Autorización, y podrá guardar sus observaciones en caso de rechazo.</p>
              </div>
            </div>
          </div>

        </div>

        <a class="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon icofont-simple-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>

        <a class="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon icofont-simple-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>