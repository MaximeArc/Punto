module.exports = mongoose => {
    return mongoose.model(
        "card",
        mongoose.Schema(
            {
                value: {type: Number, required: true},
                color: {type: String, required: true},
            },
            {timestamps: false}
        )
    );
  };