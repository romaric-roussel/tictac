import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Game extends React.Component {
  constructor(props) {
    super(props);

    let nbLigneEtColonne = prompt("Nombre de ligne et colonne");
    let playerX = prompt("Nom joueur X");
    let playerO = prompt("Nom joueur O");
    
    

    this.state = {
      squares: [["", "", ""], ["", "", ""], ["", "", ""]],
      currentSquare: [["", "", ""], ["", "", ""], ["", "", ""]],
      lastIndexI:"",
      lastIndexJ:"",
      xIsNext: true,
      nbLigne: parseInt(nbLigneEtColonne),
      nbColonne: parseInt(nbLigneEtColonne),
      currentSymbole: "",
      scoreJoueurX: 0,
      scoreJoueurO: 0,
      playerX: playerX,
      playerO: playerO,
      partiFini: false,
      matchNul:false,
      celluleRestante:9,
      status: "",
      move: 0,
      winner:""


    };
  }
  victoireLigne(symbol) {

    const board = this.state.squares;
    for (let i = 0; i < this.state.nbLigne; i++) {
      let trouve = 0;
      for (let j = 0; j < this.state.nbColonne; j++) {
        if (board[i][j] === symbol) {
          trouve++;
          if (trouve === this.state.nbColonne) {
            return true;
          }

        }

      }

    }
    return false;
  }

  victoireColonne(symbol) {

    const board = this.state.squares;
    for (let i = 0; i < this.state.nbColonne; i++) {
      let trouve = 0;
      for (let j = 0; j < this.state.nbLigne; j++) {
        if (board[j][i] === symbol) {
          trouve++;
          if (trouve === this.state.nbLigne) {
            return true;
          }

        }

      }

    }
    return false;
  }

  victoireDiago1(symbol) {

    const board = this.state.squares;
    if (this.state.nbLigne === this.state.nbColonne) {
      let trouve = 0;
      for (let i = 0; i < this.state.nbLigne; i++) {
        if (board[i][i] === symbol) {
          trouve++;
          if (trouve === this.state.nbLigne) {
            return true;
          }
        }
      }
    }

    return false;
  }

  victoireDiago2(symbol) {

    const board = this.state.squares;
    if (this.state.nbLigne === this.state.nbColonne) {
      let j = this.state.nbColonne - 1;
      let trouve = 0;
      for (let i = 0; i < this.state.nbLigne; i++) {
        if (board[i][j] === symbol) {
          trouve++;
          if (trouve === this.state.nbColonne) {
            return true;
          }
        }
        j--;
      }

    }

    return false;
  }
  handleClick(i, j) {

    
    if (this.state.partiFini===false) {
      if (!this.caseVide(i, j) && this.state.celluleRestante !== 0 ) {
        alert("Case Pleine");
        return;
      }
      if (this.state.celluleRestante !== 0){
       
        let status = this.state.status;
        const squares = this.state.squares.slice();
        
        squares[i][j] = this.state.xIsNext ? 'X' : 'O';
        let symbole = !this.state.xIsNext ? 'X' : 'O';
        if(symbole === "X"){
          status = "Tour du joueur : " + this.state.playerX;
        }
        if(symbole === "O"){
          status = "Tour du joueur : " + this.state.playerO;
        }

        
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
          currentSymbole: squares[i][j],
          status: status,
          celluleRestante : this.state.celluleRestante -1,
          currentSquare:squares,
          lastIndexI: i,
          lastIndexJ:j
          

        });
      }
      if (this.state.celluleRestante === 1){
       
        let status = this.state.status;
        const squares = this.state.squares.slice();
        squares[i][j] = this.state.xIsNext ? 'X' : 'O';
      
        //let move = this.state.move + 1;

        status = "Match nul"
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
          currentSymbole: squares[i][j],
          status: status,
          celluleRestante : this.state.celluleRestante -1

        });
        this.updatePartiFini();
        return;
      }
        
        //this.clonerTableau();

        let winner = this.rechercheGagnant(this.state.squares[i][j]);
        console.log(winner);
        console.log(this.state.squares[i][j]);
        if (winner === 'X') {
          this.updateScoreJoueurX();
          this.updatePartiFini();
          this.updateStatusX();
          this.setState({
            winner:winner
          });
          console.log("X");
        }

        if (winner === 'O') {
          this.updateScoreJoueurO();
          this.updatePartiFini();
          this.updateStatusO();
          this.setState({
            winner:winner
          });
          console.log("X");
        
        } 
        
    } else {
      this.alertPartiFini();
    }
  }


  caseVide(i, j) {
    if (this.state.squares[i][j] === "") {
      return true;
    }
  }
 
  tableauPlein() {
    for (let i = 0; i < this.state.nbLigne; i++) {
      for (let j = 0; j < this.state.nbColonne; j++) {
        if (this.caseVide(i, j)) {
          return false;
        }
      }
    }
    return true;
  }



  handleBoutonRejouer() {
    this.resetTableauEtSatus();
    this.setState({
      celluleRestante :9,
      winner:""
    });
  }
  handleBoutonPrecedent() {
    const currentSquare = this.state.currentSquare.slice();
    currentSquare[this.state.lastIndexI][this.state.lastIndexJ] = "";
    let symbole = !this.state.xIsNext ? 'X' : 'O';
    let status = "";
    if(symbole === "X"){
      status = "Tour du joueur : " + this.state.playerX;
    }
    if(symbole === "O"){
      status = "Tour du joueur : " + this.state.playerO;
    }
    let partiFini = this.state.partiFini;
    let winner = this.state.winner
    if(partiFini){
      if(winner==="X"){
        this.setState({
          scoreJoueurX:this.state.scoreJoueurX-1
        });
      }
      if(winner==="O"){
        this.setState({
          scoreJoueurO:this.state.scoreJoueurO-1
        });
      }
      this.setState({
        partiFini:false
      });

      
    }
    this.setState({
      currentSquare: currentSquare,
      xIsNext: !this.state.xIsNext,
      celluleRestante:this.state.celluleRestante +1,
      status:status   
    });
    


  }

  resetTableauEtSatus() {
    this.setState({
      squares: [["", "", ""], ["", "", ""], ["", "", ""]],
      partiFini: false,
      status: "",
      xIsNext: true
    });
  }

  updateStatusX() {
    this.setState({
      status: "Victoire du joueur " + this.state.playerX
    });
  }

  updateStatusO() {
    this.setState({
      status: "Victoire du joueur " + this.state.playerO
    });
  }

  updatePartiFini() {
    
    this.setState({
      partiFini: true
    });
  }
  checkPartiFini() {
    const etat = this.state.partiFini;
    return etat;
  }
  alertPartiFini() {
    alert('Partie Fini');
  }

  conditionDeVictoire(symbol) {

    return (this.victoireColonne(symbol) ||
      this.victoireLigne(symbol) ||
      this.victoireDiago1(symbol) ||
      this.victoireDiago2(symbol))
  }

  rechercheGagnant(symbol) {
    if (this.conditionDeVictoire(symbol)) {
      return symbol;

    }
    return false;
  }
  updateScoreJoueurX() {
    let scoreX = this.state.scoreJoueurX;
    this.setState({
      scoreJoueurX: scoreX + 1

    });
  }
  updateScoreJoueurO() {
    let scoreO = this.state.scoreJoueurO;
    this.setState({
      scoreJoueurO: scoreO + 1
    });
  }
  render() {
    
  
    return (

      <div className="game">
        <div className="game-board">
          <p>Tic Tac Bug</p>
          <table border="1px"  >
            <tr>
              <td className="symbole" onClick={() => this.handleClick(0, 0)}>
                {this.state.squares[0][0]}
              </td>
              <td className="symbole" onClick={() => this.handleClick(0, 1)}>
                {this.state.squares[0][1]}
              </td>
              <td className="symbole" onClick={() => this.handleClick(0, 2)}>
                {this.state.squares[0][2]}
              </td>
            </tr>
            <tr>
              <td className="symbole" onClick={() => this.handleClick(1, 0)}>
                {this.state.squares[1][0]}
              </td>
              <td className="symbole" onClick={() => this.handleClick(1, 1)}>
                {this.state.squares[1][1]}
              </td>
              <td className="symbole" onClick={() => this.handleClick(1, 2)}>
                {this.state.squares[1][2]}
              </td>
            </tr>
            <tr>
              <td className="symbole" onClick={() => this.handleClick(2, 0)}>
                {this.state.squares[2][0]}
              </td>
              <td className="symbole" onClick={() => this.handleClick(2, 1)}>
                {this.state.squares[2][1]}
              </td>
              <td className="symbole" onClick={() => this.handleClick(2, 2)}>
                {this.state.squares[2][2]}
              </td>
            </tr>
          </table>
        </div>
        <div className="game-info">
          <div>
            <p>Score {this.state.playerX} : {this.state.scoreJoueurX}</p>
            <p>Score {this.state.playerO} : {this.state.scoreJoueurO}</p>
          </div>
          <div>
            <p>{this.state.status}</p>
          </div>

        </div>
        <GameBouton
          onClickRejouer={() => this.handleBoutonRejouer()}
          onClickPrecedent={() => this.handleBoutonPrecedent()}

        />
      </div>
    );
  }
}

function GameBouton(props) {
  return (


    <div className="game-bouton">
      <BoutonRejouer onClickRejouer={props.onClickRejouer} />
      <BoutonActionPrecedente onClickPrecedent={props.onClickPrecedent} />

    </div>
  );
}


function BoutonRejouer(props) {
  return (
    <button type="button" onClick={props.onClickRejouer}>
      Rejouer
    </button>
  );
}
function BoutonActionPrecedente(props) {
  return (
    <button type="button" onClick={props.onClickPrecedent}>
      Action précedente
    </button>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


