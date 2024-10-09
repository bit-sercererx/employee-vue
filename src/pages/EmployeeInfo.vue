<template>
  <VContainer class="d-flex justify-center align-center">
    <VCard v-if="oneEmployee" max-width="50%">
      <VCardItem>
        <VCardTitle style="font-size: 6rem"> {{ oneEmployee.Name }}</VCardTitle>
        <VCardText style="font-size: 2rem"
          >Contact: {{ oneEmployee.contacts }}</VCardText
        >
        <VCardText style="font-size: 2rem"
          >Address: {{ oneEmployee.address }}</VCardText
        >
        <VCardText style="font-size: 2rem"
          >Date of Birth: {{ oneEmployee.dateOfBirth }}</VCardText
        >
        <VCardText style="font-size: 2rem"
          >Date of Hire: {{ oneEmployee.dateOfHire }}</VCardText
        >
      </VCardItem>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
import { useEmployeeStore } from "@/stores/employeeStore";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();
const employeeStore = useEmployeeStore();
const userId = ref(Number(route.params.id));
const oneEmployee = ref();

onMounted(() => {
  const employee = employeeStore.findOne(userId.value);
  if (employee) {
    oneEmployee.value = employee;
  } else {
    console.error(`Employee with ID ${userId.value} not found.`);
  }
});
</script>
