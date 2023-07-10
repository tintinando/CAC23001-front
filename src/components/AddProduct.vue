<template>
    <h1 class="mb-3">Agregar productos</h1>
    <div class="container">
        <form @submit.prevent="handleSubmit">
            <!-- renderiza según objeto formFields -->
            <div v-for="(field, index) in formFields" :key="index" class="mb-2 row col-sm-6">
                <label class="col-sm-2 col-form-label">{{ field.label }}</label>
                <div class="col-sm-10">
                    <input class="form-control" @input="handleInput()"  v-model="field.value" :type="field.type">
                </div>
            </div>
            <button :disabled="!formCompleted" type="submit" class="btn btn-primary">Aceptar</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import apiURL from '../config/api'

export default {
    setup() {
        let formFields = ref([
            { label: 'Nombre', value: '', type: 'text' },
            { label: 'Precio', value: '', type: 'number' },
            { label: 'Stock', value: '', type: 'number' },
            { label: 'URL Imagen', value: '', type: 'text' },
        ])
        const formCompleted = ref(false);

        const handleInput = (index) => {
            formCompleted.value = formFields.value.name !== '';
        };

        const handleSubmit = () => {
            formCompleted.value = false;
            const objectToFetch = {
                nombre: formFields.value[0].value,
                precio: formFields.value[1].value,
                stock: formFields.value[2].value,
                imagen: formFields.value[3].value
            };
            fetch(`${apiURL}/productos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objectToFetch),
            })
                .then(res => res.json())
                .then(res => {
                    formFields.value.forEach(i => i.value = '');
                    alert("Subido con éxito");
                })
                .catch(error => {
                    console.log(error);
                });
        };
        return { handleSubmit, formCompleted, formFields, handleInput };
    },
};
</script>