//--------------------------------Import functions-----------------------------//

import {randomize, createElement, createReloadButton, generateLogs} from './tools.js'

//--------------------------------Import data----------------------------------//

import  {HIT, ATTACK} from './mechanicsData.js';

//--------------------------------Import selectors-----------------------------//

import {$arenas, $control, $randomButton} from './selectors.js';

//--------------------------------For-export-----------------------------------//

export const controlHitDefence = (defender, attacker, attackPlayer, defencePlayer) =>{
    if(defender.defence === attacker.hit){
        generateLogs('defence', attackPlayer, defencePlayer, attacker);//, defender);
    }else{
        defencePlayer.changeHP(attacker.hitValue);
        defencePlayer.renderHP();
        generateLogs('hit', attackPlayer, defencePlayer, attacker);//, defender);
    }

}

export const enemyAttack = () =>{
    let hit = ATTACK[randomize(3)-1];
    let defence = ATTACK[randomize(3)-1];
    return{
        hitValue: randomize(HIT[hit]),
        hit,
        defence,
    }
}

export const playerAttack = () =>{

    const player = {};
    for (let item of $control) {
        if (item.checked && item.name === 'hit') {
            player.hitValue = randomize(HIT[item.value]);
            player.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            player.defence = item.value;
        }
        item.checked = false;
    }
    return player;
}

export const winPlayer = (winner) =>{
    const $winTitle = createElement('div', 'winTitle');
    if(winner.name) {
        $winTitle.innerText = winner.name + '   WIN';
        $randomButton.disabled = true;
        return $winTitle;
    }else{
        $winTitle.innerText = 'DRAW';
        $randomButton.disabled = true;
        return $winTitle;
    }

}

export const showWinner = (winner) => {
    $arenas.appendChild(winPlayer(winner));
    createReloadButton();
}

export function changeHP(value){
    let dmg = value;
    this.hp -= (dmg <= this.hp) ? dmg : this.hp;
}

//--------------------------------End------------------------------------------//

