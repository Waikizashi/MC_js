const $arenas = document.querySelector('.arenas');

const $control = document.querySelector('.control');

const $randomButton = document.querySelector('.button');


const player1 = {
    player: 1,
    name: 'scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:'hook',
    chgHP: changeHP,
    elHP: elHP,
    rndHP: renderHP,
    attack: attack = () =>{
        console.log(name + ' ' + 'FIGHT!');
    },
};

const player2 = {
    player: 2,
    name: 'kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon:'blade',
    chgHP: changeHP,
    elHP: elHP,
    rndHP: renderHP,
    attack: attack = () =>{
        console.log(name + ' ' +'FIGHT!');
    },
};

const randomize = () =>{
    return Math.ceil(Math.random() * 20);
}

$randomButton.addEventListener('click', () =>{
    //console.log('####: Click');
    player1.chgHP(randomize());
    player1.rndHP(player1.elHP());
    player2.chgHP(randomize());
    player2.rndHP(player2.elHP());

    if (player1.hp<= 0 && !(player2.hp <=0) ){
            showWinner(player2);
        }
    if (player2.hp<= 0 && !(player1.hp <=0)){
            showWinner(player1);
        }
    if (player2.hp<= 0 && player1.hp<= 0){
        showWinner(0);
    }
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

const createReloadButton = () =>{
    const $reload = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'restart';
    $reloadButton.addEventListener('click', () => window.location.reload());
    $reload.appendChild($reloadButton);
    $control.appendChild($reload);
}

const showWinner = (player) => {
    $arenas.appendChild(winPlayer(player.name));
    createReloadButton();
}

function changeHP(value){
    let dmg = value;
    this.hp -= (dmg <= this.hp) ? dmg : this.hp;
}
function elHP(){
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP($playerLife){
        $playerLife.style.width = this.hp + '%';
}

const winPlayer = (name) =>{
    const $winTitle = createElement('div', 'winTitle');
    if(name) {
        $winTitle.innerText = name + '   WIN';
        $randomButton.disabled = true;
        return $winTitle;
    }else{
        $winTitle.innerText = 'DRAW';
        $randomButton.disabled = true;
        return $winTitle;
    }

}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


