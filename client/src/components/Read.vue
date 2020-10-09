<template>
    <div class="row">

        <!-- Read -->
        <div class="mt-5 col-12 p-0">
  

            <div class="modal-header p-1 px-3 bg-dark text-white">
                <h4 class="modal-title align-self-center">Prospecto</h4>
                <a @click="toggleModal(0)" class="btn btn-danger" style="margin: 5px 5px">
                    <i class="icofont-close left"></i>
                </a>
            </div>
            <div class="row modal-body bg-light text-dark">

                <div class="col-12 col-sm-6 mb-3">
                    <div class="col pl-1">
                        <i class="material-icons pr-1 float-left">info</i>
                        <h5 class="pb-0">Información Personal</h5>
                    </div>
                    
                    <div class="col p-0 mt-2"><hr></div>

                    <div class="col-12 p-0">
                        <div class="row pl-4 mb-2 mt-2">
                            <span class="col p-0">Nombre(s):</span>
                            <span class="col p-0">Apellido(s):</span>
                            <div class="w-100"></div>
                            <span class="col p-0">Angilberto</span>
                            <span class="col p-0 truncate">Caro Zavala</span>
                        </div>

                        <div class="row pl-4 mb-2 mt-2">
                            <span class="col p-0">Telefono:</span>
                            <span class="col p-0">RFC:</span>
                            <div class="w-100"></div>
                            <span class="col p-0">6672674878</span>
                            <span class="col p-0 truncate">CAZA971024GB0</span>
                        </div>
                    </div>
                
                </div>

                <div class="col-sm-6 col-12 mb-3">
                    <div class="col pl-1">
                        <i class="material-icons pr-1 float-left">place</i>
                        <h5 class="pb-0">Dirección</h5>
                    </div>
                    
                    <div class="col p-0 mt-2"><hr></div> 
                      
                    <div class="col-12 p-0">
                        <div class="row pl-4 mb-2 mt-2">
                            <span class="col p-0">Calle:</span>
                            <span class="col p-0">Número:</span>
                            <div class="w-100"></div>
                            <span class="col p-0">Bugambilias</span>
                            <span class="col p-0 truncate">155</span>
                        </div>

                        <div class="row pl-4 mb-2 mt-2">
                            <span class="col p-0">Colonia:</span>
                            <span class="col p-0">Codigo Postal:</span>
                            <div class="w-100"></div>
                            <span class="col p-0">10 de Mayo</span>
                            <span class="col p-0 truncate">80270</span>
                        </div>

                    </div>
                    
                </div>

            </div>
            <div class="modal-footer bg-light text-dark">
                <button @click="toggleModal(0)" type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
            


            
        </div>
    </div>
</template>

<script>

export default {
    props: {
        client: Object
    },
    data() {
        return {
            // data
            cliente: Object
        }
    },
    methods: {
        // Change Modal
        toggleModal(modal) {
            let me = this;
            me.$emit("change-modal", modal);
        },
    },
    async beforeMount() {
        let me = this;
        me.cliente = await me.client;
        console.log(me.cliente);
    }
}
</script>