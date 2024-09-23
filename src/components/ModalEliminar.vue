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
    
    <!-- The Modal -->
    <div class="modal" id="myModalEliminar">
    <div class="modal-dialog">
        <div class="modal-content text-dark" style="background-color:beige">

        <!-- Modal Header -->
        <div class="modal-header">
            <h4 class="modal-title text-center"> Eliminar Tarea</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
            <form v-on:submit.prevent="editar">
                <div class="card" v-bind:class="estado? 'text-white bg-secondary' : 'text-white bg-danger'">
                    <div class="card-header h4">Titulo: {{ titulo }}</div>
                    <div class="card-body">
                        <div>Descripción: {{ descripcion }}</div>

                    </div>
                    <div class="card-footer">Vencimiento: {{ moment(vencimiento).format('DD/MM/YYYY') }}</div>
                </div>
            <button type="submit" class="btn btn-dark bi-trash m-2" @click="eliminar(id)"> Eliminar</button>
            </form>
        </div>

        </div>
    </div>
    </div>
</template>

<style scoped>
</style>