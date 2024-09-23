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
      },

      verTarea(titulo,descripcion,vencimiento,estado){

        if(estado){
          var resultado = 'Si ✔️'
        }else{
          var resultado = 'No ❌'
        }
        Swal.fire({
                  icon: 'question',
                  iconHtml: '<i class="bi bi-card-checklist"></i>',
                  html:`<div class="card border-1" style="background-color: bisque;">
                      <div class="card-body">
                        <p class="fw-bold text-white h2 bg-dark rounded p-1">`+titulo+`</p>
                        <p class=""> Descripción:<span class="text-secondary"> `+descripcion+`</span></p>
                        <p class="bi-calendar"> Vencimiento:<span class="text-secondary"> `+vencimiento+`</span></p>
                        <p class=""> Terminada?:<span class="text-secondary"> `+resultado+`</span></p>
                      </div>
                    </div>`,
                });
      }
    },

    }
</script>

<template> 

    <modal-edit ref="modalEdit"></modal-edit>
    <modal-eliminar ref="modalEliminar"></modal-eliminar>
    <div class="container mt-3 card shadow" style="background-color: azure;">     
    <div class="card shadow" :items="listardatos" :fields="fields">
      <div class="card-header">
        <Modal/>
        <button class="btn btn-danger bi bi-power m-1 shadow" @click="logout"> Salir</button> 
        <button class="btn btn-info m-1 bi-arrow-repeat shadow" @click="recargar"> </button>
      </div>
      <h2 class="bi bi-card-checklist"> Lista de tareas</h2> 
      <div class="card-body row">
        <div class="col-md-4 mt-2 mb-2" v-for="(dato, index) in listardatos" :key="index">
          <div class="card text-center shadow" style="background-color: bisque;">
              <h4 class="border border-warning p-2 rounded" style="background-color: burlywood;">{{dato.titulo}}</h4>
              <div><span class="fw-bold" style="object-fit: cover;">Descripción: </span><span @click="verTarea(dato.titulo,dato.descripcion,moment(dato.vencimiento).format('DD/MM/YYYY'),dato.estado)" :title="dato.descripcion" class="text-success" style="cursor: pointer;">{{dato.descripcion.slice(0, 10)}} <span> 👁️</span></span></div>
              <div class="fw-bold">Vencimiento: <span class="text-primary">"{{moment(dato.vencimiento).format('DD/MM/YYYY')}}"</span></div>
              <div class="m-1">Terminada? : <span style="cursor: pointer;" v-bind:class="dato.estado? 'bg-success badge rounded-pill text-white bi-check-square' : 'bg-danger badge rounded-pill text-white bi-exclamation-triangle'"><span v-if="dato.estado" title="Tarea Completa"> Si</span><span v-else title="Esta tarea falta completar"> No</span> </span></div>
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
