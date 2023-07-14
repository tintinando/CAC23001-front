<template>
    <div @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent @drop.prevent="toggleActive"
        :class="{ 'active-dropzone': active }" class="dropzone">
        <span>Arrastrar archivo aquí</span>
        <span>O bien</span>
        <label for="dropzoneFile">Examinar...</label>
        <input type="file" id="dropzoneFile" class="dropzonefile" />
    </div>
</template>

<style scoped>
.dropzone {
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 16px;
    border: 2px dashed #41b883;
    background: #fff;
    transition: 0.3s ease all;
}

.dropzone label {
    padding: 8px 12px;
    color: #fff;
    background-color: #41b883;
    transition: 0.3s ease all;
}

.dropzone input {
    display: none;
}

.active-dropzone {
    color: #fff;
    border-color: #fff;
    background-color: #41b883;
}

.active-dropzone label {
    background-color: #fff;
    color: #41b883;
}
</style>

<script setup>
import { ref } from 'vue';

const active = ref(false);

const toggleActive = (e) => {
    active.value = !active.value;
};

</script>
