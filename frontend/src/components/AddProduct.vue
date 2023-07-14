<template>
    <h1 v-if="!editProduct" class="mb-3">Agregar productos</h1>
    <div class="container">
        <form @submit.prevent="handleSubmit">
            <!-- renderiza según objeto formFields -->
            <div v-for="(field, index) in formFields" :key="index" class="mb-2 row col-sm-6">
                <label class="col-sm-3 col-form-label">{{ field.label }}</label>
                <div class="col-sm-9">
                    <input class="form-control" @input="handleInput()" v-model="field.value" :type="field.type"
                        >
                </div>
            </div>
            <button :disabled="!formCompleted" type="submit" class="btn btn-primary">Aceptar</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import apiURL from '../config/api'

const props = defineProps({
    editProduct: { type: Object },
    closeModal: { type: Function },
    forceFetch: { type: Function },
});

const formFields = ref([
    { label: 'Nombre', value: '', type: 'text' },
    { label: 'Precio', value: '', type: 'number' },
    { label: 'Stock', value: '', type: 'number' },
    { label: 'URL Imagen', value: '', type: 'text' },
])
const formCompleted = ref(false); // true habilita submit

const handleInput = () => {
    // habilita el botón submit
    if (props.editProduct) {
        formCompleted.value = !(
            formFields.value[0].value == props.editProduct.nombre &&
            formFields.value[1].value == props.editProduct.precio &&
            formFields.value[2].value == props.editProduct.stock &&
            formFields.value[3].value == props.editProduct.imagen
        )
    } else {
        formCompleted.value = formFields.value[0].value !== '';
    }
};

onMounted(() => {
    // en caso de recibir editProduct completa los campos del formulario
    if (props.editProduct) {
        formFields.value[0].value = props.editProduct.nombre;
        formFields.value[1].value = props.editProduct.precio;
        formFields.value[2].value = props.editProduct.stock;
        formFields.value[3].value = props.editProduct.imagen;
    }
});

const handleSubmit = () => {
    formCompleted.value = false;
    const objectToFetch = {
        nombre: formFields.value[0].value,
        precio: formFields.value[1].value,
        stock: formFields.value[2].value,
        imagen: formFields.value[3].value
    };
    if (props.editProduct) {
        fetch(`${apiURL}/productos/${props.editProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objectToFetch),
        })
            .then(res => res.json())
            .then(res => {
                formFields.value.forEach(i => i.value = '');
                alert("Actualizado con éxito");
                props.closeModal();
                props.forceFetch();
            })
            .catch(error => {
                console.log(error);
            });
    } else {
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
};
</script>