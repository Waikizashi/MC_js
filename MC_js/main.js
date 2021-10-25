//--------------------------------Import functions-----------------------------//

import {controlHitDefence, enemyAttack, playerAttack, showWinner} from './mechanics.js'
import {createElement, generateLogs} from './tools.js'

//--------------------------------Import data----------------------------------//

import {player1, player2} from './data.js';

//--------------------------------Import selectors-----------------------------//

import {$arenas, $control} from './selectors.js';

//--------------------------------Main-functions------------------------------//
$control.addEventListener('submit', (e) => {
    e.preventDefault();

    const enemy = enemyAttack();
    const dire = playerAttack();

    controlHitDefence(dire, enemy, player1, player2);
    controlHitDefence(enemy, dire, player2, player1);
    if (player1.hp<= 0 && !(player2.hp <=0)) {showWinner(player2); generateLogs('end', player2, player1)}
    if (player2.hp<= 0 && !(player1.hp <=0)) {showWinner(player1); generateLogs('end', player1, player2)}
    if (player2.hp<= 0 && player1.hp<= 0) {showWinner(0); generateLogs('draw')}

})

const createPlayer = (data) =>{
    const {player, hp, name, img} = data;

    const $player = createElement('div', 'player' + player);
    const $progressBar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');

    const $img = createElement('img');

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

//--------------------------------Main-----------------------------------------//

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

//--------------------------------End------------------------------------------//



