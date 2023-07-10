<template>
    <tr style="height: 60px;">
        <td>{{ product.nombre }}</td>
        <td>{{ product.stock }}</td>
        <td>$ {{ product.precio }}</td>
        <td><img :src="product.imagen" style="width: 150px;" class="img-fluid img-thumbnail" /></td>
        <td class="col-2">
            <span v-if="loggedIn">
                <button type="button" class="btn btn-primary btn-sm">Editar</button>
                <button @click="deleteProduct(product.id)" type="button" class="ms-3 btn btn-primary btn-sm">X</button>
            </span>
        </td>
    </tr>
</template>

<script>
import { mapState } from 'vuex';
import apiURL from '../config/api';
import axios from 'axios';

export default {
    computed: {
        ...mapState(['loggedIn'])
    },
    props: {
        product: {
            type: Object,
            required: true
        },
        deleteProduct: {
            type: Function,
            required: true
        },
    },
};
</script>