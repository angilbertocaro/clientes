<template>
    <div class="row">
        <!-- Read -->
        <div class="mt-5 col-12 p-0 mb-5 px-3">

            <div class="row border-bottom-0 modal-header p-1 px-3 bg-dark text-white">
                <h4 class="modal-title align-self-center font-weight-bold">Prospecto</h4>
                <a @click="toggleModal(0)" class="btn btn-danger" style="margin: 5px 5px">
                    <i class="icofont-close left"></i>
                </a>
            </div>
            <div class="row px-0 border-right border-left modal-body bg-light text-dark">

                <div class="col-12 col-sm-6 mb-3">
                    <div class="col pl-1">
                        <i class="material-icons pr-1 float-left">info</i>
                        <h5 class="pb-0 font-weight-bold">Información Personal</h5>
                    </div>
                    
                    <div class="col p-0 mt-2"><hr></div>

                    <div class="col-12 p-0">
                        <div class="row pl-4 mb-2 mt-2">
                            <span class="col p-0 font-weight-bold">Nombre(s):</span>
                            <span class="col p-0 font-weight-bold">Apellido(s):</span>
                            <div class="w-100"></div>
                            <span class="col p-0">{{ nombre }}</span>
                            <span class="col p-0 truncate">{{ apellidos }}</span>
                        </div>

                        <div class="row pl-4 mb-2 mt-2">
                            <span class="col p-0 font-weight-bold">Telefono:</span>
                            <span class="col p-0 font-weight-bold">RFC:</span>
                            <div class="w-100"></div>
                            <span class="col p-0">{{ telefono }}</span>
                            <span class="col p-0 truncate">{{ rfc }}</span>
                        </div>
                    </div>
                
                </div>

                <div class="col-sm-6 col-12 mb-3">
                    <div class="col pl-1">
                        <i class="material-icons pr-1 float-left">place</i>
                        <h5 class="pb-0 font-weight-bold">Dirección</h5>
                    </div>
                    
                    <div class="col p-0 mt-2"><hr></div> 
                      
                    <div class="col-12 p-0">
                        <div class="row pl-4 mb-2 mt-2">
                            <span class="col p-0 font-weight-bold">Calle:</span>
                            <span class="col p-0 font-weight-bold">Número:</span>
                            <div class="w-100"></div>
                            <span class="col p-0">{{ calle }}</span>
                            <span class="col p-0 truncate">{{ numero }}</span>
                        </div>

                        <div class="row pl-4 mb-2 mt-2">
                            <span class="col p-0 font-weight-bold">Colonia:</span>
                            <span class="col p-0 font-weight-bold">Codigo Postal:</span>
                            <div class="w-100"></div>
                            <span class="col p-0">{{ colonia }}</span>
                            <span class="col p-0 truncate">{{ codigo_postal }}</span>
                        </div>

                    </div>
                    
                </div>

                <div class="col-12 col-sm-12 mb-3">
                    <div class="col pl-1">
                        <i class="material-icons pr-1 float-left">assignment_late</i>
                        <h5 class="pb-0 font-weight-bold">Seguimiento</h5>
                    </div>
                    
                    <div class="col p-0 mt-2"><hr></div>

                    <div class="col-12 p-0">
                        <div class="row pl-4 mb-2 mt-2">
                            <span class="col-12 p-0 font-weight-bold">Estatus:</span>
                            <span v-if="estatus == 1" class="col-12 p-0">Enviado</span>
                            <span v-else-if="estatus == 2" class="col-12 p-0">Autorizado</span>
                            <span v-else-if="estatus == 3" class="col-12 p-0">Rechazado</span>
                            <span class="col-12 p-0 mt-2 font-weight-bold">Comentarios:</span>
                            <span class="col-12 pl-0 pr-4 text-justify">{{ comentarios }}</span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-12 mb-1">
                    <div class="col pl-1">
                        <i class="material-icons pr-1 float-left">insert_drive_file</i>
                        <h5 class="pb-0 font-weight-bold">Documentos</h5>
                    </div>
                    
                    <div class="col p-0 mt-2"><hr></div>

                    <div class="row px-4 pt-3">
                        <FileIcon class="col-12 col-sm-12"  :fileData="client.documentos"></FileIcon>
                    </div>
                
                </div>

            </div>

            <div class="row border-left border-bottom border-right modal-footer bg-light text-dark">
                <button @click="toggleModal(0)" type="button" class="btn btn-danger">Cerrar</button>
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
            cliente: Object,

            nombre: '',
            apellidos: '',
            telefono: '',
            rfc: '',
            calle: '',
            numero: '',
            colonia: '',
            codigo_postal: '',
            estatus: 0,
            comentarios: '',

        }
    },
    methods: {
        loadData(){
            let me = this;

            me.nombre = me.cliente.nombre;
            me.apellidos = me.cliente.primer_apellido+" "+me.cliente.segundo_apellido;
            me.telefono = me.cliente.telefono;
            me.rfc = me.cliente.rfc;
            me.calle = me.cliente.calle;
            me.numero = me.cliente.numero;
            me.colonia = me.cliente.colonia;
            me.codigo_postal = me.cliente.codigo_postal;
            me.estatus = me.cliente.estatus;

            if(me.cliente.comentarios == null){
                if(me.cliente.estatus == 1){
                    me.comentarios = "Enviado al área de evaluación de prospectos para su revisión.";
                } else if(me.cliente.estatus == 2){
                    me.comentarios = "El área de evaluación ha autorizado este prospecto.";
                } else {
                     me.comentarios = "Sin Comentarios.";
                }
            }else{
                me.comentarios = me.cliente.comentarios;
            }
        },
        // Change Modal
        toggleModal(modal) {
            let me = this;
            me.$emit("change-modal", modal);
        },
    },
    async beforeMount() {
        let me = this;
        me.cliente = await me.client;
        me.loadData();
    }
}
</script>