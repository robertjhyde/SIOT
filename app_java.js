// URL to interface with weather API
console.log('initialise weather');
$.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=51.5034&lon=-0.1276&units=metric&APPID=b86a379432e58691f2f66c05fc442ddf', function(data) {
  console.log(data);  //print data to console (inspect)
  
  //store data as variables
  var clouds = data.clouds.all;  //index to cloud coverage (%)
  var hum = data.main.humidity;  //index to humidity (%)
  var temp = data.main.temp;  //index to temp (C)
  var windsp = data.wind.speed;  //index to wind speed (m/s)
  var time = data.dt;  //index to time sample taken (UTC)
  var sunset = data.sys.sunset;  //index to sunset time (UTC)
  var sunrise = data.sys.sunrise;  //index to sunrise time (UTC)
  var fe_li = data.main.feels_like;  //feels like temp (C)
  var eye_test = data.weather[0].description;
  var mood = 1; // happy by default becuase life is fun
  console.log(eye_test);

  if (time < sunrise) {   
    light = 'dark';
  } else if (time < sunset) {
    light = 'light';
  } else {
    light = 'dark'
  }

  if (fe_li < 0) {
    feels = 'freezing'
    mood = 0;              // 0 = sad
  } else if (fe_li < 8) {
    feels = 'cold'
    mood = 0;
  } else if (fe_li < 16) {
    feels = 'medium'
    mood = 1;              // 1 = happy
  } else if (fe_li < 24) {
    feels = 'hot'
    mood = 1;
  } else {
    feels = 'sweaty'
    mood = 1;
  }
  
  console.log(mood);
  var happy = document.getElementById("happy");
  song = Math.floor(Math.random() * 10);  // returns a random integer from 0 to 9

  happy.style.opacity = mood;   // change boris animation

  if (mood == 0) {           // sad music track
    console.log('sad');
    if (song == 0) {         // (say something)
      music = 'https://open.spotify.com/embed/track/5TvE3pk05pyFIGdSY9j4DJ?si=kxaY_dd7TVaNVj8TrUur6g'
    } else if (song == 1) {  // (good news - rip mac)
      music = 'https://open.spotify.com/embed/track/3ClBKQkKoaUQ6UOhe2xlJK?si=G5tVJnojRq-81_EXhG4xmw'
    } else if (song == 2) {  // (the sounds of silence)
      music = 'https://open.spotify.com/embed/track/3CepTOU9Y7FezTt0CF3lCw?si=CEXABLAzRtK__uBu9mLEbA'
    } else if (song == 3) {  // (sad nibba hours)
      music = 'https://open.spotify.com/embed/track/2TfoabXa0CbEwcqpxOn9z3?si=kh_XqCDXSD2CN-5ZouNgWw'
    } else if (song == 4) {  // (lessons)
      music = 'https://open.spotify.com/embed/track/5iVGN1Th2DqyWVNIBM8Vwk?si=x6bahDfQTiyQL9gw6s4e4g'
    } else if (song == 5) {  // (evil morty theme)
      music = 'https://open.spotify.com/embed/track/2LlOBKdMp9gjyQugJTMYwa?si=cm4VpjkWRbqdadDM9DSA5w'
    } else if (song == 6) {  // (all by myself)
      music = 'https://open.spotify.com/embed/track/0gsl92EMIScPGV1AU35nuD?si=nvPzoI61Tq68gRYxyctwqg'
    } else if (song == 7) {  // (wake me up when september ends)
      music = 'https://open.spotify.com/embed/track/3ZffCQKLFLUvYM59XKLbVm?si=Tj4THKb0SC20wla2jkJ9FA'
    } else if (song == 8) {  // (bring me to life)
      music = 'https://open.spotify.com/embed/track/0COqiPhxzoWICwFCS4eZcp?si=M0ZvnJF4SqmjAwCYzdrX3A'
    } else {                 // (fix you)
      music = 'https://open.spotify.com/embed/track/7LVHVU3tWfcxj5aiPFEW4Q?si=L8ZkMgRtSdGed8kS9m11aw'
    }
    
  } else {    // happy music track (unwritten) 
    console.log('happy');
    if (song == 0) {         // (god's plan)
      music = 'https://open.spotify.com/embed/track/6DCZcSspjsKoFjzjrWoCdn?si=P7vqpnGhQBmkxQDyZCOmYg'
    } else if (song == 1) {  // (thank u next)
      music = 'https://open.spotify.com/embed/track/3e9HZxeyfWwjeyPAMmWSSQ?si=wLXz7rPGTMW-ccaq72m2mw'
    } else if (song == 2) {  // (dancing in the moonlight)
      music = 'https://open.spotify.com/embed/track/3Fzlg5r1IjhLk2qRw667od?si=PAJyfFp7TXSQD4jT40-F4A'
    } else if (song == 3) {  // (mr blue sky)
      music = 'https://open.spotify.com/embed/track/2RlgNHKcydI9sayD2Df2xp?si=LbKt6KsWT52vx21tbuoeYA'
    } else if (song == 4) {  // (hakuna mattata)
      music = 'https://open.spotify.com/embed/track/2ooEcchimUkkY52WVl1ON4?si=0ede5Eg_S_C0SLRQFyWUYw'
    } else if (song == 5) {  // (three little birds)
      music = 'https://open.spotify.com/embed/track/6A9mKXlFRPMPem6ygQSt7z?si=E92Jt87iRFq2wawQrQMAVg'
    } else if (song == 6) {  // (september)
      music = 'https://open.spotify.com/embed/track/7Cuk8jsPPoNYQWXK9XRFvG?si=u7ySAo8VTDKalK13mR-hzQ'
    } else if (song == 7) {  // (celebration)
      music = 'https://open.spotify.com/embed/track/3K7Q9PHUWPTaknlbFPThn2?si=aWRq4RM8TdG-mRYOg2iONg'
    } else if (song == 8) {  // (wake me up before you go-go)
      music = 'https://open.spotify.com/embed/track/0ikz6tENMONtK6qGkOrU3c?si=Zw7pw8xSTf2yv4XZf9CXxQ'
    } else {                 // (unwritten)
      music = 'https://open.spotify.com/embed/track/1D1nixOVWOxvNfWi0UD7VX?si=oWutZ3dVRkeSFIYzHY_QlQ'
    }
  }
  console.log(music);
  
  //send values to html
  //$('.music').text(music)
  document.getElementById("musicplayer").src = music;
  $('.clouds').text(clouds)
  document.getElementById('.clouds').innerHTML = clouds;
  $('.hum').text(hum)
  document.getElementById('.hum').innerHTML = hum;
  $('.temp').text(temp)
  document.getElementById('.temp').innerHTML = temp;
  $('.windsp').text(windsp)
  document.getElementById('.windsp').innerHTML = windsp;
  $('.feels').text(feels)
  document.getElementById('.feels').innerHTML = feels;
  $('.light').text(light)
  document.getElementById('.light').innerHTML = light;
});

