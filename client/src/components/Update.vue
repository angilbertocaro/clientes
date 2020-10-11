<template>
    <div class="row">
        <!-- Read -->
        <div class="mt-5 col-12 p-0 mb-5 px-3">

            <div class="row border-bottom-0 modal-header p-1 px-3 bg-dark text-white">
                <h4 class="modal-title align-self-center font-weight-bold">Evaluación del Prospecto</h4>
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
                            <span v-if="estatus == 1" class="col-12 pl-0 pr-4 text-justify">Enviado al área de evaluación de prospectos para su revisión.</span>
                            <span v-else-if="estatus == 2" class="col-12 pl-0 pr-4 text-justify">El área de evaluación ha autorizado este prospecto.</span>
                            <span v-else-if="estatus == 3" class="col-12 pl-0 pr-4 text-justify">{{ comentarios }}</span>
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
                <button @click="autorizar()" type="button" class="btn btn-success">Autorizar</button>
                <button @click="comentarios=''" data-toggle="modal" data-target="#ModalRechazar" type="button" class="btn btn-danger">Rechazar</button>
                <button @click="toggleModal(0)" type="button" class="btn btn-secondary">Cerrar</button>
            </div>

        </div>

        <div class="modal fade" id="ModalRechazar" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title font-weight-bold" id="exampleModalLabel">Rechazar Prospecto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="form-group">
                        <h6 class="modal-title mb-3 text-justify px-3" id="exampleModalLabel">Para Autorizar el rechazo es necesario que escriba las observaciones pertinentes:</h6>
                        <textarea v-model="comentarios" class="form-control" id="message-text" style="height: 200px;"></textarea>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button @click="rechazar()" type="button" class="btn btn-danger">Rechazar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
var axios = require("axios");

export default {
    props: {
        client: Object
    },
    data() {
        return {
            // data
            cliente: Object,

            id: '',
            id_persona: '',
            id_direccion: '',
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
            me.id = me.cliente.id;
            me.id_persona = me.cliente.id_persona;
            me.id_direccion = me.cliente.id_direccion;

            if(me.cliente.comentarios == null){
                me.comentarios = "Sin Comentarios.";
            }else{
                me.comentarios = me.cliente.comentarios;
            }
        },
        autorizar() {
            let me = this;

            Swal.fire({
                title: 'Autorización',
                text: "Estás seguro que deseas autorizar al prospecto?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Autorizar',
                cancelButtonText: 'Cancelar'
            })
            .then((result) => {
                if (result.value)
                    me.autorizarCliente();
            });
        },
        rechazar() {
            let me = this;

            Swal.fire({
                title: 'Rechazar Prospecto',
                text: "Estás seguro que deseas rechazar al prospecto?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Rechazar',
                cancelButtonText: 'Cancelar'
            })
            .then((result) => {
                if (result.value)
                    me.rechazarCliente();
            });
        },
        // Change Modal
        toggleModal(modal) {
            let me = this;
            me.$emit("change-modal", modal);
        },
        autorizarCliente() {
            let me = this;

            me.$emit("loading", true);

            const url = me.Url+"/cliente/"+me.id;
            axios.put(url, {
                id_persona : me.id_persona,
                id_direccion : me.id_direccion,
                comentarios : null,
                estatus : 2,
            })
            .then((response) => {
                me.$emit("loading", false);
                console.log(response);
                me.$emit("change-modal", 0);
                Swal.fire({
                    title: 'Prospecto Autorizado!',
                    text: 'El prospecto ha sido autorizado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            })
            .catch((error) => {
                me.$emit("loading", false);
                console.log(`createEmployee Error: ${error}`);
                Swal.fire({
                    title: 'Error!',
                    text: "Ha ocurrido un error, intentelo más tarde o contacte a un administrador.",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
        },
        rechazarCliente() {
            let me = this;

            if(me.comentarios == null || me.comentarios == "" || me.comentarios.trim() === "") {
                Swal.fire({
                    title: 'Ingrese Observaciones',
                    text: "Para poder rechazar al prospecto es necesario contar con observaciones",
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                me.$emit("loading", true);
    
                const url = me.Url+"/cliente/"+me.id;
                axios.put(url, {
                    id_persona : me.id_persona,
                    id_direccion : me.id_direccion,
                    comentarios : me.comentarios,
                    estatus : 3,
                })
                .then((response) => {
                    me.$emit("loading", false);
                    console.log(response);
                    document.querySelector('.close').click();
                    me.$emit("change-modal", 0);
                    Swal.fire({
                        title: 'Prospecto Rechazado!',
                        text: 'El prospecto ha sido rechazado.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    });
                })
                .catch((error) => {
                    me.$emit("loading", false);
                    console.log(`createEmployee Error: ${error}`);
                    Swal.fire({
                        title: 'Error!',
                        text: "Ha ocurrido un error, intentelo más tarde o contacte a un administrador.",
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                });
            }
        },
    },
    computed: {
        Url() {
            return this.$store.state.url;
        }
    },
    async beforeMount() {
        let me = this;
        me.cliente = await me.client;
        me.loadData();
    }
}
</script>