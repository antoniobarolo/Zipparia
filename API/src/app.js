"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("teem");
const appsettings = require("./appsettings");
app.run({
    root: appsettings.root,
    staticRoot: "",
    sqlConfig: appsettings.sqlPool,
    htmlErrorHandler: function (err, req, res, next) {
        res.status(err.status || 500);
        if (req.path.indexOf("/api/") >= 0) {
            res.json(err.status == 404 ? "Não encontrado" : (err.message || err.toString()));
        }
        else if (err.status == 404) {
            res.render("shared/erro", { layout: "layout-externo" });
        }
        else {
            res.render("shared/erro", { layout: "layout-externo", mensagem: err.message, erro: err });
        }
    }
});
//# sourceMappingURL=app.js.map