import { defineStore } from 'pinia';

interface Employee {
  Name: string;
  contacts: string;
  address: string;
  dateOfBirth: string;
  dateOfHire: string;
  id: number
}

interface Info {
  data: Employee[];
}

export const useEmployeeStore = defineStore('employeeStore', {
  state: (): Info => ({
    data: [
      {
        Name: "John Doe",
        contacts: "john.doe@example.com",
        address: "123 Main St, Springfield, IL, 62701",
        dateOfBirth: "1990-05-15",
        dateOfHire: "2020-01-10",
        id: 1
      }
    ],

  }),

  actions: {
    addEmployee(employee: Employee) {
      this.data.push(employee);
    },

    findOne(Id: number) {
      return this.data.find((item) => item.id === Id)
    }
  }

});
