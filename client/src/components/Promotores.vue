<template>
  <div id="console">
    <div class="container">
      <div v-if="modal == 0" class="col-12">
        <div class="row">
          <div class="col-12 mt-5 px-1">
              <h4 class="float-left m-0">
                  <i class="icofont-contacts icon-1x align-middle"></i>
                  Listado de Prospectos
              </h4>
              <a @click="setModal(1, cliente)" class="float-right btn btn-outline-dark">
                  <i  class="icofont-contact-add icon-1x align-middle"></i>
                  <span class="pl-2">Agregar</span>
              </a>
          </div>

          <hr class="col mt-2 text-dark"/>

          <div class="table-responsive">
            <table class="table table-striped mt-2 col-12">
              <thead class="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Nombre(s)</th>
                  <th>Apellido Paterno</th>
                  <th>Apellido Materno</th>
                  <th>Estatus</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cliente, index) in arrayClientes" :key="index">
                    <th>{{ cliente.id }}</th>
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.primer_apellido }}</td>
                    <td>{{ cliente.segundo_apellido }}</td>
                    <td>
                        <span v-if="cliente.estatus == 1" >Enviado</span>
                        <span v-else-if="cliente.estatus == 2" >Autorizado</span>
                        <span v-else >Rechazado</span>
                    </td>
                    <td>
                        <div >
                            <a @click="setModal(2, cliente)"><i class="material-icons btn btn-outline-info">remove_red_eye</i></a>
                        </div>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="pagination.total" class="col-12 d-flex">
              <ul class="pagination mx-auto">
                <li class="page-item" :class="{ disabled: pagination.current_page <= 1 }">
                  <a href class="page-link" :class="{ disabled: pagination.current_page <= 1 }" @click.prevent="changePage(pagination.current_page - 1)">
                      <i class="icofont-rounded-left"></i>
                  </a>
                </li>

                <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActive ? 'active' : '']">
                      <a href class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
                </li>

                <li class="page-item" :class="{ disabled: pagination.current_page >= pagination.last_page }">
                  <a href class="page-link" :class="{ disabled: pagination.current_page >= pagination.last_page }" @click.prevent="changePage(pagination.current_page + 1)">
                      <i class="icofont-rounded-right"></i>
                  </a>
                </li>
              </ul>
          </div>

        </div>
      </div>

      <div v-if="modal == 1">
        <Create @change-modal="toggleModal"></Create>
      </div>

      <div v-if="modal == 2">
        <Read :client="cliente" @change-modal="toggleModal"></Read>
      </div>
      
    </div>
  </div>
</template>

<script>
var axios = require("axios");

export default {
  name: 'Promotores',
  data(){
    return {

      // Informacion del cliente
      id: '',
      estatus: '',
      comentarios: "",

      // Informacion personal
      id_persona: '',
      nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      telefono: "",
      rfc: "",

      // Direccion 
      id_direccion: '',
      calle: "",
      numero: "",
      colonia: "",
      codigo_postal: "",

      // Informacion de los documentos
      documentos: [],

      // Datos
      cliente: null,
      arrayClientes: [],
      arrayDocumentos: [],

      // Pagination
      pagination: {
          'total': 0, 
          'current_page': 0, 
          'per_page': 0, 
          'last_page': 0, 
          'from': 0,
          'to': 0
      },
      offset:3,

      // Control
      modal: 0,

    }
  },
  methods: {
    loadCustomers(page) {
      let me = this;

      var url = "/clientes?page=" + page +"&limit=6";
      axios.get(url).then((response) => {
          var result = response.data;
          me.arrayClientes = result.clientes;
          me.pagination = result.pagination;
      })
      .catch((error) => {
          console.log(error);
      });

    },
    changePage(page) {
        let me = this;
        me.pagination.current_page = page;
        me.loadCustomers(page);
    },
    toggleModal(modal) {
        let me = this;
        me.loadCustomers(me.pagination.current_page);
        me.modal = modal;
    },
    clearInfo() {
        let me = this;
        me.cliente = null;
    },
    loadInfo(cliente) {
        let me = this;
        me.cliente = cliente;
    },
    setModal(modal, obj) {
        let me = this;
        switch(modal) {
            case 0:  me.clearInfo();                        me.modal = 0;   break; // Index
            case 1:  me.clearInfo();                        me.modal = 1;   break; // Create
            case 2:  me.clearInfo();    me.loadInfo(obj);   me.modal = 2;   break; // Read
            default: me.clearInfo();                        me.modal = 0;   break; // Default(Index)
        }
    },
  },
  beforeMount(){
    let me = this;
    me.loadCustomers(1);
  },
  computed: {
        isActive() {
            return this.pagination.current_page;
        },
        pagesNumber() {
            if (!this.pagination.to)
                return [];
            
            var from = this.pagination.current_page - this.offset; 
            if (from < 1)
                from = 1;

            var to = from + (this.offset * 2); 
            if (to >= this.pagination.last_page)
                to = this.pagination.last_page;

            var pagesArray = [];
            while (from <= to) {
                pagesArray.push(from);
                from++;
            }
            return pagesArray;             
        }
    }
}
</script>
