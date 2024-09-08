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
            // se recarga la pagina den un segundo y se actualizan los datos
            setTimeout(() => {this.$parent.recargar()}, "1000")
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
        }
    }
}
</script>
<template>

    <button class="btn btn-success border shadow bi-database-add" data-bs-toggle="modal" data-bs-target="#myModal"> Agregar Tarea</button> 
    <!-- The Modal -->
    <div class="modal" id="myModal">
    <div class="modal-dialog">
        <div class="modal-content" style="background-color:beige">

        <!-- Modal Header -->
        <div class="modal-header">
            <h4 class="modal-title text-center"> Nueva Tarea</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
            <form v-on:submit.prevent="agregar">
            <div class="mb-3 mt-3">
                <label for="email" class="form-label">Titulo:</label>
                <input type="text" class="form-control" placeholder="Titulo" name="titulo" v-model="titulo">
            </div>
            <div class="mb-3 mt-3">
                <label for="email" class="form-label">Descripción:</label>
                <textarea class="form-control" rows="5" name="descripcion" placeholder="Descripción de la tarea" v-model="descripcion"></textarea>
            </div>
            <div class="mb-3 mt-3">
                <label for="email" class="form-label">Vencimiento:</label>
                <input type="date" class="form-control" placeholder="Vencimiento" name="vencimiento" v-model="vencimiento">
            </div>
            <div class="form-check mb-3">
                <label class="form-check-label">
                <input class="form-check-input border border-secondary" type="checkbox" name="estado" v-model="estado"> Terminada
                </label>
            </div>
            <button type="submit" class="btn btn-primary bi-plus-square m-1"></button>
            <button type="button" class="btn btn-danger m-1" data-bs-dismiss="modal">Cancelar</button>
            </form>
        </div>

        </div>
    </div>
    </div>

</template>

<style scoped>
</style>