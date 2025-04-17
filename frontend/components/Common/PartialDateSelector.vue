<template>
    <div class="w-full">
        <div class="flex gap-2">
            <!-- Day -->
            <div class="flex-1">
                <v-select v-model="day" :items="validDays" label="Day" variant="outlined" dense clearable />
            </div>

            <!-- Month -->
            <div class="flex-1">
                <v-select v-model="month" :items="months" item-title="label" item-value="value" label="Month*"
                    variant="outlined" dense required />
            </div>

            <!-- Year -->
            <div class="flex-1">
                <v-select v-model="year" :items="years" label="Year*" variant="outlined" dense required />
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, watch, computed } from 'vue'
import { months } from '~/data/date'

const day = ref('')
const month = ref('')
const year = ref('')

const emit = defineEmits(['update'])

watch([day, month, year], () => {
    emit('update', {
        day: day.value || null,
        month: +month.value || null,
        year: +year.value || null,
    })
})

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

const validDays = computed(() => {
    if (!month.value || !year.value) return Array.from({ length: 31 }, (_, i) => i + 1)
    const lastDay = new Date(year.value, month.value, 0).getDate()
    return Array.from({ length: lastDay }, (_, i) => i + 1)
})
</script>