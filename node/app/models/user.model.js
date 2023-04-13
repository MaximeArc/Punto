module.exports = mongoose => {
    return mongoose.model(
        "user",
        mongoose.Schema(
            {
                name: {type: String, required: true},
                email: {type: String, required: true},
                password: {type: String, required: true},
                played: {type: Number, default: 0},
                victory: {type: Number, default: 0},
            },
            {timestamps: false}
        )
    );
};