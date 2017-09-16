const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");

//The default name for the property is user,
// but this is the name of an instance of our Mongoose User model,
// so we’ll set it to payload to avoid confusion.
const auth = jwt({
    secret: "MY_SECRET",
    userProperty: "payload"
});

const ctrlProfile = require("../controllers/profile");
const ctrlAuth = require("../controllers/authentication");
const ctrUserList = require("../controllers/userlist");
const ctrProjectForm = require("../controllers/project-form");
const ctrProject = require("../controllers/project");
const ctrNewsForm = require("../controllers/news-form");

// профиль
router.get("/profile", auth, ctrlProfile.profileRead);

// пользователи
router.get("/user/:username", ctrlProfile.profileByUsername);
router.get("/user/:username/created", ctrProject.projectsByUsername);

// аутентификация c верификацией
router.post("/register", ctrlAuth.register);
router.get("/verify", ctrlAuth.verification);
router.post("/login", ctrlAuth.login);

// список пользователей для админа
router.get("/userlist", ctrUserList.list);

// действия с проектами
router.post("/project/new", ctrProjectForm.createProject);

router.get("/project/:pageId", ctrProject.projectByPageId);
router.get("/project/:pageId/done", ctrProject.projectMarkDone);
router.get("/project/:pageId/close", ctrProject.projectMarkClosed);
router.get("/project/:pageId/donate/:value", ctrProject.projectDonate);

router.get("/projects/new", ctrProject.newProjects);
router.get("/projects/all", ctrProject.projects);
router.get("/projects/actual", ctrProject.actualProjects);

// действия с новостями
router.post("/news/new", ctrNewsForm.createNews);

module.exports = router;