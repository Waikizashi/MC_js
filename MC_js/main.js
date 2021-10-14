const player1 = {
    name: 'Scorpion',
    hp: 65,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:'hook',
    attack: attack = () =>{
        console.log(name + 'FIGHT!');
    },
};

const player2 = {
    name: 'Kitana',
    hp: 35,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon:'blade',
    attack: attack = () =>{
        console.log(name + 'FIGHT!');
    },
};

const $arenas = document.querySelector('.arenas');

const createPlayer = (player, data) =>{
    const $player = document.createElement('div');
    const $progressBar = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $character = document.createElement('div');
    const $img = document.createElement('img');

    $life.style.width = data.hp + '%';
    $name.innerText = data.name;
    $img.src = data.img;

    $player.classList.add(player);
    $progressBar.classList.add('progressbar');
    $life.classList.add('life');
    $name.classList.add('name');
    $character.classList.add('character');


    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    $character.appendChild($img);

    $player.appendChild($progressBar);
    $player.appendChild($character);


    $arenas.appendChild($player);


}

createPlayer('player1', player1);
createPlayer('player2', player2);