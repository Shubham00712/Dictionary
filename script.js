const url=`https://api.dictionaryapi.dev/api/v2/entries/en/`;
const result=document.getElementById("result");
const btn=document.getElementById("search-btn");
const sound=new Audio();

btn.addEventListener('click',()=>{
    let inp=document.getElementById("inputword").value;
    fetch(`${url}${inp}`)
    .then((respnose)=>respnose.json())
    .then((data)=>{
        // console.log(data[0])
        let audio=data[0].phonetics.filter((obj,i)=> {return obj.audio!==''})
        // console.log(audio.length)
        result.innerHTML=`
        <div class="word">
            <h3>${data[0].word}</h3>
            ${audio.length!==0 ? `<button onclick="playSound()"><i class='fas fa-volume-up'></i></button>`:''}
        </div>
        <div class="details">
        ${data[0].meanings[0].partOfSpeech ? `<p>${data[0].meanings[0].partOfSpeech}</p>`:""}
        ${data[0].phonetic ? `<p>/${data[0].phonetic}/</p>`:""}
        </div>
        <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
        ${data[0].meanings[0].definitions[0].example ? `<p class="word-example">${data[0].meanings[0].definitions[0].example}</p>` : ""}`
        if(audio.length>0)
        sound.setAttribute('src',audio[0].audio)
        //console.log(audio)
    })
    .catch(()=>{
        result.innerHTML=`<div class="err"><h2 id="error-msg">Couldn't find your word!</h2><i class="fa-regular fa-face-frown fa-3x"></i></div>`
    })
})

function playSound(){
    sound.play()
}