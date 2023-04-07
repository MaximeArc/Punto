module.exports = mongoose => {
    const Hand = mongoose.model(
        "hand",
        mongoose.Schema(
            {
                hand:{type:[mongoose.model('card').schema], required:true}
            },
            { timestamps: false }
        )
    );
    return Hand;
};