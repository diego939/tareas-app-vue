<script>
import axios from 'axios';
import moment from 'moment'
import Tareas from '../pages/Tareas.vue'
import { useRoute, useRouter } from 'vue-router'

export default{
    name: 'moodalEdit',
    components: {

    },
    data: function(){
        return{
            id:"",
            titulo: "",
            descripcion: "",
            vencimiento: "",
            terminada: false,
            moment: moment,
            form:{
                    "id":"",
                    "titulo" : "",
                    "descripcion": "", 
                    "vencimiento" : "",
                    "estado": false,
                    "userId": "1",
                    }
        }
    },

    methods:{
        editar(id){
            //this.id = id
            this.form.id = id
            axios.get("https://66c60dea134eb8f434969be4.mockapi.io/api/v1/tareas?id="+ id)
            .then( datos => {
        
 
                this.form.titulo = datos.data[0].titulo
                this.form.descripcion = datos.data[0].descripcion
                this.form.vencimiento = moment(datos.data[0].vencimiento).format("YYYY-MM-DD")
                this.form.estado = datos.data[0].estado

        //this.form.token = localStorage.getItem("token");
        console.log(this.form.estado)

         })
            
        },

        cambios(){
            fetch('https://66c60dea134eb8f434969be4.mockapi.io/api/v1/tareas/' + this.form.id, {
                method:'PUT',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({"titulo" : this.form.titulo,
                                    "descripcion": this.form.descripcion, 
                                    "vencimiento" : this.form.vencimiento,
                                    "estado": this.form.estado })
            })
            .then(response => response.json())
            .then(data => console.log('Data: ',data))
            this.alertaEditada()
            //cerramos el modal
            this.cerrarModal()
            // se recarga la pagina den un segundo y se actualizan los datos
            setTimeout(() => {this.$parent.recargar()}, "2000")
        },

        cerrarModal(){
        var genericModalEl = document.getElementById('myModalEdit')
        var modal = bootstrap.Modal.getInstance(genericModalEl)
        modal.hide()
        },

        alertaEditada(){
        Swal.fire({
        icon: 'question',
        iconHtml: '<i class="bi bi-pencil"></i>',
        title: 'Se editó la tarea: "'+ this.form.titulo + '"',
        showConfirmButton: false,
        timer: 4000
        })
        }


    },

}
</script>

<template>

  <!-- MODAL -->

  <div
    class="modal fade"
    id="myModalEdit"
    tabindex="-1"
  >

    <div class="modal-dialog modal-dialog-centered">

      <div class="modal-content custom-modal">

        <!-- HEADER -->

        <div class="modal-header custom-header">

          <div>

            <h4 class="modal-title">
              Editar tarea
            </h4>

            <p class="modal-subtitle">
              Modifica la información de la tarea
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

          <form @submit.prevent="cambios">

            <!-- TITULO -->

            <div class="input-container">

              <label>Título</label>

              <input
                type="text"
                class="custom-input"
                placeholder="Título"
                v-model="form.titulo"
              >

            </div>

            <!-- DESCRIPCION -->

            <div class="input-container">

              <label>Descripción</label>

              <textarea
                rows="5"
                class="custom-textarea"
                placeholder="Descripción de la tarea"
                v-model="form.descripcion"
              ></textarea>

            </div>

            <!-- FECHA -->

            <div class="input-container">

              <label>Vencimiento</label>

              <input
                type="date"
                class="custom-input"
                v-model="form.vencimiento"
              >

            </div>

            <!-- CHECK -->

            <div class="checkbox-container">

              <label class="custom-checkbox">

                <input
                  type="checkbox"
                  v-model="form.estado"
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
                <i class="bi bi-check2"></i>
                Guardar cambios
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  </div>

</template>

<style scoped>

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

  border:
    1px solid rgba(255,255,255,.08);

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