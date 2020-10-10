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

                <div class="col-12 col-sm-12 mb-3">
                    <div class="col pl-1">
                        <i class="material-icons pr-1 float-left">info</i>
                        <h5 class="pb-0 font-weight-bold">Información Personal</h5>
                    </div>
                    
                    <div class="col p-0 mt-2"><hr></div>

                    <div class="row p-0 mt-1">
                         <div class="col-12 col-sm-12 input-field">
                            <input v-model="nombre" id="nombre" type="text">
                            <label class="pl-3" for="nombre">Nombre(s)</label>
                        </div>

                        <div class="col-12 col-sm-6 input-field">
                            <input v-model="apellido_paterno" id="apellido_Paterno" type="text">
                            <label class="pl-3" for="apellido_Paterno">Apellido Paterno</label>
                        </div>

                        <div class="col-12 col-sm-6 input-field">
                            <input v-model="apellido_materno" id="apellido_Materno" type="text">
                            <label class="pl-3" for="apellido_Materno">Apellido Materno</label>
                        </div>

                        <div class="col-12 col-sm-6 input-field">
                            <input v-model="rfc" id="rfc" type="text">
                            <label class="pl-3" for="rfc">RFC</label>
                        </div>

                        <div class="col-12 col-sm-6 input-field">
                            <input v-model="telefono" id="telefono" type="text">
                            <label class="pl-3" for="telefono">Telefono</label>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 col-12 mb-3">
                    <div class="col pl-1">
                        <i class="material-icons pr-1 float-left">place</i>
                        <h5 class="pb-0 font-weight-bold">Dirección</h5>
                    </div>
                    
                    <div class="col p-0 mt-2"><hr></div> 
                      
                    <div class="row p-0 mt-1">
                         <div class="col-12 col-sm-6 input-field">
                            <input v-model="calle" id="calle" type="text">
                            <label class="pl-3" for="calle">Calle</label>
                        </div>

                        <div class="col-12 col-sm-6 input-field">
                            <input v-model="numero" id="numero" type="text">
                            <label class="pl-3" for="numero">Numero</label>
                        </div>

                        <div class="col-12 col-sm-6 input-field">
                            <input v-model="colonia" id="colonia" type="text">
                            <label class="pl-3" for="colonia">Colonia</label>
                        </div>

                        <div class="col-12 col-sm-6 input-field">
                            <input v-model="codigo_postal" id="codigo_postal" type="text">
                            <label class="pl-3" for="codigo_postal">Codigo Postal</label>
                        </div>
                    </div>
                    
                </div>

                <div class="col-12 col-sm-12 mb-3">
                    <div class="col pl-1">
                        <i class="material-icons pr-1 float-left">insert_drive_file</i>
                        <h5 class="pb-0 font-weight-bold">Documentos</h5>
                    </div>
                    
                    <div class="col p-0 mt-2"><hr></div>

                    <VueFileAgent class="mt-4" v-model="fileRecords"
                    :deletable="true"
                    :editable="true"
                    :theme="'list'"
                    :maxSize="'5MB'"
                    :maxFiles="100"
                    :helpText="'Toque para agregar o arrastre dentro'"
                    :errorText="{
                    type: 'Formato de archivo invalido.',
                    size: 'Los archivos no deben exeder los 5 MB',
                    }"
                    @beforedelete="onBeforeDelete($event)"
                    ></VueFileAgent>
                
                </div>

            </div>

            <div class="row border-left border-bottom border-right modal-footer bg-light text-dark">
                <button @click="uploadInfo()" type="button" class="btn btn-danger">Cerrar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
var axios = require("axios");

export default {
    data() {
        return {

            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            telefono: '',
            rfc: '',
            calle: '',
            numero: '',
            colonia: '',
            codigo_postal: '',
            documentos: [],

            fileRecords: [],

        }
    },
    methods: {
        // Change Modal
        toggleModal(modal) {
            let me = this;
            me.$emit("change-modal", modal);
        },
        uploadInfo(){
            let me = this;

            me.documentos = [];

        
            me.fileRecords.forEach( (fileRecord, index) =>{
                const toBase64 = file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
                });

                async function Main() {
                    const file = fileRecord.file;
                    const base64 = await toBase64(file).catch(e => Error(e));
                    if(base64 instanceof Error) {
                        console.log('Error: ', base64.message);
                        return;
                    }
                    const ext = fileRecord.ext;
                    const nombre = fileRecord.name(true);

                    var documento = {
                        "ext" : ext,
                        "base64" : base64.split("base64,")[1],
                        "nombre" : nombre
                    };

                    me.documentos.push(documento);

                    if(index == me.fileRecords.length-1){
                        me.createEmployee();
                    }
                }
                Main();
            });
            

        },
        // Create Employee
        createEmployee() {
            let me = this;
            // me.$validator.validateAll('new').then(valid => {
                // if (valid) {
                    let formData = new FormData();

                    // formData.append("documentos", me.validate(me.Employee_Boss_ID));

                    console.log(formData);

                    const url = "http://192.168.1.72:4000/cliente";
                    axios.post(url, {
                        nombre : me.nombre,
                        primer_apellido : me.apellido_paterno,
                        segundo_apellido : me.apellido_materno,
                        telefono : me.telefono,
                        rfc : me.rfc,
                        calle : me.calle,
                        numero : me.numero,
                        colonia : me.colonia,
                        codigo_postal : me.codigo_postal,
                        documentos : me.documentos,
                    })
                    .then((response) => {
                        console.log(response);
                        // me.toggleModal();
                        Swal.fire({
                            title: 'Empleado Creado!',
                            text: 'El empleado ha sido creado exitosamente.',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                    })
                    .catch((error) => {
                        // me.toggleModal();
                        console.log(`createEmployee Error: ${error}`);
                        Swal.fire({
                            title: 'Error!',
                            text: "Ha ocurrido un error, intentelo más tarde o contacte a un administrador.",
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    });
                // }
                // else {
                //     Swal.fire({
                //         title: 'Información Incorrecta!',
                //         text: "Corrige la información e intenta de nuevo.",
                //         icon: 'warning',
                //         confirmButtonText: 'Aceptar'
                //     });
                // }
            // });
        },
        onBeforeDelete: function (fileRecord) {
            console.log(fileRecord)
            var i = this.fileRecords.indexOf(fileRecord);
            console.log(i)
            if (i !== -1) {
            this.fileRecords.splice(i, 1);
            }
        },
    },
    mounted () {
    },
}
</script>