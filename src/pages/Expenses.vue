<template>
  <q-page padding>
    <div class="row q-py-md justify-end">
      <div v-if="selected.length > 0" class="col-auto column q-mx-sm">
        <q-btn
          @click="editExpense"
          color="primary"
          size="sm"
          icon="edit"
          label="Edit"
        />
      </div>
      <div v-if="selected.length > 0" class="col-auto column">
        <q-btn
          @click="deleteExpense"
          color="red"
          size="sm"
          icon="delete"
          label="Delete"
        />
      </div>
      <div class="col-auto column q-mx-sm">
        <q-btn
          @click="dialog.show = true"
          color="secondary"
          size="md"
          icon="add_circle"
          label="Add Expense"
        />
      </div>
      <div class="col-auto column">
        <q-btn
          @click="getAllExpenses"
          color="secondary"
          size="md"
          icon="refresh"
          label="Refresh"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-table
          class="my-sticky-column-table"
          title="Expenses"
          :rows="rows"
          :columns="columns"
          selection="single"
          v-model:selected="selected"
          row-key="id"
        />
      </div>
    </div>
    <q-dialog
      v-model="dialog.show"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
              >Minimize</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
              >Maximize</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">{{ dialog.title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md q-gutter-md" style="max-width: 600px">
            <q-input
              outlined
              v-model="expense.amount"
              label="Amount"
              stack-label
              :dense="dense"
            />

            <q-input
              outlined
              v-model="expense.description"
              label="Description"
              stack-label
              :dense="dense"
            />
            <q-input
              outlined
              v-model="expense.reference_number"
              label="Reference Number"
              stack-label
              :dense="dense"
            />
            <q-input outlined v-model="expense.date" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date today-btn v-model="expense.date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="q-pa-md q-gutter-sm">
            <q-btn color="purple" v-close-popup label="Cancel" />
            <q-btn
              color="black"
              v-if="dialog.mode == 'add'"
              label="Save"
              @click="addExpense"
            />
            <q-btn
              color="black"
              v-if="dialog.mode == 'edit'"
              label="Update"
              @click="updateExpense"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from "vue";
const columns = [
  {
    name: "date",
    required: true,
    label: "Date",
    align: "left",
    field: (row) => row.date,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "amount",
    align: "center",
    label: "Amount",
    field: "amount",
    sortable: true,
  },
  {
    name: "receipt_no",
    label: "Receipt number",
    field: "reference_number",
    sortable: true,
  },
  { name: "from", label: "From (Product/Service)", field: "description" },
];

const rows = [];
export default {
  setup() {
    return {
      columns,
      rows: ref(rows),
      dialog: ref({
        show: false,
        title: "Add expense details",
        mode: "add",
      }),
      maximizedToggle: ref(true),
      model: ref(null),
      selected: ref([]),
      classes: ["Baby", "Middle", "Top", "P.1", "P.2"],
      genderOptions: ["Male", "Female"],
      residencyOptions: ["Day", "Boarding"],
    };
  },
  data() {
    return {
      expense: {
        amount: "",
        description: "",
        date: new Date(),
        reference_number: "",
      },
    };
  },
  mounted() {
    this.getAllExpenses();
  },
  methods: {
    addExpense() {
      const expense = {
        amount: this.expense.amount,
        description: this.expense.description,
        date: this.expense.date,
        reference_number: this.expense.reference_number,
      };
      window.api.addExpense(expense).then((res) => {
        this.rows.push(expense);
        this.dialog.show = false;
      });
    },
    getExpense() {
      return window.api.getExpense();
    },
    getAllExpenses() {
      const expenses = window.api.getAllExpenses();
      expenses.then((data) => {
        this.rows = data;
        console.log(this.rows);
      });
    },
    deleteExpense() {
      const id = this.selected[0].id;
      window.api.deleteExpense(id).then((data) => {
        this.rows = this.rows.filter((row) => {
          return row.id !== id;
        });
      });
    },
    editExpense() {
      this.dialog.title = "Edit Expense details";
      this.dialog.mode = "edit";
      this.dialog.show = true;
      this.expense = this.selected[0];
    },
    updateExpense() {
      const id = this.expense.id;
      const expense = {
        amount: this.expense.amount,
        date: this.expense.date,
        description: this.expense.description,
        reference_number: this.expense.reference_number,
      };
      window.api.updateExpense(id, expense).then((res) => {
        const index = this.rows.findIndex((element, index) => {
          if (element.id === id) {
            return true;
          }
        });
        this.rows.splice(index, 1);
        this.rows.splice(index, 0, this.expense);
        this.dialog.show = false;
      });
    },
  },
};
</script>
<style lang="sass">
.my-sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  /* max-width: 600px */

  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #fff

  td:first-child
    background-color: #f5f5dc

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
