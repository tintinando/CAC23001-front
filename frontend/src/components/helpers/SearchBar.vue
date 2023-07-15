<template>
    <div class="input-group">
        <input class="form-control" style="width: 250px;" type="text" @keyup.esc="handleEsc" @input="handleInput"
            v-model="input" placeholder="Buscar">
        <span class="input-group-text">
            <!-- search icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                viewBox="0 0 16 16">
                <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
        </span>
        <ul class="usr-dropdown" :class="{ show: suggestions.length > 0 }">
            <li v-for="suggestion in suggestions" @click="handleSelect(suggestion)" class="usr-dropdown-item">{{ suggestion
            }}</li>
        </ul>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import apiURL from '../../config/api'

const store = useStore();
const searchFilter = computed(() => store.state.searchFilter);
const setSearchFilter = (search) => store.commit('setSearchFilter', search);

const input = ref('');

const suggestions = ref([]);
const fetchSuggestions = () => {
    if (input.value != '') {
        fetch(`${apiURL}/find?name=${input.value}`)
            .then(res => res.json())
            .then(res => {
                suggestions.value = res.map(e => e.nombre);
            });
    }
}

let timeoutId = null;
const handleInput = () => {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        if (input.value === '') {
            suggestions.value = [];
        } else {
            fetchSuggestions();
        };
    }, 300);
};

const handleSelect = (suggestion) => {
    input.value = suggestion;
    suggestions.value = [];
    setSearchFilter(suggestion);
}

// Eventos de teclado
const handleEsc = () => {
    input.value = "";
    suggestions.value = [];
    setSearchFilter('');
}
</script>

<style scoped>
.usr-dropdown {
    visibility: hidden;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    width: 250px;
    overflow: auto;
}

.usr-dropdown-item {
    height: 30px;
    font-weight: 600;
}

.usr-dropdown-item:hover {
    background-color: aquamarine;
}

.show {
    visibility: visible;
}
</style>