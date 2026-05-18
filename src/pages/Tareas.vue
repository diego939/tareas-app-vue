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
      const usuario = localStorage.getItem('usuario')

      if(!usuario){

        this.$router.push('/')

        return
      }
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
        localStorage.removeItem('usuario')

        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada'
        })

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

  <div class="tasks-page">

    <div class="tasks-container">

      <!-- HEADER -->

      <div class="topbar">

        <div>
          <h1 class="title">
            <i class="bi bi-card-checklist"></i>
            Mis tareas
          </h1>

          <p class="subtitle">
            Organiza y administra tus actividades
          </p>
        </div>

        <div class="actions">

          <Modal />

          <button
            class="btn-action refresh"
            @click="recargar"
          >
            <i class="bi bi-arrow-repeat"></i>
          </button>

          <button
            class="btn-action logout"
            @click="logout"
          >
            <i class="bi bi-power"></i>
            Salir
          </button>

        </div>

      </div>

      <!-- GRID -->

      <div class="tasks-grid">

        <div
          class="task-card"
          v-for="(dato, index) in listardatos"
          :key="index"
        >

          <!-- ESTADO -->

          <div class="task-status">

            <span
              :class="dato.estado ? 'completed' : 'pending'"
            >
              <i
                :class="dato.estado
                ? 'bi bi-check-circle-fill'
                : 'bi bi-clock-fill'"
              ></i>

              {{ dato.estado ? 'Completada' : 'Pendiente' }}
            </span>

          </div>

          <!-- TITULO -->

          <h3 class="task-title">
            {{ dato.titulo }}
          </h3>

          <!-- DESCRIPCION -->

          <p
            class="task-description"
            @click="verTarea(
              dato.titulo,
              dato.descripcion,
              moment(dato.vencimiento).format('DD/MM/YYYY'),
              dato.estado
            )"
          >
            {{ dato.descripcion }}
          </p>

          <!-- FECHA -->

          <div class="task-date">

            <i class="bi bi-calendar-event"></i>

            {{ moment(dato.vencimiento).format('DD/MM/YYYY') }}

          </div>

          <!-- ACTIONS -->

          <div class="task-actions">

            <button
              class="btn-card edit"
              data-bs-toggle="modal"
              data-bs-target="#myModalEdit"
              @click="editar(dato.id)"
            >
              <i class="bi bi-pencil"></i>
            </button>

            <button
              class="btn-card delete"
              data-bs-toggle="modal"
              data-bs-target="#myModalEliminar"
              @click="mostrar(dato.id)"
            >
              <i class="bi bi-trash"></i>
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<style scoped>

.tasks-page{

  min-height: 100vh;

  padding: 40px 20px;

  background:
    linear-gradient(
      135deg,
      #0f172a,
      #111827,
      #1e293b
    );
}

.tasks-container{
  max-width: 1400px;
  margin: auto;
}

/* HEADER */

.topbar{

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 20px;

  margin-bottom: 40px;

  flex-wrap: wrap;
}

.title{

  color: white;

  font-size: 42px;
  font-weight: 700;

  margin-bottom: 8px;
}

.subtitle{

  color: rgba(255,255,255,.65);

  margin: 0;
}

.actions{
  display: flex;
  gap: 12px;
  align-items: center;
}

/* BOTONES */

.btn-action{

  border: none;

  height: 48px;

  padding: 0 18px;

  border-radius: 14px;

  color: white;

  font-weight: 600;

  transition: .3s;

  display: flex;
  align-items: center;
  gap: 8px;
}

.refresh{

  background:
    linear-gradient(
      135deg,
      #06b6d4,
      #0891b2
    );
}

.logout{

  background:
    linear-gradient(
      135deg,
      #ef4444,
      #dc2626
    );
}

.btn-action:hover{

  transform: translateY(-2px);

  box-shadow:
    0 10px 20px rgba(0,0,0,.25);
}

/* GRID */

.tasks-grid{

  display: flex;
  flex-direction: column;

  gap: 20px;
}

/* CARD */

.task-card{

  width: 100%;

  display: flex;

  justify-content: space-between;
  align-items: center;

  gap: 25px;

  padding: 24px;

  border-radius: 22px;

  background:
    linear-gradient(
      135deg,
      rgba(30,41,59,.95),
      rgba(15,23,42,.95)
    );

  border:
    1px solid rgba(255,255,255,.06);

  transition: .3s;

  box-shadow:
    0 8px 25px rgba(0,0,0,.25);
}

.task-card:hover{

  transform: translateY(-3px);

  border-color:
    rgba(59,130,246,.45);

  box-shadow:
    0 15px 35px rgba(0,0,0,.35);
}

/* STATUS */

.task-status{
  margin-bottom: 18px;
}

.task-status span{

  display: inline-flex;

  align-items: center;
  gap: 8px;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 13px;
  font-weight: 600;
}

.completed{

  background:
    rgba(34,197,94,0.15);

  color: #4ade80;
}

.pending{

  background:
    rgba(251,191,36,0.15);

  color: #facc15;
}

/* TITULO */

.task-title{

  color: white;

  font-size: 24px;
  font-weight: 700;

  margin-bottom: 14px;
}

/* DESCRIPCION */

.task-description{

  color:
    rgba(255,255,255,.72);

  line-height: 1.6;

  margin-bottom: 22px;

  cursor: pointer;

  transition: .3s;
}

.task-description:hover{
  color: white;
}

/* FECHA */

.task-date{

  display: flex;
  align-items: center;
  gap: 8px;

  color: #60a5fa;

  font-size: 14px;

  margin-bottom: 22px;
}

/* ACTIONS */

.task-actions{

  display: flex;
  gap: 12px;
}

.btn-card{

  width: 44px;
  height: 44px;

  border: none;

  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  transition: .3s;
}

.edit{

  background:
    linear-gradient(
      135deg,
      #3b82f6,
      #2563eb
    );
}

.delete{

  background:
    linear-gradient(
      135deg,
      #ef4444,
      #dc2626
    );
}

.btn-card:hover{

  transform: scale(1.08);

  box-shadow:
    0 10px 20px rgba(0,0,0,.25);
}

/* MOBILE */

@media(max-width: 768px){

  .title{
    font-size: 32px;
  }

  .topbar{
    align-items: flex-start;
  }

  .actions{
    width: 100%;
    flex-wrap: wrap;
  }

  .btn-action{
    flex: 1;
    justify-content: center;
  }
}

</style>
