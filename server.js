require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");

const connectDB = require("./config/db");
const hbsHelpers = require("./helpers/hbsHelpers");
require("./helpers/passportLocalStrategy");
const app = express();
const { PORT, NODE_ENV, SESSION_SECRET, MONGO_URI, SESSION_TTL } = process.env;
const APP_PORT = process.env.PORT || PORT;

// Connect DB
connectDB();

// Express config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Express Session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: Number(SESSION_TTL) },
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
  })
);
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Logging
if (process.env.NODE_ENV !== "production" || NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Template
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: hbsHelpers,
  })
);
app.set("view engine", ".hbs");

// Variable locals
app.use((req, res, next) => {
  res.locals.title = "S-Task";
  if (req.user) {
    // console.log(req.user);
    res.locals.userName = req.user.username;
  }
  res.locals.toast_type = req.flash("toast-type");
  res.locals.toast_content = req.flash("toast-content");
  next();
});

// Routes
const { userAuthenticated } = require("./middleware/userAuthenticated");
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));
app.use("/list", userAuthenticated, require("./routes/list"));
app.use("/task", userAuthenticated, require("./routes/task"));

app.use((req, res) => {
  if (res.status(400)) {
    res.render("error/404", { layout: "noheader" });
  }
});

app.listen(APP_PORT, console.log(`Server running ${NODE_ENV} at http://localhost:${APP_PORT} `));
