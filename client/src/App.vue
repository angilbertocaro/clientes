<template>
  <div>

    <div v-if="loading" class="modal-back">
        <div class="container pl-2" style="margin: 0;
                                    position: fixed;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50px, -50%);">
            <div class="lds-roller col-12 col-sm-12">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                <p class="text-white font-weight-bold text-center pl-2 mt-5 pt-5">Espere</p>
            </div>
        </div>
    </div>

    <NavBar></NavBar>
   
    <router-view @loadingBar="loadingBar" />
    
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      loading : false,
    }
  },
  methods: {
    loadingBar(value) {
        let me = this;
        me.loading = value;
    },
  }
}
</script>

