//--------------------------------Import functions-----------------------------//

//--------------------------------Import data----------------------------------//

//--------------------------------Import functions-----------------------------//

import {changeHP} from './mechanics.js'
import {elHP, renderHP} from './tools.js'

//--------------------------------For-export-----------------------------------//

export const player1 = {
    player: 1,
    name: 'scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    imgWin: 'https://www.mortalkombatwarehouse.com/umk3/animations/scorpion-win.gif',
    weapon:'hook',
    changeHP,
    elHP,
    renderHP,
    // attack: function (){
    //     console.log(name + ' ' + 'FIGHT!');
    // },
};

export const player2 = {
    player: 2,
    name: 'kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    imgWin: 'https://www.mortalkombatwarehouse.com/umk3/animations/kitana-win.gif',
    weapon:'blade',
    changeHP,
    elHP,
    renderHP,
    // attack: function (){
    //     console.log(name + ' ' + 'FIGHT!');
    // },
};

//--------------------------------End------------------------------------------//