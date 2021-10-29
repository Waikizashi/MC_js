//--------------------------------Import classes-------------------------------//

//--------------------------------Import functions-----------------------------//

//--------------------------------Import data----------------------------------//

//--------------------------------Import selectors-----------------------------//

//--------------------------------Main-Class-----------------------------------//

export class Player{
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.imgWin = props.imgWin
        this.weapon = props.weapon;

    }
//-------------------------------------functions-------------------------------//

    changeHP(value){
        let dmg = value;
        this.hp -= (dmg <= this.hp) ? dmg : this.hp;
    }

    elHP = () => {
        return document.querySelector(`.player${this.player} .life`);
    }

    renderHP = () =>{
        let $playerLife;
        $playerLife = this.elHP();
        $playerLife.style.width = `${this.hp}%`;
    }
}

// export class Player1 extends Player{
//
// }
//
// export class Player2 extends Player{
//
// }
//--------------------------------End------------------------------------------//


