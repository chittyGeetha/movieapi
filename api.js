let search=document.querySelector('#search');
search.addEventListener('keyup',(e)=>{
    //console.log(e.target.value);
    let searchText=e.target.value;
    SearchMovies(searchText);
    //when key press hide from text and H1
    let formText=document.getElementById("divblock");
    formText.style.display="none";
    search.classList.add("afterkeyPress");
    document.querySelector('#form-block').classList.add('afterkey_formblock');
});
//speech Recognition api
let speechSearch=document.getElementById("speechIcon");
speechSearch.addEventListener("click",()=>{
    let formText=document.getElementById("divblock");
    formText.style.display="none";
    search.classList.add("afterkeyPress");
    document.querySelector('#form-block').classList.add('afterkey_formblock');

    window.SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
    let Recognition=new SpeechRecognition();
    let p=document.createElement("p");
    Recognition.interimResults=true;
    Recognition.addEventListener("result",(e)=>{
        let transcript=[...e.results]
        .map((result)=>result[0])
        .map((result)=>result.transcript).join("");
        
        search.value=transcript;
        if(e.results[0].isFinal){
            p=document.createElement("p");
            p.innerHTML=transcript;
            let searchText=transcript;
            SearchMovies(searchText);
        }
    });
    Recognition.start();

});
function SearchMovies(searchText){
    console.log(searchText);
    let imdbApi=`http://www.omdbapi.com/?s=${searchText}&apikey=d48d222e`;
    window.fetch(imdbApi)
    .then((data)=>{
        data.json().then((movieData)=>{
            let movies=movieData.Search;
            let output=[];
            for(let movie of movies){
               let defaultImg=movie.Poster === "N/A"
                ? "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg":movie.Poster;
                console.log(movie);
                output +=`
                <div>
                <img src="${movie.Poster}"/>
                <h1>${movie.Title}</h1>
                <p>${movie.Year}</p>
                <a href="http://www.imdb.com/title/${movie.imdbID}/" target="_blank">Movie Details</a>
                </div>`;
    
            }

            document.getElementById("template").innerHTML=output;
        })
        .catch((err)=>console.log(err));
    })
    .catch((err)=>console.log(err));
}