//white hosue weather
//$.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=38.8980&lon=-77.0366&units=metric&APPID=b86a379432e58691f2f66c05fc442ddf', function(white_house) {console.log(white_house);});

// OPENWEATHER API   -   https://openweathermap.org/appid
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&APPID={key}
//b86a379432e58691f2f66c05fc442ddf   -   Key

//Humidity = %   ,   Temp = °C   ,   Wind Speed = m/s   ,   Clouds = % cover

//51.4764° N, -0.1982° W             -   39 Novello Street Coordinates
//51.5034° N, -0.1276° W             -   10 Downing Street Coordinates (Boris Johnson)
//38.8980° N,-77.0366° W             -   White House Coordinates (Donald Trump)
//55.7521° N, 37.6177° W             -   Kremlin Coordinates (Vladamir Putin - not twitter)
//48.8688° N,  2.3098° W             -   Elysee Palace Corrdinates (Emmanuelle Macron)
//45.4444° N, 75.6938° W             -   24 Sussex Drive Coordinates (Justin Tradeu)





//Spotify API
//fc3d0620e97a436fb32b70654a6aaf31 - client ID
//d2b85e779737446ea033364e095187e7 - client secret
//The L with this technique is that it needs the node.js tings. Maybe I should learn, becuase then I can access Twitter live too? Or not.

//Embed song things
//https://open.spotify.com/track/5iVGN1Th2DqyWVNIBM8Vwk?si=DC-fMSplSCi5ddcInWpmcw
//<iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>




//console.log('initialise twitter');

//$.ajax({url: "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=BorisJohnson&count=1",
  //  headers: {"oauth_token": "1203444676998684675-ivwKMTDL6LYRNhhkztWxwxAg0zErA6",
    //    "oauth_token_secret": "cu0uLkFzNv5oyo4EyMjVSBEKOHRBGRHJqRJy7P9bZJGZr"}}), function (tweet){
      //    console.log(tweet);
        //}

//$.getJSON('https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=@BorisJohnson&count=5', function(tweet) {
  //console.log(tweet);})

//Twitter API
//
//VdGnmyuyik38KLOYe8XtZKPig   -   client key
//X7LYmZfcey63m6watmyr1rsgss0aSpp1ADblcbB7TZXJ4V3QzK   -   secret key
//1203444676998684675-ivwKMTDL6LYRNhhkztWxwxAg0zErA6   -   access token
//cu0uLkFzNv5oyo4EyMjVSBEKOHRBGRHJqRJy7P9bZJGZr        -   secret token
//dev   -   developer environment
//


// JavaScript Document

//http://code.jquery.com/jquery-1.7.1.min.js