const MessengerController = require("../controllers/jenkies.controller");

module.exports = (app) => {
    app.get("/api/messengers", MessengerController.findAllMessengers);
    app.post("/api/messengers", MessengerController.createMessenger);
    app.get("/api/messengers/:id", MessengerController.findOneMessenger);
    app.put("/api/messengers/:id", MessengerController.updateOneMessenger);
    app.delete("/api/messengers/:id", MessengerController.deleteMessenger);
}