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
            defencePlayer.changeHP(attacker.value);
            defencePlayer.renderHP();
            this.generateLogs('hit', attackPlayer, defencePlayer, attacker);//, defender);
        }

    }


    // enemyAttack = () =>{
    //     let hit = this.ATTACK[this.randomize(3)-1];
    //     let defence = this.ATTACK[this.randomize(3)-1];
    //     return{
    //         hitValue: this.randomize(this.HIT[hit]),
    //         hit,
    //         defence,
    //     }
    // }

    // playerAttack = () =>{
    //     const player = {};
    //     for (let item of this.$control) {
    //         if (item.checked && item.name === 'hit') {
    //             player.hitValue = this.randomize(this.HIT[item.value]);
    //             player.hit = item.value;
    //         }
    //         if (item.checked && item.name === 'defence') {
    //             player.defence = item.value;
    //         }
    //         item.checked = false;
    //     }
    //     return player;
    // }

    getHitsData = async (hit, defence) =>{
        return await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(response => response.json().catch(error => console.log(error.message)));
    }

    fight = async () =>{

        const choice = {};
        
        for (let item of this.$control) {
            if (item.checked && item.name === 'hit') {
                choice.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                choice.defence = item.value;
            }
            item.checked = false;
        }
        return this.getHitsData(choice.hit, choice.defence);
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
