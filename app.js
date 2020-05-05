let movies =
    [
        {
            "Title": "The Hateful Eight",
            "YoutubeId": "https://www.youtube.com/watch?v=nIOmotayDMY"
        },
        {
            "Title": "Death Proof",
            "YoutubeId": "https://www.youtube.com/watch?v=EAPy76vxF5s"
        },
        {
            "Title": "Death Proof",
            "YoutubeId": "https://www.youtube.com/watch?v=EAPy76vxF5s"
        },
        {
            "Title": "Inglourious Basterds",
            "YoutubeId": "https://www.youtube.com/watch?v=EAPy76vxF5s"
        },
        {
            "Title": "Planet Terror",
            "YoutubeId": "https://www.youtube.com/watch?v=KaWPHLZAZbg"
        },
        {
            "Title": "Kill Bill - Vol. 2",
            "YoutubeId": "https://www.youtube.com/watch?v=WTt8cCIvGYI"
        },
        {
            "Title": "Jackie Brown",
            "YoutubeId": "https://www.youtube.com/watch?v=G7HkBDNZV7s"
        },
    ];


const app = document.getElementById('root');
app.style.setProperty('--total', movies.length);


const container  = document.createElement('div');
container.setAttribute('class', 'container');



const hs = document.createElement('ul');
hs.setAttribute('class', 'hs full');



let url = "http://www.omdbapi.com/?apikey=789d41d5&t=";


movies.forEach( movie => {
    let thisUrl = url + movie.Title.replace(/ /g,"+");
    console.log(thisUrl);



    fetch(thisUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const listitem = document.createElement('li');

            const card = document.createElement('div');
            card.setAttribute('class', 'card')

            const CardImg = document.createElement('img');
            CardImg.src = data.Poster;
            CardImg.alt = 'Watch on youtube'
            CardImg.onclick = function() {
                window.location.href = movie.YoutubeId;
            };

            const CardTitle = document.createElement('h3');
            CardTitle.textContent = movie.Title;

            const PlotContainer = document.createElement('div')
            PlotContainer.setAttribute('class', 'PlotContainer');
            const CardPlot = document.createElement('p');
            CardPlot.textContent = data.Plot;

            const CardimdbRating = document.createElement('p');
            CardimdbRating.textContent = 'IMDB raiting: ' + data.imdbRating;

            const CardAge = document.createElement('p');
            CardAge.textContent = 'Movie Age: ' + Number(new Date().getFullYear()-data.Year);

            app.appendChild(container);
            container.appendChild(hs);
            hs.appendChild(listitem);

            card.appendChild(CardImg);
            card.appendChild(CardTitle);
            PlotContainer.appendChild(CardPlot);
            card.appendChild(PlotContainer);
            card.appendChild(CardimdbRating);
            card.appendChild(CardAge);

            listitem.appendChild(card);




        })
        .catch(err => {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
        })
})
