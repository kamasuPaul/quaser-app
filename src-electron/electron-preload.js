/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 */
import { contextBridge,ipcRenderer } from "electron";
import student from "./database/student";

contextBridge.exposeInMainWorld("api", {
  addStudent:(data)=>{
    console.log("data")
    console.log(data)
    student.create(data)
  },
  updateStudent: student.update,
  deleteStudent: student.destroy,
  getStudent: student.get,
  getAllStudents: student.getAll,
});
