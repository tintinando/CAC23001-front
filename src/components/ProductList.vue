<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Stock</th>
                <th scope="col">Precio</th>
                <th scope="col">Imagen</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <ProductCard v-for="(product, index) in products" :key="index" :product="product"
                :deleteProduct="deleteProduct" />
        </tbody>
    </table>
</template>

<script>
import ProductCard from './ProductCard.vue';
import apiURL from '../config/api'

export default {
    data() {
        return {
            products: [],
            isLoaded: false, // evita solicitud fetch al eliminar productos
        };
    },
    mounted() {
        if (!this.isLoaded) {
            this.fetchProducts();
            this.isLoaded = true;
        }
    },
    methods: {
        fetchProducts() {
            URL = apiURL + '/productos';
            fetch(URL)
                .then(res => res.json())
                .then(data => {
                    this.products = data;
                })
                .catch(error => {
                    console.error("Error al fetch de productos ", error);
                })
        },
        deleteProduct(productId) {
            URL = `${apiURL}/productos/${productId}`;
            // actualiza localmente el array de productos
            this.products = this.products.filter(p => p.id !== productId);
            fetch(URL, { method: 'DELETE' })
                .then(res => res.json())
                .catch(error => {
                    console.error("Error al fetch para eliminar el producto");
                });
        },
    },
    components: {
        ProductCard
    },
}

</script>