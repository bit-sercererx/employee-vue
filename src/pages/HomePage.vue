<script setup lang="ts">
import { ref } from "vue";
import { useEmployeeStore } from "@/stores/employeeStore";

const employee = useEmployeeStore();
const items = employee.data;
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const editedIndex = ref(-1);

const newEmployee = ref({
  Name: "",
  contacts: "",
  address: "",
  dateOfBirth: "",
  dateOfHire: "",
  id: "",
});


const headers = [
  { title: "Name", value: "Name" },
  { title: "Contact", value: "contacts" },
  { title: "Address", value: "address" },
  { title: "Date of Birth", value: "dateOfBirth" },
  { title: "Date of Hire", value: "dateOfHire" },
  { title: "Actions", value: "actions" },
];

const formatTitle = () => {
  return editedIndex.value === -1 ? "New Employee" : "Edit Employee";
};

const resetForm = () => {
  newEmployee.value = {
    Name: "",
    contacts: "",
    address: "",
    dateOfBirth: "",
    dateOfHire: "",
    id: "",
  };
};



const editEmployee = (item) => {
  
  editedIndex.value = item.id
  newEmployee.value = { ...item }; 
  dialogVisible.value = true; 
};

const addOrEditEmployee = () => {


if (editedIndex.value === -1) {
  newEmployee.value.id = items.length + 1; 
  employee.addEmployee(newEmployee.value);
} else {
  employee.updateEmployee(editedIndex.value,newEmployee.value)
}
resetForm();
dialogVisible.value = false;
editedIndex.value = -1;
};





const deleteValue=ref<Number>()


const confirmDeleteEmployee = (item:Number) => {
  deleteDialogVisible.value = true;
  deleteValue.value=item

};


const deleteEmployee = () => {
  console.log(deleteValue.value);
  employee.delete(deleteValue.value)
  deleteDialogVisible.value = false;
  editedIndex.value = -1;
};


</script>

<template>
  <div>
    <VDataTable :items="items" :headers="headers">
      <template v-slot:top>
        <VToolbarTitle>Employee List</VToolbarTitle>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <VDialog v-model="dialogVisible" max-width="800px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              New Employee
            </v-btn>
          </template>
          <VCard>
            <VCardTitle class="mt-3">
              <span class="text-h5">{{ formatTitle() }}</span>
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
              <VBtn color="primary" @click="addOrEditEmployee">Save</VBtn>
            </VCardActions>
          </VCard>
        </VDialog>

        <VDialog v-model="deleteDialogVisible" max-width="500px">
          <VCard>
            <VCardTitle class="text-h5">
              Are you sure you want to delete this employee?
            </VCardTitle>
            <VCardActions >
             
                <VBtn color="blue-darken-1" @click="deleteEmployee">OK</VBtn>
                <VBtn color="red" @click="deleteDialogVisible = false">Cancel</VBtn>
              </VCardActions>

          </VCard>
        </VDialog>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <VIcon @click="editEmployee(item)" icon="mdi-pencil" />
        <VIcon @click="confirmDeleteEmployee(item.id)" icon="mdi-delete" />
        <RouterLink :to="{ name: 'InfoPage', params: { id: item.id } }">
          <VIcon icon="mdi-eye" />
        </RouterLink>
      </template>
    </VDataTable>
  </div>
</template>
