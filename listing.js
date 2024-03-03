const express = require("express");
const router = express.Router();
const wrapAysnc = require("../utils/wrapAysnc.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, validateListing } = require("../middleware.js");
const { isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../CloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAysnc(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAysnc(listingController.createListing)
  );

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAysnc(listingController.show))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAysnc(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAysnc(listingController.destroyListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAysnc(listingController.editListing)
);

module.exports = router;
