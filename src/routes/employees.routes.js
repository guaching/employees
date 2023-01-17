import { Router } from "express";
import { createEmployees, deleteEmployes, getEmployee, updatesEmployes, updatesEmploye } from "../controllers/employees.controlers.js";

const router = Router()

// router.get('/employees', getEmployees)

router.post('/employees/:id', getEmployee)

router.post('/employees', createEmployees)

router.get('/update/:id', updatesEmployes)

router.post('/update/:id', updatesEmploye)

router.get('/delete/:id', deleteEmployes)

export default router