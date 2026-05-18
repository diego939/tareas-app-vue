<script>
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import Tareas from '../pages/Tareas.vue'



export default{

    data: function(){
        return{
            titulo: "",
            descripcion: "",
            vencimiento: "",
            estado: false
        }
    },

    methods:{
        agregar(){
            fetch('https://66c60dea134eb8f434969be4.mockapi.io/api/v1/tareas/', {
                method:'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({"titulo" : this.titulo,
                                    "descripcion": this.descripcion, 
                                    "vencimiento" : this.vencimiento,
                                    "estado": this.estado })
            })
            .then(response => response.json())
            .then(data=> console.log('Data: ',data))
            this.alertaAgregado()
            //cerramos el modal
            this.cerrarModal()
            //vacio los campos del formulario
            this.vaciarFormulario()
            // se recarga la pagina den un segundo y se actualizan los datos
            setTimeout(() => {this.$parent.recargar()}, "2000")
        },

        cerrarModal(){
        var genericModalEl = document.getElementById('myModal')
        var modal = bootstrap.Modal.getInstance(genericModalEl)
        modal.hide()
        },

        alertaAgregado(){
        Swal.fire({
        icon: 'question',
        iconHtml: '<i class="bi bi-database-add"></i>',
        title: 'Se agregó la tarea: "'+ this.titulo + '"',
        showConfirmButton: false,
        timer: 4000
        })
        },

        vaciarFormulario(){
            this.titulo = "",
            this.descripcion = "",
            this.vencimiento = "",
            this.estado = false
        }
    }
}
</script>
<template>

  <!-- BOTON -->

  <button
    class="btn-add-task"
    data-bs-toggle="modal"
    data-bs-target="#myModal"
  >
    <i class="bi bi-plus-lg"></i>
    Nueva tarea
  </button>

  <!-- MODAL -->

  <div
    class="modal fade"
    id="myModal"
    tabindex="-1"
  >

    <div class="modal-dialog modal-dialog-centered">

      <div class="modal-content custom-modal">

        <!-- HEADER -->

        <div class="modal-header custom-header">

          <div>

            <h4 class="modal-title">
              Nueva tarea
            </h4>

            <p class="modal-subtitle">
              Completa la información de la tarea
            </p>

          </div>

          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
          ></button>

        </div>

        <!-- BODY -->

        <div class="modal-body">

          <form @submit.prevent="agregar">

            <!-- TITULO -->

            <div class="input-container">

              <label>Título</label>

              <input
                type="text"
                class="custom-input"
                placeholder="Ej: Terminar proyecto"
                v-model="titulo"
              >

            </div>

            <!-- DESCRIPCION -->

            <div class="input-container">

              <label>Descripción</label>

              <textarea
                class="custom-textarea"
                rows="5"
                placeholder="Describe la tarea..."
                v-model="descripcion"
              ></textarea>

            </div>

            <!-- FECHA -->

            <div class="input-container">

              <label>Vencimiento</label>

              <input
                type="date"
                class="custom-input"
                v-model="vencimiento"
              >

            </div>

            <!-- CHECK -->

            <div class="checkbox-container">

              <label class="custom-checkbox">

                <input
                  type="checkbox"
                  v-model="estado"
                >

                <span></span>

                Tarea completada

              </label>

            </div>

            <!-- ACTIONS -->

            <div class="modal-actions">

              <button
                type="button"
                class="btn-cancel"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>

              <button
                type="submit"
                class="btn-save"
              >
                <i class="bi bi-plus-lg"></i>
                Crear tarea
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  </div>

</template>

<style scoped>

/* BOTON SUPERIOR */

.btn-add-task{

  height: 50px;

  padding: 0 22px;

  border-radius: 14px;

  border: none;

  display: flex;
  align-items: center;
  gap: 10px;

  font-weight: 600;

  color: white;

  background:
    linear-gradient(
      135deg,
      #3b82f6,
      #2563eb
    );

  transition: .3s;
}

.btn-add-task:hover{

  transform: translateY(-2px);

  box-shadow:
    0 10px 25px rgba(37,99,235,.35);
}

/* MODAL */

.custom-modal{

  border: 1px solid rgba(255,255,255,.08);

  border-radius: 26px;

  overflow: hidden;

  background:
    rgba(15,23,42,.96);

  backdrop-filter: blur(18px);

  box-shadow:
    0 20px 50px rgba(0,0,0,.45);
}

/* HEADER */

.custom-header{

  border-bottom:
    1px solid rgba(255,255,255,.06);

  padding: 24px;
}

.modal-title{

  color: white;

  font-size: 28px;
  font-weight: 700;
}

.modal-subtitle{

  margin-top: 6px;

  color:
    rgba(255,255,255,.6);

  font-size: 14px;
}

/* BODY */

.modal-body{
  padding: 24px;
}

/* INPUTS */

.input-container{
  margin-bottom: 22px;
}

.input-container label{

  display: block;

  margin-bottom: 10px;

  color: white;

  font-size: 14px;
  font-weight: 600;
}

.custom-input,
.custom-textarea{

  width: 100%;

  border: 1px solid rgba(255,255,255,.08);

  border-radius: 16px;

  background:
    rgba(255,255,255,.04);

  color: white;

  padding: 16px;

  transition: .3s;
}

.custom-input{

  height: 56px;
}

.custom-textarea{

  resize: none;
}

.custom-input:focus,
.custom-textarea:focus{

  border-color:
    rgba(59,130,246,.5);

  box-shadow:
    0 0 0 4px rgba(59,130,246,.15);

  background:
    rgba(255,255,255,.06);
}

.custom-input::placeholder,
.custom-textarea::placeholder{

  color:
    rgba(255,255,255,.4);
}

/* CHECKBOX */

.checkbox-container{
  margin-bottom: 30px;
}

.custom-checkbox{

  display: flex;
  align-items: center;
  gap: 12px;

  color: white;

  cursor: pointer;

  user-select: none;
}

.custom-checkbox input{
  display: none;
}

.custom-checkbox span{

  width: 22px;
  height: 22px;

  border-radius: 8px;

  border:
    2px solid rgba(255,255,255,.2);

  transition: .3s;

  position: relative;
}

.custom-checkbox input:checked + span{

  background: #3b82f6;

  border-color: #3b82f6;
}

.custom-checkbox input:checked + span::after{

  content: "✓";

  position: absolute;

  top: 50%;
  left: 50%;

  transform:
    translate(-50%, -50%);

  color: white;

  font-size: 12px;
}

/* ACTIONS */

.modal-actions{

  display: flex;
  justify-content: flex-end;

  gap: 14px;
}

.btn-cancel,
.btn-save{

  height: 50px;

  padding: 0 22px;

  border: none;

  border-radius: 14px;

  font-weight: 600;

  transition: .3s;
}

.btn-cancel{

  background:
    rgba(255,255,255,.08);

  color: white;
}

.btn-save{

  display: flex;
  align-items: center;
  gap: 8px;

  background:
    linear-gradient(
      135deg,
      #3b82f6,
      #2563eb
    );

  color: white;
}

.btn-cancel:hover,
.btn-save:hover{

  transform: translateY(-2px);
}

/* MOBILE */

@media(max-width: 576px){

  .modal-dialog{
    margin: 14px;
  }

  .modal-actions{

    flex-direction: column;
  }

  .btn-cancel,
  .btn-save{

    width: 100%;
    justify-content: center;
  }
}

</style>