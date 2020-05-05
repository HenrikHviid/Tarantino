let movies =
    [
        {
            "Title": "The Hateful Eight",
            "YoutubeId": "nIOmotayDMY"
        },
        {
            "Title": "Death Proof",
            "YoutubeId": "QWIyJZV0wl0"
        },
        {
            "Title": "Inglourious Basterds",
            "YoutubeId": "KnrRy6kSFF0"
        },
        {
            "Title": "Planet Terror",
            "YoutubeId": "KaWPHLZAZbg"
        },
        {
            "Title": "Kill Bill - Vol. 2",
            "YoutubeId": "WTt8cCIvGYI"
        },
        {
            "Title": "Jackie Brown",
            "YoutubeId": "G7HkBDNZV7s"
        },
    ];

const app = document.getElementById('root');
app.style.setProperty('--total', movies.length);

const container  = document.createElement('div');
container.setAttribute('class', 'container');

const hs = document.createElement('ul');
hs.setAttribute('class', 'hs full');

let url = "https://www.omdbapi.com/?apikey=789d41d5&t=";

movies.forEach( movie => {
    let thisUrl = url + movie.Title.replace(/ /g,"+");

    fetch(thisUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const listitem = document.createElement('li');

            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const CardImg = document.createElement('img');
            CardImg.src = data.Poster;
            CardImg.alt = 'Watch on youtube';
            CardImg.onclick = function() {

            };

            const CardTitle = document.createElement('h2');
            CardTitle.textContent = movie.Title;

            const PlotContainer = document.createElement('div')
            PlotContainer.setAttribute('class', 'PlotContainer');
            const CardPlot = document.createElement('p');
            CardPlot.setAttribute('class', 'plot');
            CardPlot.textContent = data.Plot;

            const CardimdbRating = document.createElement('p');
            CardimdbRating.textContent = 'IMDB raiting: ' + data.imdbRating;

            const CardAge = document.createElement('p');
            CardAge.textContent = 'Movie Age: ' + Number(new Date().getFullYear()-data.Year);

            const show = document.createElement('h3');
            const hide = document.createElement('h3');
            show.textContent = 'Watch trailer';
            show.value = movie.YoutubeId;
            show.onclick = function() {
                player.style.visibility = 'visible';
            }

            const player = document.createElement('iframe');
            player.allowFullscreen = 'true';
            player.width = '250px';
            player.setAttribute('class', 'player');
            player.src = 'https://www.youtube.com/embed/' + movie.YoutubeId;

            app.appendChild(scrollbar);
            app.appendChild(container);
            container.appendChild(hs);
            hs.appendChild(listitem);

            app.appendChild(player);

            card.appendChild(CardImg);
            card.appendChild(CardTitle);
            PlotContainer.appendChild(CardPlot);
            card.appendChild(PlotContainer);
            card.appendChild(CardimdbRating);
            card.appendChild(CardAge);
            card.appendChild(show);
            card.appendChild(hide);
            card.appendChild(player);

            listitem.appendChild(card);


        })
        .catch(err => {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
        })

})

