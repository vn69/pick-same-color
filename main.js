const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const body = $("body");
const board = $(".board");
const winText = $(".win-text");
const resetBtn = $(".btn-reset");
let itemList = $$(".item");
const selectBtn = $("#level");
const hintBtn = $(".btn-hint");

const app = {
  clickCount: 0,
  countToWin: 0,
  totalCount: 8,
  color1: "",
  domColor1: null,
  level: 1,
  colorList: [
    "#f59e42",
    "#f59e42",
    "#f5dd42",
    "#f5dd42",
    "#9ef542",
    "#9ef542",
    "#42f5c8",
    "#42f5c8",
    "#f54242",
    "#f54242",
    "#4242f5",
    "#4242f5",
    "#bc42f5",
    "#bc42f5",
    "#f542b6",
    "#f542b6",
    "#000",
    "#000",
    "#bce6f5",
    "#bce6f5",
    "#0d1678",
    "#0d1678",
    "#32a875",
    "#32a875",
    "#786d0d",
    "#786d0d",
    "#782d0d",
    "#782d0d",
    "#422936",
    "#422936",
    "#780d61",
    "#780d61",
  ],

  newGame: function () {
    board.innerHTML = "";
    this.clickCount = 0;
    this.countToWin = 0;
    this.color1 = "";
    this.domColor1 = null;
    let newArr = this.colorList.slice();
    if (this.level == 1) newArr = this.colorList.slice(0, 8);
    else if (this.level == 2) newArr = this.colorList.slice(0, 16);

    newArr = this.shuffleArray(newArr);
    // const newArr = this.colorList;
    newArr.forEach((color) => {
      const item = document.createElement("DIV");
      item.classList.add("item");
      item.dataset.color = color;

      const itemColor = document.createElement("DIV");
      itemColor.classList.add("item-color");
      itemColor.style.backgroundColor = color;

      item.appendChild(itemColor);
      board.appendChild(item);
    });
    winText.classList.remove("win-text-show");

    this.handleEvent();
  },

  handleEvent: function () {
    // click to item
    itemList = $$(".item");
    itemList.forEach((item) => {
      item.onclick = () => {
        if (item.classList.contains("active")) return;
        if (item.classList.contains("show")) return;

        this.clickCount++;
        if (this.clickCount == 3) this.clickCount = 1;

        if (this.clickCount == 1) {
          this.removeActive();
          item.classList.add("active");

          this.color1 = item.dataset.color;
          this.domColor1 = item;
          return;
        }
        if (this.clickCount == 2) {
          item.classList.add("active");

          // check color
          if (item.dataset.color === this.color1) {
            item.classList.add("show");
            this.domColor1.classList.add("show");
            this.countToWin += 2;
            body.style.backgroundColor = item.dataset.color;
            if (this.countToWin == this.totalCount) {
              winText.classList.add("win-text-show");
            }
          }
          return;
        }
      };
    });

    // click reset btn
    resetBtn.onclick = () => {
      this.newGame();
    };

    // select level
    selectBtn.onchange = () => {
      const value = selectBtn.value;
      this.level = value;
      this.totalCount = 8;
      hintBtn.disabled = true;
      if (value == 2) {
        this.totalCount = 16;
        hintBtn.disabled = false;
      } else if (value == 3) {
        this.totalCount = 32;
        hintBtn.disabled = false;
      }
      this.newGame();
    };

    // click hint btn
    hintBtn.onclick = () => {
      board.classList.add("hint");
      setTimeout(() => {
        board.classList.remove("hint");
      }, 1000);
    };
  },
  removeActive: function () {
    itemList.forEach((item) => {
      item.classList.remove("active");
    });
  },

  shuffleArray: function (arr) {
    return arr.sort(() => 0.5 - Math.random());
  },

  start: function () {
    this.newGame();

    this.handleEvent();
  },
};
app.start();
