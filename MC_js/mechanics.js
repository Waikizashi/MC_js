//--------------------------------Import classes-------------------------------//

//--------------------------------Import functions-----------------------------//

import {Tools} from './tools.js'

//--------------------------------Import data----------------------------------//

import  {HIT, ATTACK} from './mechanicsData.js';

//--------------------------------Import selectors-----------------------------//

import {$arenas, $randomButton} from './selectors.js';

//--------------------------------Main-Class-----------------------------------//

export class Mechanics extends Tools{
    constructor() {
        super();
        this.$arenas = $arenas;
        this.$randomButton = $randomButton;
        this.HIT = HIT;
        this.ATTACK = ATTACK;
    }
//-------------------------------------functions-------------------------------//

    controlHitDefence = (defender, attacker, attackPlayer, defencePlayer) =>{
        if(defender.defence === attacker.hit){
            this.generateLogs('defence', attackPlayer, defencePlayer, attacker);//, defender);
        }else{
            defencePlayer.changeHP(attacker.hitValue);
            defencePlayer.renderHP();
            this.generateLogs('hit', attackPlayer, defencePlayer, attacker);//, defender);
        }

    }

    enemyAttack = () =>{
        let hit = this.ATTACK[this.randomize(3)-1];
        let defence = this.ATTACK[this.randomize(3)-1];
        return{
            hitValue: this.randomize(this.HIT[hit]),
            hit,
            defence,
        }
    }

    playerAttack = () =>{
        const player = {};
        for (let item of this.$control) {
            if (item.checked && item.name === 'hit') {
                player.hitValue = this.randomize(this.HIT[item.value]);
                player.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                player.defence = item.value;
            }
            item.checked = false;
        }
        return player;
    }

    winPlayer = (winner) =>{
        const $winTitle = this.createElement('div', 'winTitle');
        if(winner.name) {
            $winTitle.innerText = winner.name + '   WIN';
            this.$randomButton.disabled = true;
            return $winTitle;
        }else{
            $winTitle.innerText = 'DRAW';
            this.$randomButton.disabled = true;
            return $winTitle;
        }

    }

    showWinner = (winner) => {
        this.$arenas.appendChild(this.winPlayer(winner));
        this.createReloadButton();
    }

}
