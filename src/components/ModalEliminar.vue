<script>
import axios from 'axios'
import moment from 'moment'

export default{
    name: 'moodalEliminar',
    components: {

    },
    data: function(){
        return{
            id: "",
            titulo: "",
            descripcion: "",
            vencimiento: "",
            estado: false,
            delete: false,
            moment: moment,
        }
    },

    methods:{
        mostrar(id){
            this.id = id
            axios.get("https://66c60dea134eb8f434969be4.mockapi.io/api/v1/tareas?id="+ this.id)
            .then( datos => {
        
 
                this.titulo = datos.data[0].titulo
                this.descripcion = datos.data[0].descripcion
                this.vencimiento = moment(datos.data[0].vencimiento).format("YYYY-MM-DD")
                this.estado = datos.data[0].estado

        //this.form.token = localStorage.getItem("token");
        console.log(this.estado)

         })
        },
        eliminar(id){
            fetch('https://66c60dea134eb8f434969be4.mockapi.io/api/v1/tareas/' + id, {
                method:'PUT',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({"delete" : true })

            })
            .then(response => response.json())
            .then(data=> 
            console.log('Data: ',data

            ))
            this.alertaEliminado()
            //cerramos el modal
            this.cerrarModal()
            // se recarga la pagina den un segundo y se actualizan los datos
            setTimeout(() => {this.$parent.recargar()}, "2000")
        },

        cerrarModal(){
        var genericModalEl = document.getElementById('myModalEliminar')
        var modal = bootstrap.Modal.getInstance(genericModalEl)
        modal.hide()
        },

        alertaEliminado(){
        Swal.fire({
        icon: 'error',
        iconHtml: '<i class="bi bi-trash3"></i>',
        title: 'Se eliminó la tarea: "'+ this.titulo + '"',
        showConfirmButton: false,
        timer: 4000
        })
        }
    }
}
</script>

<template>

  <div
    class="modal fade"
    id="myModalEliminar"
    tabindex="-1"
  >

    <div class="modal-dialog modal-dialog-centered">

      <div class="modal-content delete-modal">

        <!-- BODY -->

        <div class="delete-body">

          <!-- ICON -->

          <div class="delete-icon">

            <i class="bi bi-trash3-fill"></i>

          </div>

          <!-- TEXT -->

          <h3 class="delete-title">
            Eliminar tarea
          </h3>

          <p class="delete-description">
            Esta acción marcará la tarea como eliminada.
            Podrás recuperarla más adelante si lo deseas.
          </p>

          <!-- ACTIONS -->

          <div class="delete-actions">

            <button
              type="button"
              class="btn-cancel"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>

            <button
              type="button"
              class="btn-delete"
              @click="eliminar"
            >
              <i class="bi bi-trash3"></i>
              Eliminar
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<style scoped>

/* MODAL */

.delete-modal{

  border: 1px solid rgba(255,255,255,.08);

  border-radius: 28px;

  overflow: hidden;

  background:
    rgba(15,23,42,.96);

  backdrop-filter: blur(18px);

  box-shadow:
    0 20px 50px rgba(0,0,0,.45);
}

/* BODY */

.delete-body{

  padding: 40px 30px;

  text-align: center;
}

/* ICON */

.delete-icon{

  width: 90px;
  height: 90px;

  margin: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background:
    rgba(239,68,68,.12);

  border:
    1px solid rgba(239,68,68,.2);

  margin-bottom: 24px;
}

.delete-icon i{

  font-size: 38px;

  color: #ef4444;
}

/* TITULO */

.delete-title{

  color: white;

  font-size: 30px;
  font-weight: 700;

  margin-bottom: 14px;
}

/* DESCRIPTION */

.delete-description{

  color:
    rgba(255,255,255,.65);

  line-height: 1.7;

  font-size: 15px;

  max-width: 360px;

  margin:
    0 auto 32px auto;
}

/* ACTIONS */

.delete-actions{

  display: flex;
  justify-content: center;

  gap: 14px;
}

.btn-cancel,
.btn-delete{

  height: 52px;

  padding: 0 24px;

  border: none;

  border-radius: 14px;

  font-weight: 600;

  transition: .3s;
}

/* CANCEL */

.btn-cancel{

  background:
    rgba(255,255,255,.08);

  color: white;
}

/* DELETE */

.btn-delete{

  display: flex;
  align-items: center;
  gap: 10px;

  background:
    linear-gradient(
      135deg,
      #ef4444,
      #dc2626
    );

  color: white;
}

/* HOVERS */

.btn-cancel:hover,
.btn-delete:hover{

  transform: translateY(-2px);
}

.btn-delete:hover{

  box-shadow:
    0 12px 24px rgba(239,68,68,.25);
}

/* MOBILE */

@media(max-width: 576px){

  .modal-dialog{
    margin: 14px;
  }

  .delete-actions{

    flex-direction: column;
  }

  .btn-cancel,
  .btn-delete{

    width: 100%;

    justify-content: center;
  }

  .delete-title{
    font-size: 26px;
  }
}

</style>