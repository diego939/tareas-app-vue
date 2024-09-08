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
            setTimeout(() => {this.$parent.recargar()}, "1000")
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
    
    <!-- The Modal -->
    <div class="modal" id="myModalEdit">
    <div class="modal-dialog">
        <div class="modal-content text-dark" style="background-color:beige">

        <!-- Modal Header -->
        <div class="modal-header">
            <h4 class="modal-title text-center"> Editar Tarea</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
            <form v-on:submit.prevent="">
            <div class="mb-3 mt-3">
                <label for="email" class="form-label">Titulo:</label>
                <input type="text" class="form-control" placeholder="Titulo" name="titulo" v-model="form.titulo">
            </div>
            <div class="mb-3 mt-3">
                <label for="email" class="form-label">Descripción:</label>
                <textarea class="form-control" rows="5" name="descripcion" placeholder="Descripción de la tarea" v-model="form.descripcion"></textarea>
            </div>
            <div class="mb-3 mt-3">
                <label for="email" class="form-label">Vencimiento:</label>
                <input type="date" class="form-control" placeholder="Vencimiento" name="vencimiento" v-model="form.vencimiento">
            </div>
            <div class="form-check mb-3">
                <label class="form-check-label">
                <input class="form-check-input border border-secondary" type="checkbox" name="terminada" v-model="form.estado"> Terminada
                </label>
            </div>
            <button type="submit" class="btn btn-primary bi-pencil m-1" @click="cambios"></button>
            <button type="button" class="btn btn-danger m-1" data-bs-dismiss="modal">Cerrar</button>
            </form>
        </div>

        </div>
    </div>
    </div>
</template>

<style scoped>
</style>