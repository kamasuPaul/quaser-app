<template>
  <q-page padding>
    <div class="row q-py-md justify-end">
      <div v-if="selected.length > 0" class="col-auto column q-mx-sm">
        <q-btn
          @click="editIncome"
          color="primary"
          size="sm"
          icon="edit"
          label="Edit"
        />
      </div>
      <div v-if="selected.length > 0" class="col-auto column">
        <q-btn
          @click="deleteIncome"
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
          label="Add Income"
        />
      </div>
      <div class="col-auto column">
        <q-btn
          @click="getAllIncomes"
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
          title="Incomes"
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
              v-model="income.amount"
              label="Amount"
              stack-label
              :dense="dense"
            />

            <q-input
              outlined
              v-model="income.description"
              label="Description"
              stack-label
              :dense="dense"
            />
            <q-input
              outlined
              v-model="income.reference_number"
              label="Reference Number"
              stack-label
              :dense="dense"
            />
            <q-input outlined v-model="income.date" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date today-btn v-model="income.date">
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
              @click="addIncome"
            />
            <q-btn
              color="black"
              v-if="dialog.mode == 'edit'"
              label="Update"
              @click="updateIncome"
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
        title: "Add income details",
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
      income: {
        amount: "",
        description: "",
        date: new Date(),
        reference_number: "",
      },
    };
  },
  mounted() {
    this.getAllIncomes();
  },
  methods: {
    addIncome() {
      const income = {
        amount: this.income.amount,
        description: this.income.description,
        date: this.income.date,
        reference_number: this.income.reference_number,
      };
      window.api.addIncome(income).then((res) => {
        this.rows.push(income);
        this.dialog.show = false;
      });
    },
    getIncome() {
      return window.api.getIncome();
    },
    getAllIncomes() {
      const incomes = window.api.getAllIncomes();
      incomes.then((data) => {
        this.rows = data;
        console.log(this.rows);
      });
    },
    deleteIncome() {
      const id = this.selected[0].id;
      window.api.deleteIncome(id).then((data) => {
        this.rows = this.rows.filter((row) => {
          return row.id !== id;
        });
      });
    },
    editIncome() {
      this.dialog.title = "Edit Income details";
      this.dialog.mode = "edit";
      this.dialog.show = true;
      this.income = this.selected[0];
    },
    updateIncome() {
      const id = this.income.id;
      const income = {
        amount: this.income.amount,
        date: this.income.date,
        description: this.income.description,
        reference_number: this.income.reference_number,
      };
      window.api.updateIncome(id, income).then((res) => {
        const index = this.rows.findIndex((element, index) => {
          if (element.id === id) {
            return true;
          }
        });
        this.rows.splice(index, 1);
        this.rows.splice(index, 0, this.income);
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
