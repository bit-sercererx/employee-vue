<script setup lang="ts">
import { ref, watch } from "vue";
import { useEmployeeStore } from "@/stores/employeeStore";

const employee = useEmployeeStore();
const items = employee.data;
const dailgo = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({
  Name: "",
  contacts: "",
  address: "",
  dateOfBirth: "",
  dateOfHire: "",
  id: "",
});

const headers = [
  { title: "Name", value: "Name", key: "name" },
  { title: "Contact", value: "contacts" },
  { title: "Address", value: "address" },
  { title: "Date of Birth", value: "dateOfBirth" },
  { title: "Date of Hire", value: "dateOfHire" },

  { title: "actions", key: "actions" },
];

const numper = ref(1);

const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const newEmployee = ref({
  Name: "",
  contacts: "",
  address: "",
  dateOfBirth: "",
  dateOfHire: "",
  id: numper.value + 1,
});
const formatTitle = () => {
  return editedIndex.value === -1 ? " New Employee" : "New Employee";
};

// const editedEmployee = (item) => {
//   editedIndex.value = items.indexOf(item);
// };

const addNewEmployee = () => {
  employee.addEmployee(newEmployee.value);
  resetForm();
  dialogVisible.value = false;
};

const resetForm = () => {
  newEmployee.value = {
    Name: "",
    contacts: "",
    address: "",
    dateOfBirth: "",
    dateOfHire: "",
  };
};
</script>
<template>
  <div>
    <VDataTable :items="items" :headers="headers">
      <template v-slot:top>
        <VToolbarTitle> Employee List </VToolbarTitle>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <VDialog v-model="dailgo" max-width="800px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              New Employee
            </v-btn>
          </template>
          <VCard>
            <VCardTitle class="mt-3">
              <span class="text-h5">{{ formatTitle() }}}</span>
            </VCardTitle>
            <VCardText>
              <VContainer>
                <VRow>
                  <VCol cols="12">
                    <v-text-field
                      v-model="newEmployee.Name"
                      label="Name"
                      required
                      :rules="[(v) => !!v || 'Name is required']"
                    ></v-text-field>
                    <v-text-field
                      v-model="newEmployee.contacts"
                      label="Contact"
                      required
                      :rules="[(v) => !!v || 'Contact is required']"
                    ></v-text-field>
                    <v-text-field
                      v-model="newEmployee.address"
                      label="Address"
                      required
                      :rules="[(v) => !!v || 'Address is required']"
                    ></v-text-field>
                    <v-text-field
                      v-model="newEmployee.dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="newEmployee.dateOfHire"
                      label="Date of Hire"
                      type="date"
                      required
                    ></v-text-field>
                  </VCol>
                </VRow>
              </VContainer>
            </VCardText>
            <VCardActions>
              <VBtn color="primary" @click="addNewEmployee">Save</VBtn>
            </VCardActions>
          </VCard>
        </VDialog>

        <v-dialog v-model="deleteDialogVisible" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this item?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1">OK</v-btn>
              <v-btn color="red" @click="deleteDialogVisible = false"
                >Cancel</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <template>
          <VIcon icon="mdi-delete" />
          <VIcon icon="mdi-pencil" />
        </template>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <VIcon @click="console.log(item)" icon="mdi-pencil" />
        <VIcon @click="console.log(item)" icon="mdi-delete" />
        <RouterLink :to="{ name: 'InfoPage', params: { id: item.id } }">
          <VIcon icon="mdi-eye" />
        </RouterLink>
      </template>
    </VDataTable>
  </div>
</template>
