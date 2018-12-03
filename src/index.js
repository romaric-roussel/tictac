import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Game extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      squares: [[],[],[]],
      xIsNext: true,
      nbLigne: 3,
      nbColonne:3,
      currentSymbole:"",
      scoreJoueurX:0,
      scoreJoueurO:0

    
    };
  }
   victoireLigne(symbol){

    const board = this.state.squares;
    for(let i =0;i<this.state.nbLigne;i++){
      let trouve =0;
        for(let j = 0 ;j<this.state.nbColonne;j++){
            if (board[i][j] === symbol){
                trouve++;
                if(trouve === this.state.nbColonne){
                return true;
              }
              
            }
            
        }
        
    }
    return false;
  }
  
   victoireColonne(symbol){
  
    const board = this.state.squares;
    for(let i =0;i<this.state.nbColonne;i++){
      let trouve =0;
        for(let j = 0 ;j<this.state.nbLigne;j++){
            if (board[j][i] === symbol){
                trouve++;
                if(trouve === this.state.nbLigne){
                return true;
              }
              
            }
            
        }
        
    }
    return false;
  }
  
   victoireDiago1(symbol){
  
    const board = this.state.squares;
    if(this.state.nbLigne === this.state.nbColonne){
      let trouve =0;
      for(let i =0;i<this.state.nbLigne;i++){
        if(board[i][i] === symbol){
          trouve++;
          if(trouve === this.state.nbLigne){
            return true;
          }
        }
        }
    }
    
    return false;
  }
  
   victoireDiago2(symbol){
  
    const board = this.state.squares;
    if(this.state.nbLigne === this.state.nbColonne){
      let j = this.state.nbColonne - 1;
      let trouve = 0;
      for(let i = 0 ;i< this.state.nbLigne;i++){
        if(board[i][j] === symbol){
          trouve++;
          if(trouve === this.state.nbColonne){
            return true;
          }
        }
        j--;
        }
        
    }		
    
    return false;
  }
  handleClick(i,j) {
    const squares = this.state.squares.slice();
    squares[i][j] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      currentSymbole:squares[i][j]
    });
    let winner = this.rechercheGagnant(squares[i][j]);
    
    if(winner){
      if(winner === 'X'){
        this.updateScoreJoueurX();
        setTimeout(()=>alert('Victoire X',1000));
        return;
      }
      if(winner === 'O'){
        this.updateScoreJoueurO();
        setTimeout(()=>alert('Victoire O',1000));
      }
    }
    console.log(winner);
  }
  
   conditionDeVictoire(symbol) {
      
      return (this.victoireColonne(symbol) || 
        this.victoireLigne(symbol) 		|| 
        this.victoireDiago1(symbol) 		|| 
        this.victoireDiago2(symbol))
  }
  
   rechercheGagnant(symbol) {
      if (this.conditionDeVictoire(symbol)) {
          return symbol;
  
      }
      return false;
  }
  updateScoreJoueurX(){
    let scoreX = this.state.scoreJoueurX;
    this.setState({
      scoreJoueurX: scoreX++,
      
    });
  }
  updateScoreJoueurO(){
    let scoreO = this.state.scoreJoueurO;
    this.setState({
      scoreJoueurO: scoreO
    });
  }
  render() {
    const history = this.state.squares;
   // const current = history[history.length - 1];
    //const winner = calculateWinner(current.squares);
  
    return (
      
      <div className="game">
        <div className="game-board">
        <p>Tic Tac Bug</p>
        <table border="1px"  >
        <tr>
          <td className="symbole" onClick={()=>this.handleClick(0, 0)}>
            {this.state.squares[0][0]}
          </td>
          <td className="symbole" onClick={()=>this.handleClick( 0, 1)}>
            {this.state.squares[0][1]}
          </td>
          <td className="symbole"  onClick={()=>this.handleClick(0, 2)}>
            {this.state.squares[0][2]}
          </td>
        </tr>
        <tr>
          <td className="symbole" onClick={()=>this.handleClick(1, 0)}>
            {this.state.squares[1][0]}
          </td>
          <td className="symbole" onClick={()=>this.handleClick( 1, 1)}>
            {this.state.squares[1][1]}
          </td>
          <td className="symbole" onClick={()=>this.handleClick(1, 2)}>
            {this.state.squares[1][2]}
          </td>
        </tr>
        <tr>
          <td className="symbole" onClick={()=>this.handleClick(2, 0)}>
            {this.state.squares[2][0]}
          </td>
          <td className="symbole" onClick={()=>this.handleClick(2,1)}>
            {this.state.squares[2][1]}
          </td>
          <td className="symbole" onClick={()=>this.handleClick(2, 2)}>
            {this.state.squares[2][2]}
          </td>
        </tr>
      </table>
        </div>
        <div className="game-info">
          <div>
            <p>Score joueur X : {this.state.scoreJoueurX}</p>
            <p>Score joueur O : {this.state.scoreJoueurO}</p>
          </div>
          <div>
            <p>status{this.status}</p>
          </div>
         
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


