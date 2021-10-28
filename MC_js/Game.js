//--------------------------------Import classes-------------------------------//

import {Mechanics} from './mechanics.js'
import {Player} from "./ClassPlayer.js";

//--------------------------------Import functions-----------------------------//

//--------------------------------Import data----------------------------------//

import {player1 as p1, player2 as p2} from './data.js';

//--------------------------------Import selectors-----------------------------//

//--------------------------------Main-Class-----------------------------------//

export class Game extends Mechanics{
//--------------------------------Constructor----------------------------------//

    constructor() {
        super();
        this.player1 = new Player(p1);
        this.player2 = new Player(p2);
    }
//--------------------------------Main-functions-------------------------------//

    controlEvent = () =>{
        this.$control.addEventListener('submit', (e) => {
            e.preventDefault();

            const enemy = this.enemyAttack();
            const dire = this.playerAttack();

            this.controlHitDefence(dire, enemy, this.player1, this.player2);
            this.controlHitDefence(enemy, dire, this.player2, this.player1);
            if (this.player1.hp<= 0 && !(this.player2.hp <=0)) {this.showWinner(this.player2); this.generateLogs('end', this.player2, this.player1)}
            if (this.player2.hp<= 0 && !(this.player1.hp <=0)) {this.showWinner(this.player1); this.generateLogs('end', this.player1, this.player2)}
            if (this.player2.hp<= 0 && this.player1.hp<= 0) {this.showWinner(0); this.generateLogs('draw', {}, {})}

        })
    }

    createPlayer = ({player, hp, name, img}) =>{
        const $player = this.createElement('div', 'player' + player);
        const $progressBar = this.createElement('div', 'progressbar');
        const $life = this.createElement('div', 'life');
        const $name = this.createElement('div', 'name');
        const $character = this.createElement('div', 'character');

        const $img = this.createElement('img');

        $life.style.width = hp + '%';
        $name.innerText = name;
        $img.src = img;

        $progressBar.appendChild($life);
        $progressBar.appendChild($name);

        $character.appendChild($img);

        $player.appendChild($progressBar);
        $player.appendChild($character);

        return $player;
    }

    start = () =>{
        this.controlEvent();
        this.$arenas.appendChild(this.createPlayer(this.player1));
        this.$arenas.appendChild(this.createPlayer(this.player2));
        this.generateLogs('start', this.player1, this.player2);
    }
}
//--------------------------------End------------------------------------------//
