const music =document.querySelector('audio');
const img = document.querySelector('img');
const play = document.getElementById('play');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

let progress =document.getElementById('progress');
let total_duration = document.getElementById('duration');
let current_time = document.getElementById('current_time');

const progress_div = document.getElementById('progress_div');

//song data

const songs = [
    {
        name:"1",
        title:"Kaun tujhe",
        artist:"Palak Muchhal",
    },
    {
        name:"2",
        title:"Kusu kusu",
        artist:"Zehra Khan",
    },
    {
        name:"3",
        title:"Nach meri rani",
        artist:"Guru Randhwa",
    },
    {
        name:"4",
        title:"Raataan Lambiyan",
        artist:"Tanishk Bagchi",
    },
    {
        name:"5",
        title:"Proper Patola",
        artist:"Badshah",
    },
    {
        name:"6",
        title:"Do Ghoont(Remix)",
        artist:"DJ Essam ",
    },
]

let isPlaying = false;
//for play functanality

const playMusic = () =>{
    isPlaying=true;
    music.play();
    play.classList.replace('fa-play','fa-pause');
    img.classList.add('anime');
}

//for pause functanality

const pauseMusic= () =>{
    isPlaying=false;
    music.pause();
    play.classList.replace('fa-pause','fa-play');
    img.classList.remove('anime');
}

play.addEventListener('click', () =>{  
    isPlaying ? pauseMusic() : playMusic() ;
})

// changing the music data

const loadSong =(songs)=>{
    title.textContent =songs.title;
    artist.textContent =songs.artist;

    music.src = "music/" +songs.name + ".mp3";
    img.src = "images/" + songs.name + ".jpg";
}

  var songIndex=0;
// loadSong(songs[0]);

//next/previous songs

const nextSong = () =>{
    songIndex = (songIndex -1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}
const prevSong = () =>{
    songIndex = (songIndex +1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

// progress js works

music.addEventListener('timeupdate',(event)=>{
    // console.log(event);
    const {currentTime,duration} = event.target;
    // console.log(currentTime);
    // console.log(duration);
    let progress_time =(currentTime/duration) *100;
    progress.style.width= ` ${ progress_time }%`;

    // music duration update

    let min_duration =Math.floor(duration / 60);
    let sec_duration =Math.floor(duration % 60);
    let tot_duration = `${min_duration}: ${sec_duration}`;
    if(duration){
        total_duration.textContent =`${tot_duration}`;
    }
    
    // current duration update

    let min_currentTime =Math.floor(currentTime / 60);
    let sec_currentTime =Math.floor(currentTime % 60);
   
    if(sec_currentTime<10){
        sec_currentTime =`0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime}: ${sec_currentTime}`;
    current_time.textContent =`${tot_currentTime}`;
        
})

    // progress onclick functanility

    progress_div.addEventListener('click',(event)=>{
        console.log(event)
        const {duration} = music;

        let move_progress = (event.offsetX /event.target.clientWidth) *duration;
        console.log(duration)
        console.log(move_progress)
        music.currentTime= move_progress;
    })

// if music ends next song func called and playes next song
music.addEventListener('ended',nextSong)

next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);