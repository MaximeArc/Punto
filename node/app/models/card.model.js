module.exports = mongoose => {
    const Card = mongoose.model(
      "card",
      mongoose.Schema(
        {
          value: {type:Number, required:true},
          color: {type:String, required: true},
        },
        { timestamps: false }
      )
    );
  
    return Card;
  };