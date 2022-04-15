let arr=['this','is','a','array'];
arr.find((value,index)=>{
  if (value=='array') {
    arr.splice(index,1);
  }
})

console.log(arr);
const setValue = (target, value) =>
  root.style.setProperty("--" + target, value);

const darkTheme = () => {
  setValue("background-color", "hsl(282, 50%, 3.9%)");
  setValue("ui-text-color", "hsl(284, 76.8%, 64.5%)");
  setValue("alfa", "1");
  setValue("notes-background-color", "hsla(275.6, 85%, 26.1%, var(--alfa))");
  setValue("alfa1", "calc(var(--alfa) - .1)");
  setValue("notes-color", "hsl(284, 76.8%, 64.5%)");
  setValue("icon-color", "hsl(284, 76.8%, 64.5%)");
  setValue("notes-hover-color", "hsl(284.1, 100%, 25.9%)");
  setValue("scrollbar-color", "var(--ui-text-color)");
  setValue("dailog-color", "hsl(275.6, 85%, 35.1%)");
  setValue("icon-hover-color", "hsl(275.6, 85%, 75.1%)");
  setValue("icon-done-hover-color", "var(--icon-hover-color)");
  setValue("shadow", "0 0 0.5rem 0.1rem hsla(275.6, 85%, 26.1%, var(--alfa1))");
  setValue("back-active-color", "hsla(275.6, 85%, 26.1%, var(--alfa1))");
  setValue("border-color", "hsl(284, 76.8%, 74.5%)");
};

const lightTheme = () => {
  setValue("background-color", "hsl(111, 33%, 8%)");
  setValue("ui-text-color", "hsl(120, 100%, 50%)");
  setValue("alfa", "1");
  setValue("notes-background-color", "hsla(120, 100%, 50%, var(--alfa)");
  setValue("alfa1", "calc(var(--alfa) - .1)");
  setValue("notes-color", "hsl(100, 3%, 23%)");
  setValue("icon-color", "hsl(0, 0%, 100%)");
  setValue("notes-hover-color", "hsl(96, 100%, 50%)");
  setValue("scrollbar-color", "hsl(120, 90%, 15%)");
  setValue("dailog-color", "hsla(120, 78%, 49%, 0.986)");
  setValue("icon-hover-color", "hsl(110, 98%, 48%)");
  setValue("icon-done-hover-color", "hsl(110, 64%, 24%)");
  setValue("shadow", "0 0 0.5rem 0.1rem hsla(120, 79%, 21%, var(--alfa1))");
  setValue("back-active-color", "hsla(120, 79%, 21%, var(--alfa1))");
  setValue("border-color", "rgb(21, 59, 4)");
};