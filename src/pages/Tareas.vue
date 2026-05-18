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

          <div class="task-col title-col">

            <h3 class="task-title">
              {{ dato.titulo }}
            </h3>

          </div>

          <!-- DESCRIPCION -->

          <div class="task-col description-col">

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

          </div>

          <!-- FECHA -->

          <div class="task-col date-col">

            <div class="task-date">

              <i class="bi bi-calendar-event"></i>

              {{ moment(dato.vencimiento).format('DD/MM/YYYY') }}

            </div>

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

:root{
  --bg-1:#0f172a;
  --bg-2:#111827;
  --bg-3:#1e293b;

  --card-1:rgba(30,41,59,.96);
  --card-2:rgba(15,23,42,.96);

  --text:#ffffff;
  --text-soft:rgba(255,255,255,.72);
  --text-muted:rgba(255,255,255,.55);

  --blue:#60a5fa;
}

/* PAGE */

.tasks-page{

  min-height: 100vh;

  padding: 28px 18px;

  background:
    linear-gradient(
      135deg,
      var(--bg-1),
      var(--bg-2),
      var(--bg-3)
    );
}

.tasks-container{

  width: 100%;

  max-width: 1400px;

  margin: auto;
}

/* HEADER */

.topbar{

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 20px;

  flex-wrap: wrap;

  margin-bottom: 30px;
}

.title{

  display: flex;
  align-items: center;
  gap: 12px;

  color: var(--text);

  font-size: clamp(30px, 5vw, 42px);

  font-weight: 800;

  margin: 0 0 6px;
}

.subtitle{

  color: var(--text-muted);

  font-size: 15px;

  margin: 0;
}

/* ACTIONS */

.actions{

  display: flex;
  align-items: center;
  gap: 12px;

  flex-wrap: wrap;
}

/* BUTTONS */

.btn-action{

  border: none;

  height: 46px;

  padding: 0 18px;

  border-radius: 14px;

  color: white;

  font-size: 14px;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;

  transition:
    transform .25s ease,
    box-shadow .25s ease;
}

.btn-action:hover{

  transform: translateY(-2px);

  box-shadow:
    0 12px 24px rgba(0,0,0,.25);
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

/* GRID */

.tasks-grid{

  display: flex;
  flex-direction: column;

  gap: 18px;
}

/* CARD */

.task-card{

  width: 100%;

  display: flex;
  align-items: center;

  gap: 22px;

  padding: 20px 24px;

  border-radius: 22px;

  background:
    linear-gradient(
      135deg,
      var(--card-1),
      var(--card-2)
    );

  border:
    1px solid rgba(255,255,255,.06);

  transition:
    transform .25s ease,
    border-color .25s ease,
    box-shadow .25s ease;

  box-shadow:
    0 10px 30px rgba(0,0,0,.22);
}

.task-card:hover{

  transform: translateY(-3px);

  border-color:
    rgba(96,165,250,.35);

  box-shadow:
    0 18px 35px rgba(0,0,0,.32);
}

/* COLUMNAS */

.task-col{
  min-width: 0;
}

.title-col{
  width: 220px;
  flex-shrink: 0;
}

.description-col{
  flex: 1;
  min-width: 0;
}

.date-col{
  width: 150px;
  flex-shrink: 0;
}

/* STATUS */

.task-status{

  width: 160px;

  flex-shrink: 0;
}

.task-status span{

  display: inline-flex;

  align-items: center;
  gap: 8px;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 700;

  letter-spacing: .3px;
}

.completed{

  background:
    rgba(34,197,94,.15);

  color: #4ade80;
}

.pending{

  background:
    rgba(251,191,36,.15);

  color: #facc15;
}

/* TITLE */

.task-title{

  color: white;

  font-size: 18px;
  font-weight: 700;

  line-height: 1.3;

  margin: 0;
}

/* DESCRIPTION */

.task-description{

  color: var(--text-soft);

  margin: 0;

  font-size: 14px;

  line-height: 1.5;

  cursor: pointer;

  transition: .25s ease;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-description:hover{
  color: white;
}

/* DATE */

.task-date{

  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--blue);

  font-size: 14px;
  font-weight: 500;
}

/* ACTIONS */

.task-actions{

  display: flex;
  align-items: center;

  gap: 10px;

  margin-left: auto;

  flex-shrink: 0;
}

/* BUTTONS CARD */

.btn-card{

  width: 44px;
  height: 44px;

  border: none;

  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  cursor: pointer;

  transition:
    transform .25s ease,
    box-shadow .25s ease;
}

.btn-card i{
  font-size: 16px;
}

.btn-card:hover{

  transform: scale(1.08);

  box-shadow:
    0 12px 20px rgba(0,0,0,.28);
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

/* TABLET */

@media(max-width: 950px){

  .task-card{

    flex-direction: column;
    align-items: flex-start;

    gap: 18px;
  }

  .task-status,
  .title-col,
  .description-col,
  .date-col{
    width: 100%;
  }

  .task-description{

    white-space: normal;

    display: -webkit-box;

    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .task-actions{

    width: 100%;

    justify-content: flex-end;
  }
}

/* MOBILE */

@media(max-width: 640px){

  .tasks-page{
    padding: 18px 12px;
  }

  .topbar{
    margin-bottom: 24px;
  }

  .title{
    font-size: 28px;
  }

  .subtitle{
    font-size: 14px;
  }

  .actions{
    width: 100%;
  }

  .btn-action{

    flex: 1;

    min-width: 120px;

    height: 44px;

    font-size: 13px;
  }

  .task-card{

    padding: 18px;

    border-radius: 18px;
  }

  .task-title{

    font-size: 17px;
  }

  .task-description{

    font-size: 13.5px;

    line-height: 1.5;
  }

  .task-date{

    font-size: 13px;
  }

  .task-actions{

    width: 100%;

    justify-content: space-between;
  }

  .btn-card{

    width: 48%;
    height: 44px;

    border-radius: 12px;
  }

  .btn-card i{
    font-size: 15px;
  }
}

/* EXTRA SMALL */

@media(max-width: 420px){

  .title{
    font-size: 25px;
  }

  .task-status span{
    font-size: 11px;
  }

  .task-title{
    font-size: 16px;
  }

  .task-description{
    font-size: 13px;
  }
}

</style>
