new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var playerDamage = this.calculateDamage(3, 10);
            this.monsterHealth -= playerDamage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits Monster for " + playerDamage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function () {
            var playerHardDamage = this.calculateDamage(10, 20);
            this.monsterHealth -= playerHardDamage;
            if (this.checkWin()) {
                return;
            }
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits Monster hard for " + playerHardDamage
            });

            this.monsterAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits heals for 10"
            });

            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function () {
            var monsterDamage = this.calculateDamage(5, 12);
            this.playerHealth -= monsterDamage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits Player for " + monsterDamage
            })
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if(confirm("You Won! New Game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm("You lost! New Game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});