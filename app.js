import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const { Schema } = mongoose;
const app = express();
const port = 3333;
app.use(cors());
app.use(express.json());
const schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
    imageUrl: { type: String, required: false },
});
const product = mongoose.model("product", schema);
mongoose.connect("mongodb://localhost:27017/warehouse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => { });
app.get("/", (req, res) => {
    product
        .find((err, products) => {
        if (err)
            console.log(err);
        res.send(products);
    })
        .limit(25)
        .select("-__v");
});
app.get("/images/:id", (req, res) => { });
app.get("/products", (req, res) => {
    const dbquery = {};
    const itemsPerPage = 25;
    if (req.query.present) {
        dbquery.count = { $gt: 0 };
    }
    if (req.query.search && typeof req.query.search == "string") {
        dbquery.name = { $regex: req.query.search, $options: "i" };
    }
    if (Number(req.query.maxprice)) {
        dbquery.price = { $lt: Number(req.query.maxprice) };
    }
    const data = {
        totalCount: 0,
        items: [],
    };
    const asyncDbquery = async () => {
        await Promise.all([
            product.countDocuments(dbquery, (err, docCount) => {
                console.log(docCount);
                data.totalCount = docCount;
                console.log(data);
            }),
            product
                .find(dbquery, (err, products) => {
                if (err)
                    console.log(err);
                data.items = products;
            })
                .sort({ price: -1, _id: 1 })
                .skip(Number(req.query.page) > 0
                ? (Number(req.query.page) - 1) * itemsPerPage
                : 0)
                .limit(itemsPerPage),
        ]);
    };
    asyncDbquery().then(() => res.send(data));
});
app.get("/products/:id", (req, res) => {
    console.log(req.params.id);
    product.find({ _id: req.params.id }, (err, product) => {
        if (err)
            console.log(err);
        res.send(product);
    });
});
app.patch("/products/:id", (req, res) => {
    let pendingProduct;
    product
        .find({ _id: req.params.id }, (err, product) => {
        if (err)
            console.log(err);
        [pendingProduct] = product;
    })
        .then(() => {
        const update = {};
        console.log(req.body);
        if (req.body.name.new && req.body.name.old === pendingProduct.name) {
            update.name = req.body.name.new;
        }
        if (req.body.price.new && req.body.price.old === pendingProduct.price) {
            update.price = req.body.price.new;
        }
        if (req.body.count.new && req.body.count.old === pendingProduct.count) {
            update.count = req.body.count.new;
        }
        product.findOneAndUpdate({ _id: req.params.id }, update, { new: true }, (err, prod) => {
            if (err) {
                console.log(err);
            }
            res.send(prod);
        });
    });
});
app.delete("/products/:id", (req, res) => {
    product
        .deleteOne({ _id: req.params.id }, (err) => {
        console.log(err);
    })
        .then(() => res.sendStatus(204));
});
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});
