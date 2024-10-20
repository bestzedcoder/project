
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STRORAGE_KEY ='PLAYER';

const playlist = $('.playlist');
const cd = $('.cd');
const heading =  $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playing = $('.btn.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const preBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const app = {
    songs : [
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Shape of You',
            singer : 'Ed Sheeran',
            path   : './assets/music/song2.mp3',
            image  : './assets/img/img2.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        },
        {
            name   : 'Blinding Lights',
            singer : 'The Weeknd',
            path   : './assets/music/song1.mp3',
            image  : './assets/img/img1.jpg'
        }
],
    //nhưng bài hát đã nghe
    songs_listened : [],
    // vị trí bài hát hiện tại
    currentIndex : 0,
    //state listen music
    isPlaying : false,
    //state random
    isRandom : false,
    //state repeat
    isRepeat : false,
    // localstorage
    //get
    config : JSON.parse(localStorage.getItem(PLAYER_STRORAGE_KEY)) || {},
    //set
    setConfig : function(key,value) {
          this.config[key] = value ;
          localStorage.setItem(PLAYER_STRORAGE_KEY , JSON.stringify(this.config));
    },
    // hiện danh sách bài hát
    render : function() {
        const htmls = this.songs.map(function(song,index) {
              return `
                 <div class="song ${index === app.currentIndex ? 'active' : ''}" data-index="${index}">
                      <div class="thumb"
                         style="background-image: url('${song.image}')">
                      </div>
                      <div class="body">
                           <h3 class="title">${song.name}</h3>
                           <p class="author">${song.singer}</p> 
                      </div>
                      <div class="option">
                           <i class="fas fa-ellipsis-h"></i>
                      </div>
                 </div>
              `
        });
        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function() {       
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });
    },
    
    loadCurrentSong : function() {
       heading.innerText =  this.currentSong.name;
       cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
       audio.src = this.currentSong.path;
       this.setConfig('song_listening' , this.currentIndex);
    },
     
    handleEvents : function() {
         // handle hiệu ứng cuộn ảnh
        const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
             // lấy độ dài dịch chuyển trên trình duyệt 
             const scrollTop = window.scrollY || document.documentElement.scrollTop;
             const newCdWidth = cdWidth - scrollTop;
             cd.style.width = newCdWidth >0 ? newCdWidth + "px" : 0;
        }
        
        //handle image quay
        const thumbAnimate = cdThumb.animate({transform : "rotate(360deg)"}, {
            duration : 10000,
            iterations: Infinity
        })
        thumbAnimate.pause();
         
        //handle khi click play
        playing.onclick = function(){
            if(!app.isPlaying)
            {
                audio.play();
            }
            else 
            {
                audio.pause();
            }
        }

        // handle khi play
        audio.onplay = function(){
            app.isPlaying = true;
            player.classList.add('playing');
            thumbAnimate.play();
        }

        // handle khi pause
        audio.onpause = function(){
            app.isPlaying = false;
            player.classList.remove('playing');
            thumbAnimate.pause();
        }
        
        // handle tiến độ 
        audio.ontimeupdate = function() {
            if(this.duration)
            {
                const progressPercent = Math.floor(this.currentTime / this.duration * 100);
                progress.value = progressPercent;
            }
        }

        // handle thay đổi progress
        progress.onchange = function(e) {
            const seekTime = audio.duration * e.target.value / 100;
            audio.currentTime = seekTime;
        }
        
        //handle chuyển lên bài hát
        nextBtn.onclick = function(){
            if(app.isRandom) {app.playRandomSong()}
            else app.nextSong();
            audio.play();
            app.render();
            app.intoViewSong();
        }
        
        //handle chuyển lùi bài hát
        preBtn.onclick = function() {
            if(app.isRandom) {app.playRandomSong()}
            else app.preSong();
            audio.play();
            app.render();
            app.intoViewSong();
        }

        // handle khi random
        randomBtn.onclick = function(){
            app.isRandom = !app.isRandom;
            app.setConfig('isRandom' , app.isRandom);
            this.classList.toggle('active' , app.isRandom);
        }

        //handle khi repeat
        repeatBtn.onclick = function(){
            app.isRepeat = !app.isRepeat;
            app.setConfig('isRepeat' , app.isRepeat);
            this.classList.toggle('active' , app.isRepeat);
        }

        // handle khi song hết bài
        audio.onended = function(){
            if(app.isRepeat)
            {
                audio.play();
            }
            else  nextBtn.click();
        }

        //handle click vào list song
        playlist.onclick = function(e) 
        {
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode || e.target.closest('.option'));
            {
                if(songNode)  {
                    app.currentIndex = Number(songNode.dataset.index);
                    app.loadCurrentSong();
                    app.render();
                }
            }
        }
   },
   
   intoViewSong()
   {
        setTimeout(function() {$('.song.active').scrollIntoView({
            behavior :  'smooth',
            block : 'nearest'
        });} , 300);
   },

   nextSong : function() {
    this.currentIndex++;
    if(this.currentIndex >= this.songs.length)
    {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
   },
   
   preSong : function() {
    this.currentIndex--;
    if(this.currentIndex < 0)
    {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
     
   },
   
   playRandomSong: function() {
       let newIndex;
       if(this.songs_listened.length === this.songs.length) this.songs_listened.length=0;
       do{
          
          newIndex  = Math.floor(Math.random()*this.songs.length);
       } while(this.currentIndex === newIndex || this.songs_listened.includes(this.songs[newIndex]));
       this.currentIndex = newIndex;
       this.songs_listened.push(this.songs[this.currentIndex]);
       this.loadCurrentSong();
   },
   loadConfig : function(){
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
    randomBtn.classList.toggle('active' , app.isRandom);
    repeatBtn.classList.toggle('active' , app.isRepeat);
    this.currentIndex = this.config.song_listening;
   },
   start : function() {

        this.loadConfig();
       //định nghĩ thuộc tính trong app
        this.defineProperties();

       // handle Event
        this.handleEvents();

        this.loadCurrentSong();
    
        this.render();
    }
}



app.start();
