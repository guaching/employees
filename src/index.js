import express, { urlencoded } from "express";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
import morgan from "morgan";
import path from "path";

const __dirname = path.resolve();
const app = express();

//settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({extends: false}))
app.use(indexRoutes);
app.use("/api", employeesRoutes);

//routes
app.use((req, res, next) => {
  res.status(404).json({message: "Not Found"})
});

app.listen(3000);

console.log(`Server on port ${3000}`);
