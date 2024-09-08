<script>
import axios from 'axios'
import moment from 'moment'
import Modal from "../components/Modal.vue"
import ModalEdit from '../components/ModalEdit.vue'
import ModalEliminar from '../components/ModalEliminar.vue'
import { useRoute, useRouter } from 'vue-router'

export default {
    components:{
      Modal,
      ModalEdit,
      ModalEliminar
    },
    data() {
      return {
        fields: ['titulo', 'descripcion', 'vencimiento', 'estado', 'userId', 'delete'],
        id: "",
        titulo: "",
        descripcion: "",
        vencimiento: "",
        estado: "",
        userId: "",
        delete: "",
        listardatos: [],
        moment: moment,
      }
      },
      mounted() {
      axios.get('https://66c60dea134eb8f434969be4.mockapi.io/api/v1/tareas')
      .then(response => {
        //como unicamente hago un borrado lógico quiero que solamente me liste las tareas que no fueron eliminadas
        for (var i=0; i< response.data.length; i++){
          if(!response.data[i].delete){
            this.listardatos.push(response.data[i])
          }
        }

        console.log(this.listardatos);

      })
      .catch(function (error){

        console.log(error)

      })
      .finally(function(){

      });
    },

    filters: {
      fechaFormateada(fecha){
        return moment(fecha.toString()).format('L')
      }
    },

    methods:{
      logout(){
        this.$router.push('/')
      },
      editar(id){
        this.$refs.modalEdit.editar(id)

      },
      mostrar(id){
        this.$refs.modalEliminar.mostrar(id)
      },
      tareas(){
        this.$router.push('/tareas')
      },
      recargar(){
        this.listardatos = []
        axios.get('https://66c60dea134eb8f434969be4.mockapi.io/api/v1/tareas')
      .then(response => {
        //como unicamente hago un borrado lógico quiero que solamente me liste las tareas que no fueron eliminadas
        for (var i=0; i< response.data.length; i++){
          if(!response.data[i].delete){
            this.listardatos.push(response.data[i])
          }
        }

        console.log(this.listardatos);

      })
      .catch(function (error){

        console.log(error)

      })
      .finally(function(){

      });
      }
    },

    }
</script>

<template> 

    <modal-edit ref="modalEdit"></modal-edit>
    <modal-eliminar ref="modalEliminar"></modal-eliminar>
    <div class="container mt-3 card shadow">     
    <div class="card shadow" :items="listardatos" :fields="fields">
      <div class="card-header">
        <Modal/>
        <button class="btn btn-danger bi bi-power m-1 shadow" @click="logout"> Salir</button> 
        <button class="btn btn-info m-1 bi-arrow-repeat shadow" @click="recargar"> </button>
      </div>
      <h2 class="bi bi-card-checklist"> Lista de tareas</h2> 
      <div class="card-body row">
        <div class="col-md-4" v-for="(dato, index) in listardatos" :key="index">
          <div class="card text-center mt-2 mb-2 shadow" v-bind:class="dato.estado? 'text-white bg-secondary' : 'text-white bg-danger'">
              <h4>{{dato.titulo}}</h4>
              <div>Descripción: {{dato.descripcion}}</div>
              <div>Vencimiento: {{moment(dato.vencimiento).format('DD/MM/YYYY')}}</div>
              <div>Terminada? : <span v-if="dato.estado">Si</span><span v-else>No</span> <!--<input type="checkbox" v-model="dato.estado">--></div>
              <div class="">
                <button class="btn btn-light border shadow bi-pencil m-1" data-bs-toggle="modal" data-bs-target="#myModalEdit" @click="editar(dato.id)"></button> 
                <button class="btn btn-light border shadow bi-trash m-1" data-bs-toggle="modal" data-bs-target="#myModalEliminar" @click="mostrar(dato.id)"></button>
                <ModalEdit/>
                <ModalEliminar/>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
