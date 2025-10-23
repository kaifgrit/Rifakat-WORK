const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  colorName: { type: String, required: true },
  colorHexCode: { type: String },
  // Support both old and new format for images
  imageUrls: { 
    type: [String],
    default: undefined,
    validate: {
      validator: function(v) {
        return !v || v.length > 0;
      },
      message: 'If imageUrls is provided, at least one image URL is required'
    }
  },
  imageUrl: { 
    type: String,
    required: function() {
      return !this.imageUrls || this.imageUrls.length === 0;
    }
  },
  // NEW: Available sizes for this color variation
  sizes: {
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        // Sizes must be from valid options or empty
        const validSizes = ["6", "7", "8", "9", "10", "11", "12"];
        return v.every(size => validSizes.includes(size));
      },
      message: 'Sizes must be valid shoe sizes (6-12)'
    }
  }
});

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true, trim: true },
  brand: { type: String, trim: true },
  category: {
    type: String,
    required: true,
    enum: ["Sneakers", "Boots", "Sandals", "Slippers", "Formal Shoes"],
  },
  price: { type: Number, required: true },
  colors: {
    type: [colorSchema],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one color variation is required'
    }
  },
});

// Database Indexes
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ productName: "text" });

module.exports = mongoose.model("Product", productSchema);
