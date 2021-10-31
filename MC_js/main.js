//--------------------------------Import classes-------------------------------//

import {Game} from "./Game.js";

//--------------------------------Import functions-----------------------------//

//--------------------------------Import data----------------------------------//

//--------------------------------Import selectors-----------------------------//

//--------------------------------Main-----------------------------------------//

// const fight = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
//     method: 'POST',
//     body: JSON.stringify({
//         hit,
//         defence,
//     })
// });
//
// console.log('###:', fight);

const game = new Game();
game.start();

//--------------------------------End------------------------------------------//



