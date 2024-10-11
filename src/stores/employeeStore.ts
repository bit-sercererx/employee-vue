import { defineStore } from 'pinia';

interface Employee {
  Name: string;
  contacts: string;
  address: string;
  dateOfBirth: string;
  dateOfHire: string;
  id: number;
}

interface Info {
  data: Employee[];
}

export const useEmployeeStore = defineStore('employeeStore', {
  state: (): Info => ({
    data: JSON.parse(localStorage.getItem('employeeData') || '[]'), // استعادة البيانات من localStorage
  }),

  actions: {
    saveToLocalStorage() {
      localStorage.setItem('employeeData', JSON.stringify(this.data));
    },

    addEmployee(employee: Employee) {
      this.data.push(employee);
      this.saveToLocalStorage(); // حفظ البيانات في localStorage
    },

    findOne(Id: number) {
      return this.data.find((item) => item.id === Id);
    },

    delete(Id: number): void {
      const index = this.data.findIndex((item) => item.id === Id);

      if (index !== -1) {
        this.data.splice(index, 1);
        this.saveToLocalStorage(); // حفظ البيانات بعد الحذف
      }
    },

    updateEmployee(Id: number, updatedEmployee: { Name: string; contacts: string; address: string; dateOfBirth: string; dateOfHire: string; }): void {
      const index = this.data.findIndex((item) => item.id === Id);

      if (index !== -1) {
        this.data[index] = { ...this.data[index], ...updatedEmployee };
        this.saveToLocalStorage(); // حفظ البيانات بعد التحديث
      }
    }
  }
});
