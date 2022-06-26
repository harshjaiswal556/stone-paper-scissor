const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const game = require("./models/schema");
const fs = require("fs");
require("./db/conn");

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/game/start", (req, res) => {
    res.render("start");
})
// fs.appendFileSync("game.json","[");
app.post("/game/start", (req, res) => {
    fs.appendFileSync("game.txt","[");
    for (let k = 0; k < 50; k++) {
        
        let choice = [];

        for (let i = 0; i < 4; i++) {
            let number = Math.floor(Math.random() * 3);
            if (number == 0) {
                choice[i] = "Rock"
            }
            else if (number == 1) {
                choice[i] = "Paper"
            }
            else if (number == 2) {
                choice[i] = "Scissor"
            }
        }

        function Create2DArray(rows) {
            var arr = [];

            for (var i = 0; i < rows; i++) {
                arr[i] = [];
            }

            return arr;
        }

        let point = Create2DArray(100);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {

                if (choice[i] == "Rock" && choice[j] == "Scissor") {
                    point[i][j] = 1;
                }
                else if (choice[i] == "Paper" && choice[j] == "Rock") {
                    point[i][j] = 1;
                }
                else if (choice[i] == "Scissor" && choice[j] == "Paper") {
                    point[i][j] = 1;
                }
                else {
                    point[i][j] = 0;
                }
            }
        }
        const result = new game({
            player1: choice[0],
            player2: choice[1],
            player3: choice[2],
            player4: choice[3],
            player1VS: {
                p2: point[0][1],
                p3: point[0][2],
                p4: point[0][3]
            },
            player2VS: {
                p1: point[1][0],
                p3: point[1][2],
                p4: point[1][3]
            },
            player3VS: {
                p1: point[2][0],
                p2: point[2][1],
                p4: point[2][3]
            },
            player4VS: {
                p1: point[3][0],
                p2: point[3][1],
                p3: point[3][2]
            }
        });
        result.save();
        const data = JSON.stringify(result);
        if(k===49){
            fs.appendFileSync("game.txt", `${data}\n`);
        }
        else{
            fs.appendFileSync("game.txt", `${data},\n`);
        }
    }

    fs.appendFileSync("game.txt","]");
    fs.renameSync("game.txt","game.json");
    res.send("Game data is stored");
});

app.get("/game/result",async(req,res) => {
    try{
        const gameData = await game.find();
        res.send(gameData);
    }catch(err){
        console.log(err);
    }
})
app.listen(port, () => {
    console.log("listening on port " + port);
});
