const $arenas = document.querySelector('.arenas');

const $randomButton = document.querySelector('.button');



const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:'hook',
    attack: attack = () =>{
        console.log(name + ' ' + 'FIGHT!');
    },
};

const randomize = () =>{
    return Math.ceil(Math.random() * 20);
}

const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon:'blade',
    attack: attack = () =>{
        console.log(name + ' ' +'FIGHT!');
    },
};

$randomButton.addEventListener('click', () =>{
    console.log('####: Click');
    changeHP(player1);
    !$randomButton.disabled ? changeHP(player2) : {};
});

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

const createPlayer = (data) =>{
    const $player = createElement('div', 'player' + data.player);
    const $progressBar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');

    const $img = createElement('img');

    $life.style.width = data.hp + '%';
    $name.innerText = data.name;
    $img.src = data.img;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    $character.appendChild($img);

    $player.appendChild($progressBar);
    $player.appendChild($character);


    return $player;


}

const showWinner = (player) => {
    $arenas.appendChild(winPlayer(player.name));
}

const changeHP = (player) => {
    const $playerLife = document.querySelector('.player'+ player.player + ' .life');
    player.hp -= randomize();

    if (player.hp < 0){
        $playerLife.style.width = 0 + '%';
    }else {
        $playerLife.style.width = player.hp + '%';
    }

    if (player.hp<= 0){
        if (player.player === 1){
            showWinner(player2);
        }else{
            showWinner(player1);
        }
    }
}

const winPlayer = (name) =>{
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = name + '   WIN';
    $randomButton.disabled = true;
    return $winTitle;
}



$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


