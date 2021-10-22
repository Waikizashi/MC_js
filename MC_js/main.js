const $arenas = document.querySelector('.arenas');

const $control = document.querySelector('.control');

const $randomButton = document.querySelector('.button');

const $chat = document.querySelector('.chat');

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
    attack: this.attack = () =>{
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
    attack: this.attack = () =>{
        console.log(name + ' ' +'FIGHT!');
    },
};

const logs = {
    start: 'На дворе было [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
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
    const dire = playerAttack();

    controlHitDefence(dire, enemy, player1, player2);
    controlHitDefence(enemy, dire, player2, player1);

    if (player1.hp<= 0 && !(player2.hp <=0)) {showWinner(player2); generateLogs('end', player2, player1)}
    if (player2.hp<= 0 && !(player1.hp <=0)) {showWinner(player1); generateLogs('end', player1, player2)}
    if (player2.hp<= 0 && player1.hp<= 0) {showWinner(0); generateLogs('draw')}

})

const controlHitDefence = (defender, attacker, attackPlayer, defencePlayer) =>{
    if(defender.defence === attacker.hit){
        generateLogs('defence', attackPlayer, defencePlayer, attacker, defender);
    }else{
        defencePlayer.changeHP(attacker.hitValue);
        defencePlayer.renderHP();
        generateLogs('hit', attackPlayer, defencePlayer, attacker, defender);
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

const playerAttack = () =>{

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
    let $playerLife;
    $playerLife = this.elHP();
    //console.log('####:', $playeLife)
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

const generateLogs = (type, player1, player2, attacker) => {//, defender) =>{
    const date = new Date();

    let time = ' ' + date.getDate()+ '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    let hitLogs;
    let text;
    let el;

    switch (type) {
        case 'hit':
            time += ' -';
            text  = logs[type][randomize((logs[type].length))].replace('[playerKick]',player1.name).replace('[playerDefence]', player2.name);
            hitLogs  = ' -' + attacker.hitValue + '[' + player2.hp + '] ' ;
            el = `<p>${time} ${text} ${hitLogs}<p>`;
            break;
        case 'defence':
            time += ' -';
            text  = logs[type][randomize((logs[type].length))].replace('[playerKick]',player1.name).replace('[playerDefence]', player2.name);
            hitLogs = '[' + player2.hp + ']';
            el = `<p>${time} ${text}<p>`;
            break;
        case 'end':
            time += ' -';
            text = logs[type][0].replace('[playerWins]',player1.name).replace('[playerLose]', player2.name);
            el = `<p>${time} ${text}<p>`;
            break
        case 'draw':
            text = logs[type][0];
            el = `<p>${time} ${text}<p>`;
            break;
        case 'start':
            text = logs[type].replace('[time]', time).replace('[player1]',player1.name).replace('[player2]', player2.name);
            el = `<p>${text}<p>`;
            console.log(player2.name, player1.name);
            break;
        default: console.log('ERROR');
            break;
    }

    $chat.insertAdjacentHTML('afterbegin',el);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);




