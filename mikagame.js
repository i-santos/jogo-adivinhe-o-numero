/**
 * HTML ELEMENTS
 */
const btnRestart = `
  <p>
    <button onclick="restart();">JOGAR NOVAMENTE</button>
  </p>
`;

const divMessageElement = (message, children) => `
  <div>
    <h3>
      ${message}
    </h3>
    ${children || ""}
  </div>
`;

// Objeto JSON para guardar todos os estados do jogo
var gameState = {
  // armazena as tentativas restantes
  numTentativas: 5,
  // armazena se o jogo acabou ou não
  gameOver: false,
  // armazena o número que deve ser acertado
  numeroSorteado: Math.ceil(Math.random() * 100),
  // armazena os números já jogados
  numerosJogados: [],
  error: null
};

var inputState = {
  apostaEl: document.getElementById("aposta")
};

var outputState = {
  numTentativasEl: document.getElementById("num-tentativas"),
  resultMessage: document.getElementById("resultMessage"),
  numerosJogadosEl: document.getElementById("num-played"),
  alreadyTakenEl: document.getElementById("already-taken"),
  errorsEl: document.getElementsByClassName("error")
};

/**
 * Update View (render)
 */
function updateView() {
  var resultEl;
  // verifica se o jogo acabou
  if (gameState.gameOver) {
    // se tiverem tentativas sobrando, então o jogador acertou o número
    if (gameState.numTentativas > 0) {
      resultEl = divMessageElement("Você acertou! Parabéns.", btnRestart);
    } else {
      resultEl = divMessageElement(
        `Suas tentativas acabaram! O número era ${
          gameState.numeroSorteado
        }. Tente novamente :).`,
        btnRestart
      );
    }
  }

  // Informações
  outputState.numTentativasEl.innerHTML = gameState.numTentativas;
  outputState.numerosJogadosEl.innerHTML = gameState.numerosJogados.toString();
  outputState.resultMessage.innerHTML = resultEl || "";

  // Erros
  if (gameState.error) {
    
    for(var i = 0; i < outputState.errorsEl.length; i++) {
      outputState.errorsEl.item(i).classList.remove('error');
    }

    // ALREADY TAKEN
    if (gameState.error.alreadyTaken) {
      outputState.alreadyTakenEl.innerHTML = "Número já jogado";
    } else {
      outputState.alreadyTakenEl.innerHTML = "";
    }
  } else {

    for(var i = 0; i < outputState.errorsEl.length; i++) {
      outputState.errorsEl.item(i).classList.add('error');
    }
  }
}

function restart() {
  gameState = {
    // armazena as tentativas restantes
    numTentativas: 5,
    // armazena se o jogo acabou ou não
    gameOver: false,
    // armazena o número que deve ser acertado
    numeroSorteado: Math.ceil(Math.random() * 100),
    numerosJogados: []
  };

  inputState = {
    apostaEl: document.getElementById("aposta")
  };

  outputState = {
    numTentativasEl: document.getElementById("num-tentativas"),
    resultMessage: document.getElementById("resultMessage"),
    numerosJogadosEl: document.getElementById("num-played"),
    alreadyTakenEl: document.getElementById("already-taken")
  };

  updateView();
}

function jogar() {
  if (gameState.gameOver) return;

  // Init with no errors
  gameState.error = null;

  // Pegar aposta
  var apostaValue = parseInt(inputState.apostaEl.value);

  // se o número já tiver sido jogado
  if (gameState.numerosJogados.some(n => n === apostaValue)) {
    gameState.error = {
      alreadyTaken: true
    };
    updateView();
    return;
  }
  gameState.numerosJogados.push(apostaValue);

  // Testar se o número aposta é igual ao número sorteado
  if (parseInt(apostaValue) === gameState.numeroSorteado) {
    // Se for, o jogo acabou
    gameState.gameOver = true;
  } else {
    // Caso contrário, tira uma tentativa
    gameState.numTentativas--;

    // Se não sobrar tentativa, então o jogo acabou
    if (gameState.numTentativas === 0) {
      gameState.gameOver = true;
    }
  }
  // atualizar informações na tela
  updateView();
}

/**
 * INITIAL STATE
 */
updateView();
