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
            <TransitionGroup name="product">
                <ProductCard v-for="(product, index) in products" :key="index" :product="product"
                    :deleteProduct="handleDeleteProduct" :editProduct="handleEditProduct" />
            </TransitionGroup>
        </tbody>
    </table>
    <Modal :modalVisible="editModalVisible" :closeModal="() => editModalVisible = false" :title="'Editar producto'">
        <AddProduct :editProduct="selectedProductToEdit" :forceFetch="() => isLoaded = false"
            :closeModal="() => editModalVisible = false"></AddProduct>
    </Modal>
</template>

<script setup>
import ProductCard from './ProductCard.vue';
import apiURL from '../config/api'
import Modal from './helpers/Modal.vue';
import AddProduct from './AddProduct.vue';
import { ref, onMounted, watch } from 'vue';

const products = ref([]);
const isLoaded = ref(false);
const editModalVisible = ref(false);

const selectedProductToEdit = ref(null);

onMounted(() => {
    if (!isLoaded.value) {
        fetchProducts();
        isLoaded.value = true;
    }
});

watch(isLoaded, (newValue) => {
    if (!newValue) {
        fetchProducts();
        isLoaded.value = true;
    }
});

const fetchProducts = () => {
    URL = apiURL + '/productos';
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            products.value = data;
        })
        .catch(error => {
            console.error("Error al fetch de productos ", error);
        })
};

const handleDeleteProduct = (productId) => {
    URL = `${apiURL}/productos/${productId}`;
    // actualiza localmente el array de productos
    products.value = products.value.filter(p => p.id !== productId);
    fetch(URL, { method: 'DELETE' })
        .then(res => res.json())
        .catch(error => {
            console.error("Error al fetch para eliminar el producto");
        });
};

const handleEditProduct = (product) => {
    // se envía a ProductCard como prop y devuelve producto de la fila a editar
    selectedProductToEdit.value = product;
    editModalVisible.value = true;
}

</script>

<style scoped>
.product-leave-active {
    transition: all 0.8s ease;
}

.product-leave-to {
    opacity: 0;
    transform: translateX(-100px);
}
</style>