<template>
  <q-page padding>
    <div class="row q-pa-md">
      <div class="col column items-end">
        <q-btn
          @click="dialog = true"
          color="secondary"
          size="md"
          icon="add_circle"
          label="Add student"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-table
          class="my-sticky-column-table"
          title="Students"
          :rows="rows"
          :columns="columns"
          row-key="name"
        />
      </div>
    </div>
    <q-dialog
      v-model="dialog"
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
          <div class="text-h6">Add student details</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md q-gutter-md" style="max-width: 600px">
            <q-input
              filled
              v-model="student.name"
              label="Name"
              stack-label
              :dense="dense"
            />
            <q-select
              outlined
              v-model="student.class"
              :options="classes"
              label="Outlined"
            />
          </div>
          <div class="q-pa-md q-gutter-sm">
            <q-btn color="purple" v-close-popup label="Cancel" />
            <q-btn color="black" label="Save" @click="addStudent" />
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
    name: "name",
    required: true,
    label: "Names",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Class",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Residency", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
];
export default {
  setup() {
    return {
      columns,
      rows:ref(rows),
      dialog: ref(false),
      maximizedToggle: ref(true),
      model: ref(null),
      classes: ["Baby", "Middle", "Top", "P.1", "P.2"],
    };
  },
  data() {
    return {
      student: {
        name: "",
        class: "",
      },
      
    };
  },
  methods: {
    addStudent() {
      const student = this.student;
      this.dialog = false;
      this.rows.push({
        name: student.name,
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: student.class,
        iron: "1%",
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
