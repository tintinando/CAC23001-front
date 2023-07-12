<template>
    <button @click="handleClick" type="button" class="ms-3 btn btn-warning btn-sm">{{ text }} ({{ countdown }})</button>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from 'vue';

const props = defineProps({
    text: { type: String, default: 'Deshacer' },
    count: { type: Number, default: 10 },
    handleClick: { type: Function },
    handleTimeover: { type: Function },
});

const countdown = ref(props.count);

const startCountdown = () => {
    let countdownTimer = setInterval(() => {
        countdown.value--;
        if (countdown.value == 0) {
            clearInterval(countdownTimer);
        }
    }, 1000);
};

onMounted(() => {
    startCountdown();
});

watch(countdown, (currentCountdown) => {
    if (currentCountdown === 0) {
        props.handleTimeover();
    };
});

</script>