//--------------------------------Import functions-----------------------------//

//--------------------------------Import data----------------------------------//

import {logs} from "./mechanicsData.js";

//--------------------------------Import selectors-----------------------------//

import {$control, $chat} from './selectors.js';

//--------------------------------For-export-----------------------------------//

export const randomize = (value) => Math.ceil(Math.random() * value);

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export const createReloadButton = () =>{
    const $reload = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'restart';
    $reloadButton.addEventListener('click', () => window.location.reload());
    $reload.appendChild($reloadButton);
    $reloadButton.style.cursor = 'pointer';
    $reloadButton.style.opacity = '1';
    $control.appendChild($reload);
}

export const generateLogs = (type, player1, player2, attacker = 0) => {//, defender) =>{
    const {hitValue} = attacker;
    const {name: name1 = 'Player_1'} = player1;
    const {name: name2 = 'Player_2', hp: hp2} = player2;

    const date = new Date();

    let time = ' ' + date.getDate()+ '.' + (date.getMonth()+1) + '.' + date.getFullYear();

    if (date.getHours() < 10){
        time +=' 0' + date.getHours();
    }else{
        time += ' ' + date.getHours();
    }

    if (date.getMinutes() < 10){
        time += ':0' + date.getMinutes();
    }else{
        time += ':' + date.getMinutes();
    }

    let hitLogs;
    let text;
    let el;

    switch (type) {
        case 'hit':
            time += ' -';
            text  = logs[type][randomize((logs[type].length))].replace('[playerKick]',name1).replace('[playerDefence]', name2);
            hitLogs  = ' -' + hitValue + '[' + hp2 + '] ' ;
            el = `<p>${time} ${text} ${hitLogs}<p>`;
            break;
        case 'defence':
            time += ' -';
            text  = logs[type][randomize((logs[type].length))].replace('[playerKick]',name1).replace('[playerDefence]', name2);
            hitLogs = '[' + hp2 + ']';
            el = `<p>${time} ${text}<p>`;
            break;
        case 'end':
            time += ' -';
            text = logs[type][0].replace('[playerWins]',name1).replace('[playerLose]', name2);
            el = `<p>${time} ${text}<p>`;
            break
        case 'draw':
            text = logs[type][0];
            el = `<p>${time} ${text}<p>`;
            break;
        case 'start':
            text = logs[type].replace('[time]', time).replace('[player1]',name1).replace('[player2]', name2);
            el = `<p>${text}<p>`;
            break;
        default: console.log('ERROR');
            break;
    }

    $chat.insertAdjacentHTML('afterbegin',el);
}

export function elHP(){
    return document.querySelector('.player' + this.player + ' .life');
}

export function renderHP(){
    let $playerLife;
    $playerLife = this.elHP();
    //console.log('####:', $playeLife)
    $playerLife.style.width = this.hp + '%';
}

//--------------------------------End------------------------------------------//