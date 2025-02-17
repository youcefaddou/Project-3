const prompt = require("prompt-sync")()

console.log("FIREBURST: WARRIOR STRIKE");

console.log(prompt(" TAPEZ SUR ENTRER POUR DÉMARRER "))

// Define a function for the attack feature 
function attack(attacker, target, move) {
    if (Math.random() < move.precision) {
        if (move.heal) {
            attacker.hp += move.power
            console.log(`${attacker.name} se soigne pour ${move.power} PV.`);
        } else {
            target.hp -= move.power
            console.log(`${attacker.name} utilise ${move.name} et inflige ${move.power} de dégats à ${target.name}.`);
        }
    } else {
        console.log(`${attacker.name} utilise ${move.name} mais rate !`);
    }
}
// Defining attacks for both player and computer
let playerattack = [
    { name: "Frappe Rapide", power: 10, precision: 0.50 },

    { name: "Soin Léger", power: 15, precision: 0.3333, heal: true },

    { name: "Coup Puissant", power: 20, precision: 0.3333 },

    { name: "Frappe Dévastatrice", power: 30, precision: 0.25 },
]

let computerattack = [
    { name: "Frappe Rapide", power: 10, precision: 0.50 },

    { name: "Soin Léger", power: 15, precision: 0.3333, heal: true },

    { name: "Coup Puissant", power: 20, precision: 0.3333 },

    { name: "Frappe Dévastatrice", power: 30, precision: 0.25 },
]

let player = { name: "Guerrier du feu", hp: 80, moves: playerattack }
let computer = { name: "Sombre Lutin", hp: 80, moves: computerattack }

// This will show how much HP remaining
function showStatus(fighter) {
    console.log(`${fighter.name}: ${fighter.hp} PV restants.`);

}
//Define a function for the attacking player using while loop and conditions for attack prompts and managing errors
function getPlayerMove() {
    let validnum = false
    let choice
    while (!validnum) {
        choice = prompt(" Choisisez votre attaque: 1 - Frappe Rapide // 2 - Soin Léger // 3 - Coup Puissant // 4 - Frappe Dévastatrice ")
        choice = parseInt(choice)
        if (choice >= 1 && choice <= 4) {
            validnum = true
        } else {
            console.log(" Entrée invalide: Veuillez taper 1, 2, 3 ou 4 ");

        }
    } return player.moves[choice - 1]
}
// Using loop to show PV status,calling previous functions to build the combat system and announce the winner. 
while (player.hp > 0 && computer.hp > 0) {
    showStatus(player)
    showStatus(computer)
    let playermove = getPlayerMove()
    attack(player, computer, playermove)
    if (computer.hp <= 0) {
        console.log(`${computer.name} est K.O. ${player.name} gagne !`)
        break
    }
// Randomizing the computer attacks    
    let computerMove = computer.moves[Math.floor(Math.random() * computer.moves.length)]
    attack(computer, player, computerMove)
    if (player.hp <= 0) {
        console.log(`${player.name} est K.O. ${computer.name} gagne !`);
        
    }
}
console.log(" Le combat est terminé ! GG !"); 
