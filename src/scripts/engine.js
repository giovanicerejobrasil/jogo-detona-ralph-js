const state = {
  view: {
    sqaures: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    modal: document.querySelector(".modal"),
    result: document.querySelector("#result"),
    reset: document.querySelector("#reset"),
  },
  values: {
    hitPosition: 0,
    result: 0,
    currentTime: 10,
    sleepTime: 1000,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function reset() {
  state.values.hit = 0;
  state.values.result = 0;
  state.values.currentTime = 60;

  state.view.modal.classList.add("hide");

  clearInterval(state.actions.timerId);
  clearInterval(state.actions.countDownTimerId);

  state.actions.timerId = setInterval(randomSquare, state.values.sleepTime);
  state.actions.countDownTimerId = setInterval(
    countDown,
    state.values.sleepTime
  );
  state.view.score.textContent = state.values.result;
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    state.view.modal.classList.remove("hide");
    state.view.result.textContent = `${state.values.result} ponto(s).`;
  }
}

function playerSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.sqaures.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.sqaures[randomNumber];

  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.sqaures.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;

        playerSound("hit");
      }
    });
  });
}

function initialize() {
  addListenerHitBox();

  state.view.reset.addEventListener("click", reset);
}

initialize();
