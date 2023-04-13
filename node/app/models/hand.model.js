module.exports = mongoose => {
    return mongoose.model(
        "hand",
        mongoose.Schema(
            {
                hand: {type: [mongoose.model('card').schema], required: true},
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user'
                }
            },
            {timestamps: false}
        )
    );
};