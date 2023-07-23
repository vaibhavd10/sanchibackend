import express from "express";
import Product from "../model/productSchema.js";
import authMiddleware from "../middleware/authenticate.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  console.log("body-unit----", req.body.unit);
  const { productname, unit, price, MRP } = req?.body;
  console.log("unit-----", unit);

  try {
    const productdata = await new Product({
      productname,
      unit,
      price,
      MRP,

      // MRP: parseFloat(price), //converting string to float for decimal value of money
      // Price :parseFloat(MRP)*0.85  //calculating discounted price as
    });

    const prod = await productdata.save();
    res
      .status(201)
      .json({ message: "Product Data added", status: true, proddata: prod });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// all product details
router.get("/get", async (req, res) => {
  try {
    let product = await Product.find();
    // console.log("product ---", product);
    res.status(200).json({ productlist: product });
  } catch (error) {
    console.log("Product list get err --", error);
    res.status(500).json({ error: error });
  }
});

// Single Product Get by using product id
router.get("/get/:id", async (req, res) => {
  const { id } = req?.params;
  try {
    let products = await Product.findById(id);
    res
      .status(200)
      .json({ product: products, message: "product get successfully" });
  } catch (error) {
    console.log("single product get errr---", error);
    res.status(500).json({ error: error, message: "Product Not found" });
  }
});

// update Product by Admin
router.put("/update/:id", async (req, res) => {
  console.log("req-----", req.body);
  const { productname, unit, price, MRP } = req?.body.updateProduct;
  const { id } = req?.params;

  try {
    const prod = await Product.findByIdAndUpdate(
      id,
      {
        productname,
        unit,
        price,
        MRP,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ updateProduct: prod, message: "Product Updated Successfully" });
  } catch (error) {
    console.log("Product list update err --", error);
    res.status(500).json({ error: error, message: "Product not updated" });
  }
});

// Update product price by admin & distributor
router.put("/:id/updatePrice", authMiddleware, async (req, res) => {
  const { price } = req?.body;
  const { id } = req?.params;
  console.log("id ---", id);

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).send("Product not found");
    }

    // const updatedProduct = await Product.findByIdAndUpdate(id,{
    //   $set: {price}
    // },{new : true});

    const updatedProduct = await Product.findById(id);

    // Save price change to product history
    const historyEntry = {
      price: price,
      updatedBy: req?.user._id, // Assuming you have the user's ID from the authentication middleware.
    };
    console.log("his---", historyEntry);
    updatedProduct.history.push(historyEntry);
    console.log("updated product -- ", updatedProduct.history);
    await updatedProduct.save();

    res.status(200).json({ message: "Product price updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// delete product
router.delete("/delete/:id", async (req, res) => {
  const { id } = req?.params;
  try {
    await Product.findByIdAndRemove(id);
    res.status(200).json({ message: `Product Deleted ` });
  } catch (error) {
    console.log("delete time product err --", error);
    res.status(500).json({ error: error, message: "Something went wrong" });
  }
});

export default router;
