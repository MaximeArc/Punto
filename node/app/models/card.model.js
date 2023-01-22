module.exports = mongoose => {
    const Card = mongoose.model(
      "card",
      mongoose.Schema(
        {
          value: Number,
          color: String,
        },
        { timestamps: false }
      )
    );
  
    return Card;
  };