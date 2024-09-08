<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'

export default{
name: 'Login',

  components: {

  },
  data: function(){
    return{
      session: false,
      fields: ['user', 'password'],
      user: "",
      password: "",
      listardatos: [],
    }
  },
methods: {
  login() {
    
      axios.get('https://66c60dea134eb8f434969be4.mockapi.io/api/v1/users')
      .then(response => {
        let login = false
        this.listardatos = response.data

        for (var i=0; i< this.listardatos.length; i++){
          //console.log(this.listardatos[0].user);
          if(this.listardatos[i].user === this.user && this.listardatos[i].password === this.password){
            login = true
          }
        }//fin del for

        if(!login){
          console.log('Usuario o contraseña incorrectos')
          Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Usuario o Contraseña incorrectos!",
                  });
        }else{
            console.log('Usuario encontrado')
            Swal.fire({
                    icon: "success",
                    title: "Bienvenido "+ this.user +'!',
                  });
                  //localStorage.token = response.data.result.token
                  this.$router.push('/tareas')
                  this.session = true
        }

      })
      .catch(function (error){

        console.log(error)

      })
      .finally(function(){

      });
    }
}

}
</script>

<template>
    <div class="card bg-warning shadow border">
    <div class="h1 bi bi-person-circle"></div>
    <div class="card-body">
        <form v-on:submit.prevent="login">
        <div class="mb-3 mt-3 shadow">
            <input type="text" class="form-control" placeholder="Nombre de Usuario" name="user" v-model="user">
        </div>
        <div class="mb-3 shadow">
            <input type="password" class="form-control" placeholder="Contraseña" name="password" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary shadow">ingresar</button>
        </form>
    </div>
    </div>
</template>

<style scoped></style>