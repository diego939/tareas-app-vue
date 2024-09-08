<script setup>
import {computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  }
})
</script>

<template>
<!--
  <Tareas/>
  <Modal/>
-->
<router-view/>
</template>

<style scoped>
  
</style>
