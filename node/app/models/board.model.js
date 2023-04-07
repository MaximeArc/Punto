module.exports = mongoose => {
    const Board = mongoose.model(
        "board",
        mongoose.Schema(
            {
                grid:{type:Array, default:Array(11)
                        .fill(null)
                        .map(() => Array(11).fill(null))}
            },
            { timestamps: false }
        )
    );
    return Board;
};