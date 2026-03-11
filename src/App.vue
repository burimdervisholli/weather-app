<script setup lang="ts">
const apiKey = import.meta.env.VITE_API_KEY
</script>

<template>
  <div>
    <QBtn color="primary" label="Hello World" />
    {{ apiKey }}
    <h1>You did it! <q-badge color="secondary"> #4D96F2 </q-badge></h1>
    <p>
      Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
      documentation
    </p>
  </div>
</template>
