const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
} = require("../controllers/contactcontroller");

router.use(validateToken);
//instead of writing above 5 lines we can write below code in two lines
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;