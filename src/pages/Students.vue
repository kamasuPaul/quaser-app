<template>
  <q-page padding>
    <div class="row q-py-md justify-end">
      <div class="col-auto column q-mx-sm ">
        <q-btn
          @click="dialog = true"
          color="secondary"
          size="md"
          icon="add_circle"
          label="Add student"
        />
      </div>
      <div class="col-auto column">
        <q-btn
          @click="getAllStudents"
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
              outlined
              v-model="student.name"
              label="Name"
              stack-label
              :dense="dense"
            />
            <q-select
              outlined
              v-model="student.class"
              :options="classes"
              label="Class"
            />
            <q-select
              outlined
              v-model="student.gender"
              :options="genderOptions"
              label="Gender"
            />
            <q-select
              outlined
              v-model="student.residency"
              :options="residencyOptions"
              label="Residency"
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
    name: "class",
    align: "center",
    label: "Class",
    field: "class",
    sortable: true,
  },
  { name: "gender", label: "Gender", field: "gender", sortable: true },
  { name: "residency", label: "Residency", field: "residency" },
];

const rows = [];
export default {
  setup() {
    return {
      columns,
      rows: ref(rows),
      dialog: ref(false),
      maximizedToggle: ref(true),
      model: ref(null),
      classes: ["Baby", "Middle", "Top", "P.1", "P.2"],
      genderOptions: ["Male", "Female"],
      residencyOptions: ["Day", "Boarding"],
    };
  },
  data() {
    return {
      student: {
        name: "",
        class: "",
        gender: "",
        residency: "",
      },
    };
  },
  mounted() {
    this.getAllStudents();
  },
  methods: {
    addStudent() {
      const student = {
        name: this.student.name,
        class: this.student.class,
        gender: this.student.gender,
        residency: this.student.residency,
      };
      this.dialog = false;
      this.rows.push(student);
      window.api.addStudent(student);
    },
    getStudent() {
      return window.api.getStudent();
    },
    getAllStudents() {
      const students = window.api.getAllStudents();
      students.then((data) => {
        this.rows = data;
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
