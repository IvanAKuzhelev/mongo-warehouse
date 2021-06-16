import product from "./createProductModel";
const handleUpdate = (req, res) => {
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
};
export default handleUpdate;
