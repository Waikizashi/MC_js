//--------------------------------Import classes-------------------------------//

//--------------------------------Import functions-----------------------------//

//--------------------------------Import data----------------------------------//

import {logs} from "./mechanicsData.js";

//--------------------------------Import selectors-----------------------------//

import {$control, $chat} from './selectors.js';

//--------------------------------Main-Class-----------------------------------//

export class Tools {
//--------------------------------Constructor----------------------------------//

    constructor() {
        this.logs = logs;
        this.$control = $control;
        this.$chat = $chat;
    }

//--------------------------------Main-functions-------------------------------//

    randomize = (value) => Math.ceil(Math.random() * value);

    createElement = (tag, className) => {
        const $tag = document.createElement(tag);
        if (className) {
            $tag.classList.add(className);
        }
        return $tag;
    }

    createReloadButton = () =>{
        const $reload = this.createElement('div', 'reloadWrap');
        const $reloadButton = this.createElement('button', 'button');
        $reloadButton.innerText = 'restart';
        $reloadButton.addEventListener('click', () => window.location.reload());
        $reload.appendChild($reloadButton);
        $reloadButton.style.cursor = 'pointer';
        $reloadButton.style.opacity = '1';
        this.$control.appendChild($reload);
    }

    generateLogs = (type, {name: name1 = 'Player_1'}, {name: name2 = 'Player_2', hp: hp2}, attacker = 0) => {//, defender) =>{
        const {hitValue} = attacker;
        const date = new Date();

        let time = ` ${date.getDate()}.${(date.getMonth()+1)}.${date.getFullYear()}`;

        if (date.getHours() < 10){
            time +=` 0${date.getHours()}`;
        }else{
            time += ` ${date.getHours()}`;
        }

        if (date.getMinutes() < 10){
            time += `:0${date.getMinutes()}`;
        }else{
            time += `:${date.getMinutes()}`;
        }

        let hitLogs;
        let text;
        let el;

        switch (type) {
            case 'hit':
                time += ' -';
                text  = this.logs[type][this.randomize((this.logs[type].length))-1].replace('[playerKick]',name1).replace('[playerDefence]', name2);
                hitLogs  = ` -${hitValue}[${hp2}] `;
                el = `<p>${time} ${text} ${hitLogs}<p>`;
                break;
            case 'defence':
                time += ' -';
                text  = this.logs[type][this.randomize((this.logs[type].length))-1].replace('[playerKick]',name1).replace('[playerDefence]', name2);
                hitLogs = '[' + hp2 + ']';
                el = `<p>${time} ${text}<p>`;
                break;
            case 'end':
                time += ' -';
                text = this.logs[type][0].replace('[playerWins]',name1).replace('[playerLose]', name2);
                el = `<p>${time} ${text}<p>`;
                break
            case 'draw':
                text = this.logs[type][0];
                el = `<p>${time} ${text}<p>`;
                break;
            case 'start':
                text = this.logs[type].replace('[time]', time).replace('[player1]',name1).replace('[player2]', name2);
                el = `<p>${text}<p>`;
                break;
            default: console.log('ERROR');
                break;
        }

        this.$chat.insertAdjacentHTML('afterbegin',el);
    }
}

//--------------------------------End------------------------------------------//
