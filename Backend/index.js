// inisialisasi
const express = require("express");
const cors = require("cors");
const db = require("./database");

// implementasi
const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());

// connection to database
db.connect((error) => {
    if (error) throw error;
    console.log("Mysql Connected");
});

// endpoint
app.get("/", (req, res) => {
    res.send({
        message: "Berhasil menjalankan GET",
        data: {
            description: "Endpoint ini untuk menampilkan data",
        },
    });
});

app.use("/paket", require("./routes/paket.route"));
app.use("/outlet", require("./routes/outlet.route"));
app.use("/member", require("./routes/member.route"));
app.use("/user", require("./routes/user.route"));
app.use("/transaksi", require("./routes/transaksi.route"));

const port = 8080;
app.listen(port, () => console.log(`App Running ${port}`));