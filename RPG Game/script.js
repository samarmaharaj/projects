let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ['stick'];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dragger",
        power: 10
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "kalkasur",
        level: 5,
        health: 20
    },
    // {
    //     name: "ungali mala",
    //     level: 15,
    //     power: 70
    // },
    {
        name: "bashmasur",
        level: 25,
        health: 180
    },
    {
        name: "Ravanasur",
        level: 50,
        health: 350
    }
];
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightRavanasur],
        text: 'You are in a town square. Now you can see the sign \"store\".'
    },
    {
        name: "Store",
        "button text": ["Buy 10 health ( 10 Gold )", "Buy 20 weapon ( 30 Gold )", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: 'You entered the store.'
    },
    {
        name: "Cave",
        "button text": ["Slay the beast", "fight the asur", "Go to town square"],
        "button functions": [slayKalkasur, fightBashmasur, goTown],
        text: 'You entered the cave. You see the asur.'
    },
    {
        name: "Fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: 'You are fighting the asur.'
    },
    {
        name: "Kill Asur",
        "button text": ["Go to Town Square", "Go to Town Square", "Vardan: Secret Gift"],
        "button functions": [goTown, goTown, vardan],
        text: 'The asur is dead. You have won the battle. You gain experience and gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: 'You die.'
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: 'You defeated the dragon. You win the game.'
    },
    {
        name: "Vardan",
        "button text": ["2", "7", "Go to Town Square"],
        "button functions": [pickTwo, pickSeven, goTown],
        text: 'You got a vardan. Pick a number between 1 and 10. If you pick the right number, you will get 50 Gold.'
    }
];

//initialize button

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerHTML = location["button text"][0];
    button2.innerHTML = location["button text"][1];
    button3.innerHTML = location["button text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text; // locations["text"]
}

function goStore() {
    update(locations[1])
}

function goTown() {
    update(locations[0])
}

function goCave() {
    update(locations[2])
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health."
    }
}

function buyWeapon() {
    if ( currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory + "."
        } else {
            text.innerText = "You do not have enough gold to buy weapon."
        }
    } else {
        text.innerText = "You already have the most advanced weapon.";
        button2.innerText = "Sell your old weapons for 15 Gold.";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory + ".";
    } else {
        text.innerText += "Do not sell your only weapon that you have..!"
    }
}


function slayKalkasur() {
    fighting = 0
    goFight();

}

function fightBashmasur() {
    fighting = 1
    goFight();
}

function fightRavanasur() {
    fighting = 2
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
        text.innerText += "You missed the attack.";
    }
    
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }

    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += "Your " + weapons[currentWeapon].name + " broke.";
        currentWeapon--;
    }
}

function isMonsterHit() {
    return Math.random() > 0.2 || health < 20;
}

function getMonsterAttackValue(level) {
    return Math.floor(level * 3.5) + Math.floor(Math.random() * 10);
}

function dodge() {
    text.innerHTML = "You dodge the " + monsters[fighting].name + "'s attack.";
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7) ;
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;   
    update(locations[4]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ['stick'];
    goldText.innerText = gold;
    xpText.innerText = xp;
    healthText.innerText = health;
    goTown();
}

function vardan() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickSeven() {
    pick(7);
}

function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = "You picked " + guess + ". Here are the random numbers: \n";

    for (let i = 0; i < numbers.length; i++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.includes(guess)) {
        text.innerText += "You win 50 Gold.";
        gold += 50;
        goldText.innerText = gold;
    } else {
        text.innerText += "You lose 10 Health."
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}