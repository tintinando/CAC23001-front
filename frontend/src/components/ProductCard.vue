<template>
    <tr style="height: 60px;" :class="{ 'txt-through': waitingDelete }">
        <td>{{ product.nombre }}</td>
        <td>{{ product.stock }}</td>
        <td>$ {{ product.precio }}</td>
        <td><img :src="product.imagen" style="width: 150px;" class="img-fluid img-thumbnail"
                :class="{ 'img-grayscale': waitingDelete }" @click="selectImg(product.imagen)" /></td>
        <td class="col-2">
            <span v-if="loggedIn && !waitingDelete">
                <button @click="editProduct(product)" type="button" class="btn btn-primary btn-sm">Editar</button>
                <button @click="handleDelete" type="button" class="ms-3 btn btn-primary btn-sm">X</button>
            </span>
            <span v-else-if="waitingDelete">
                <Countdown :handleClick="handleAbortDelete" :handleTimeover="handleTimeoutDelete" :count="4" />
            </span>
        </td>
    </tr>


</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps, ref, computed } from 'vue';
import Countdown from './helpers/Countdown.vue';

const store = useStore();
const loggedIn = computed(() => store.state.loggedIn);

defineProps({
    product: { type: Object, required: true },
    deleteProduct: { type: Function, required: true },
    editProduct: { type: Function, required: true },
    selectImg: {type: Function}
});

const waitingDelete = ref(false);

const handleDelete = () => {
    waitingDelete.value = true;
}

const handleAbortDelete = () => {
    waitingDelete.value = false;
}

const handleTimeoutDelete = () => {
    waitingDelete.value = false;
    props.deleteProduct(props.product.id);
};

</script>

<style scoped>
.img-grayscale {
    filter: grayscale(100%) brightness(60%);
    transition: 0.8s filter;
}

.txt-through {
    color: red;
    text-decoration: line-through;
}

.txt-through td {
    background-color: rgb(218, 218, 218);
    transition: 0.8s all;
}
</style>