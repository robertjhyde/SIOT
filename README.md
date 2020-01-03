# SIOT
Sensing and Internet of Things:  4th Year Module: Imperial College London: Design Engineering

An web-based API project that achieved:
- Correlatation of local weather and mood of Londoners.
- Creation of spotify playlist for the city for the day.


See this project live here:


This project used the following APIs:
- Open Weather Map: https://openweathermap.org/api
- Twitter: https://developer.twitter.com/en/docs
- Spotify: https://developer.spotify.com/documentation/web-api/


Enjoy and remember... next time you curse at the sky, it might just curse back.




# Instructions for Set-Up

There are 3 python packages to install before use. These can be installed using the 'pip' command in the command line. The packages are as follows:
- PyGithub
- tweepy
- textblob

Once installed. You need to obtain your own api keys/ tokens for each api. These are simple, just sign up and follow the set up instructions on the websites.
Once obtained you need to put them in the correct places in the code. These are marked clearly for you. Do not upload these, as people can steal them. Keep them hidden, keep them safe.

In the first (/test) run of the code, you must uncomment the line 'nltk.download('stopwords')'. This is needed to download the most commonly used words (e.g. 'a', 'it'), so that the program can remove them from tweets. Which increases the quality of the results. Once ran once (downloaded) you have to comment it again so it doesn't downlaod every run.

For data storage I am using GitHub, but if you wanted to store locally you can remove the push_data function. The code should create 2 .csv files in the location you are running your code, to store the data before pushing to GitHub. If this doesn't happen, create these files for yourself and it should work.

Now your ready to run my code! 'main.py' is the file for data collection and the other files relate to the data analysis or web application.

But if you are feeling adventorous you can change the locations or any setting. Go on, take a step of faith.
