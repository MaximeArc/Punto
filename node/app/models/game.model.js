module.exports = mongoose => {
    const Game = mongoose.model(
        "game",
        mongoose.Schema(
            {
                board:{type:mongoose.model('board').schema, required:true},
                data1:{
                    user: {type:mongoose.model('user').schema, required:true},
                    hand: {type:mongoose.model('hand').schema, required:true}
                },
                data2:{
                    user: {type:mongoose.model('user').schema, required:true},
                    hand: {type:mongoose.model('hand').schema, required:true}
                },
                data3:{
                    user: {type:mongoose.model('user').schema},
                    hand: {type:mongoose.model('hand').schema}
                },
                data4:{
                    user: {type:mongoose.model('user').schema},
                    hand: {type:mongoose.model('hand').schema}
                },
                turn: {type:mongoose.model('user').schema,required:true}

            },
            { timestamps: true }
        )
    );

    return Game;
};