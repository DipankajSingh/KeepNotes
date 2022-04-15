# KeepNotes

const button =document.getElementById('button');
const jokeText=document.getElementById('paragraph');


addEventListener('DOMContentLoaded',getJoke)
button.addEventListener('click',getJoke);

function getJoke(){
    fetch('https://icanhazdadjoke.com/',{
        headers:{
            'accept':'application/json'
        } }).then(data=>data.json()).then(obj=>jokeText.innerHTML=obj.joke)
}