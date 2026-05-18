<script>
import axios from 'axios'

export default {
  name: 'Login',

  data() {
    return {
      session: false,
      user: '',
      password: '',
      listardatos: [],
      loading: false
    }
  },

  methods: {
    async login() {

      if (!this.user || !this.password) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Completa usuario y contraseña"
        })
        return
      }

      this.loading = true

      try {

        const response = await axios.get(
          'https://66c60dea134eb8f434969be4.mockapi.io/api/v1/users'
        )

        this.listardatos = response.data

        const usuarioEncontrado = this.listardatos.find(
          item =>
            item.user === this.user &&
            item.password === this.password
        )

        if (!usuarioEncontrado) {

          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Usuario o contraseña incorrectos"
          })

        } else {

          Swal.fire({
            icon: "success",
            title: `Bienvenido ${this.user}!`,
            timer: 1500,
            showConfirmButton: false
          })

          localStorage.setItem(
            'usuario',
            JSON.stringify(usuarioEncontrado)
          )

          this.session = true

          setTimeout(() => {
            this.$router.push('/tareas')
          }, 1500)
        }

      } catch (error) {

        console.log(error)

        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: "No se pudo iniciar sesión"
        })

      } finally {
        this.loading = false
      }
    }
  },
  mounted(){

  const usuario = localStorage.getItem('usuario')

  if(usuario){
    this.$router.push('/tareas')
  }
}
}
</script>

<template>
  <div class="login-page">

    <div class="login-card">

      <div class="login-header">
        <div class="icon-wrapper">
          <i class="bi bi-person-fill"></i>
        </div>

        <h2>Bienvenido</h2>
        <p>Inicia sesión para continuar</p>
      </div>

      <form @submit.prevent="login">

        <div class="input-group-custom">
          <i class="bi bi-person"></i>

          <input
            type="text"
            class="form-control custom-input"
            placeholder="Usuario"
            v-model="user"
          >
        </div>

        <div class="input-group-custom">
          <i class="bi bi-lock"></i>

          <input
            type="password"
            class="form-control custom-input"
            placeholder="Contraseña"
            v-model="password"
          >
        </div>

        <button
          type="submit"
          class="login-btn"
        >
          Ingresar
        </button>

      </form>

    </div>

  </div>
</template>

<style scoped>

.login-page{

  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  background:
    linear-gradient(
      135deg,
      #0f172a 0%,
      #1e293b 40%,
      #2563eb 100%
    );
}

/* efecto blur decorativo */

.login-page::before{

  content: "";

  position: absolute;

  width: 500px;
  height: 500px;

  background: rgba(59,130,246,0.35);

  border-radius: 50%;

  top: -120px;
  left: -120px;

  filter: blur(120px);
}

.login-page::after{

  content: "";

  position: absolute;

  width: 400px;
  height: 400px;

  background: rgba(147,51,234,0.25);

  border-radius: 50%;

  bottom: -120px;
  right: -120px;

  filter: blur(120px);
}

.login-card{

  position: relative;
  z-index: 2;

  width: 100%;
  max-width: 420px;

  padding: 40px 30px;

  border-radius: 28px;

  background: rgba(255,255,255,0.08);

  backdrop-filter: blur(18px);

  border: 1px solid rgba(255,255,255,0.15);

  box-shadow:
    0 10px 40px rgba(0,0,0,0.35);

  color: white;
}

.login-header{
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2{
  font-size: 34px;
  font-weight: 700;
  margin-top: 18px;
}

.login-header p{
  opacity: .75;
  margin-top: 8px;
  font-size: 15px;
}

.icon-wrapper{

  width: 95px;
  height: 95px;

  margin: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #3b82f6,
      #2563eb
    );

  font-size: 42px;

  box-shadow:
    0 12px 30px rgba(37,99,235,0.45);
}

.input-group-custom{
  position: relative;
  margin-bottom: 20px;
}

.input-group-custom i{

  position: absolute;

  top: 50%;
  left: 16px;

  transform: translateY(-50%);

  color: rgba(255,255,255,0.6);

  z-index: 10;
}

.custom-input{

  height: 56px;

  padding-left: 46px;

  border-radius: 16px;

  border: 1px solid transparent;

  background: rgba(255,255,255,0.10);

  color: white;

  transition: all .3s ease;
}

.custom-input::placeholder{
  color: rgba(255,255,255,0.55);
}

.custom-input:focus{

  background: rgba(255,255,255,0.16);

  border-color: rgba(59,130,246,0.6);

  box-shadow:
    0 0 0 4px rgba(59,130,246,0.2);

  color: white;
}

.login-btn{

  width: 100%;
  height: 56px;

  border: none;

  border-radius: 16px;

  margin-top: 10px;

  font-size: 16px;
  font-weight: 600;

  color: white;

  background:
    linear-gradient(
      135deg,
      #3b82f6,
      #2563eb
    );

  transition: all .3s ease;
}

.login-btn:hover{

  transform: translateY(-2px);

  box-shadow:
    0 10px 25px rgba(37,99,235,0.4);
}

@media (max-width: 576px){

  .login-card{
    margin: 20px;
    padding: 32px 22px;
  }

  .icon-wrapper{
    width: 80px;
    height: 80px;
    font-size: 36px;
  }

  .login-header h2{
    font-size: 28px;
  }
}

</style>