const $arenas = document.querySelector('.arenas');

const $control = document.querySelector('.control');

const $randomButton = document.querySelector('.button');


const player1 = {
    player: 1,
    name: 'scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    imgWin: 'https://www.mortalkombatwarehouse.com/umk3/animations/scorpion-win.gif',
    weapon:'hook',
    changeHP,
    elHP,
    renderHP,
    attack: attack = () =>{
        console.log(name + ' ' + 'FIGHT!');
    },
};

const player2 = {
    player: 2,
    name: 'kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    imgWin: 'https://www.mortalkombatwarehouse.com/umk3/animations/kitana-win.gif',
    weapon:'blade',
    changeHP,
    elHP,
    renderHP,
    attack: attack = () =>{
        console.log(name + ' ' +'FIGHT!');
    },
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const randomize = (value) =>{
    return Math.ceil(Math.random() * value);
}

$control.addEventListener('submit', (e) => {
    e.preventDefault();
    const enemy = enemyAttack();

    const dire = {};
    for (let item of $control) {
        if (item.checked && item.name === 'hit') {
            dire.hitValue = randomize(HIT[item.value]);
            dire.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            dire.defence = item.value;
        }
        item.checked = false;
    }
    controlHitDefence(dire, enemy, player1);
    controlHitDefence(enemy, dire, player2);

    if (player1.hp<= 0 && !(player2.hp <=0)) {showWinner(player2);}
    if (player2.hp<= 0 && !(player1.hp <=0)) {showWinner(player1);}
    if (player2.hp<= 0 && player1.hp<= 0) {showWinner(0);}

})

const controlHitDefence = (defender, attacker, player) =>{
    if(defender.defence !== attacker.hit){
        player.changeHP(attacker.hitValue);
        player.renderHP();
    }
}

const enemyAttack = () =>{
    let hit = ATTACK[randomize(3) - 1];
    let defence = ATTACK[randomize(3) - 1];
    return{
        hitValue: randomize(HIT[hit]),
        hit,
        defence,
    }
}

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
    $reloadButton.style.cursor = 'pointer';
    $reloadButton.style.opacity = '1';
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

function renderHP(){
    $playeLife = this.elHP();
    //console.log('####:', $playeLife)
    $playeLife.style.width = this.hp + '%';
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


