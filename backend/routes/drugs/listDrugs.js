import validateAuth from "../../utils/validateAuth.js";
import {router, db} from "../../index.js";

router.post("/api/v1/listDrugs", (req, res) => {
    const validSession = validateAuth(req);
    if (!validSession) return res.status(401).json({status: "error", data: "Invalid Authorization"});

    try {
        const page = req.body.page || 0;
        const limit = req.body.limit || 15;

        const filter = req.body.filter || [];

        const filterSQL = "WHERE " + filter.map(x => `${Object.keys(x)[0]} LIKE '%${x[Object.keys(x)[0]]}%'`).join(" AND ");

        const countTransaction = db.prepare(`SELECT COUNT(idDrug) from drugs ${filter.length >= 1 ? filterSQL : ""};`).get();

        const count = Math.floor(countTransaction[Object.keys(countTransaction)[0]] / limit);

        const list = db.prepare(`SELECT * FROM drugs ${filter.length >= 1 ? filterSQL : ""} ORDER BY ${req.body.orderBy || "idDrug"} ${req.body.descending === true ? "DESC" : "ASC"} LIMIT @limit OFFSET @page;`).all(
            {
                limit: limit,
                page: page * (limit || 15) || 0
            },
        );

        res.json({
            status: "success",
            metadata: {
                currentPage: req.body.page || 0,
                pageCount: count,
                results: list.length,
            },
            data: list,
        });

    } catch (err) {
        res.json({status: "error", error: err.toString()});
    }
});