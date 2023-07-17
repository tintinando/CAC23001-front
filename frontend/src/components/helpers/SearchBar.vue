<template>
    <div class="input-group">
        <input class="form-control" style="width: 250px;" ref="textInput" type="text" @input="handleInput" v-model="input"
            placeholder="Buscar" @focus="setEventListeners" @blur="removeEventListeners">
        <span class="input-group-text">
            <!-- search icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                viewBox="0 0 16 16">
                <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
        </span>
        <ul class="usr-dropdown" :class="{ show: suggestions.length > 0 }" ref="dropdown">
            <li v-for="(suggestion, index) in suggestions" @click="handleSelect(suggestion)" @focus="setEventListeners"
                @blur="removeEventListeners" :class="{ highlighted: index === highlightedIndex }" class="usr-dropdown-item">
                {{suggestion}}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import apiURL from '../../config/api';

// Estado global vuex
const store = useStore();
const setSearchFilter = (search) => store.commit('setSearchFilter', search);

const input = ref(''); // v-model guarda el valor escrito en esta referencia
const highlightedIndex = ref(-1); // elige en qué indice agregar la clase que resalta la selección

// referencias de DOM
const textInput = ref(null);
const dropdown = ref(null);

// sugerencias de búsqueda
const suggestions = ref([]); // array de palabras sugeridas mientras se escribe
const fetchSuggestions = () => {
    if (input.value != '') {
        fetch(`${apiURL}/find?name=${input.value}`)
            .then(res => res.json())
            .then(res => {
                suggestions.value = res.map(e => e.nombre);
            });
    };
};

// Eventos del formulario
let timeoutId = null;
const handleInput = () => { // se ejecuta por cada caracter escrito. Dispara fetch solo si se deja de escribir 300ms
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        if (input.value === '') { // al vaciar el input vacía el filtro y las sugerencias
            window.removeEventListener('keydown', handleArrowKeys);
            suggestions.value = [];
            setSearchFilter('');
        } else {
            window.addEventListener('keydown', handleArrowKeys);
            fetchSuggestions();
        };
    }, 300);
};

const handleSelect = (suggestion) => { // evento al hacer clic en un elemento
    input.value = suggestion;
    suggestions.value = [];
    setSearchFilter(suggestion);
    highlightedIndex.value = -1;
};

// Eventos de teclado
const handleEsc = () => {
    input.value = "";
    suggestions.value = [];
    setSearchFilter('');
    highlightedIndex.value = -1;
};

const handleArrowUp = () => {
    if (highlightedIndex.value > 0) {
        highlightedIndex.value--;
    };
};

const handleArrowDown = () => {
    if (document.activeElement === textInput.value) {
        textInput.value.blur();
        dropdown.value.focus();
    };

    if (highlightedIndex.value < suggestions.value.length - 1) {
        highlightedIndex.value++;
    };
};

const handleEnter = () => {
    if (highlightedIndex.value > -1) {
        handleSelect(suggestions.value[highlightedIndex.value]);
    };
};

const handleArrowKeys = (e) => {
    switch (e.key) {
        case 'ArrowUp':
            e.preventDefault();
            handleArrowUp();
            break;
        case 'ArrowDown':
            e.preventDefault();
            handleArrowDown();
            break;
        case 'Escape':
            handleEsc();
            break;
        case 'Enter':
            handleEnter();
    };
};

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

.highlighted {
    background-color: aquamarine;
}
</style>