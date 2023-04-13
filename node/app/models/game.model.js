module.exports = mongoose => {
    return mongoose.model(
        "game",
        mongoose.Schema(
            {
                board: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'board',
                    required: true,
                    default: []
                },
                users: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user'
                }],
                hands: [[{
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user',
                    },
                    hand: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'hand'
                    }
                }]],
                turn: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                    required: true
                },
                score: [
                    {
                        user: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'user',
                            required: true
                        },
                        value: {
                            type: Number,
                            required: true,
                            default: 0
                        }
                    }
                ]
            },
            {timestamps: true}
        )
    );
};