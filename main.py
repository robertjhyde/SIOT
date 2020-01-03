# system imports
import os, sys
import pandas as pd
import matplotlib.pyplot as plt
import itertools
import collections
import sched, time
import csv
from github import Github, InputGitTreeElement   # install 'PyGithub' using pip command

# twitter imports 
import tweepy as tw                 # install 'tweepy' using pip command
import nltk
from nltk.corpus import stopwords
import re
from textblob import TextBlob       # install 'textblob' using pip command

# weather imports
import json
from requests import get

# twitter keys
consumer_key = 'INSERT YOURS HERE'
consumer_secret = 'INSERT YOURS HERE'
access_token = 'INSERT YOURS HERE'
access_token_secret = 'INSERT YOURS HERE'

# weather key
weather_key = 'INSERT YOURS HERE'

# github token
token = 'INSERT YOURS HERE'

# initialise keys using tweepy package
auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

# collect location tweets   -   limit = 180 requests every 15 minutes
def get_loc_tweets (q_0, geo_0):
    tweets = tw.Cursor(api.search, q=q_0, geocode=geo_0, lang="en",
        tweet_mode='extended').items(100)
    return tweets

# removes URLs and other symbols found in the tweets
def remove_url(txt):
       return " ".join(re.sub("([^0-9A-Za-z \t])|(\w+:\/\/\S+)", "", txt).split())

# collect weather data   -   limit = 100 requests an hour
def get_weather(key, location):
    api_url = "https://api.openweathermap.org/data/2.5/weather?lat={loc[0]}&lon={loc[1]}&units=metric&APPID={apikey}".format(
        apikey=key, loc=location)
    resp = get(api_url)
    return json.loads(resp.text)



# initialise variables
location = [51.5034,-0.1276]          # [lat,lon] for weather api
tweet_loc = "51.5034,-0.1276,15km"    # lat,long,square for twitter api
search = "weather -filter:retweets"   # search terms for twitter
#nltk.download('stopwords')                     # downloads latest stopwords from package (uncomment for first run)
stop_words = set(stopwords.words('english'))    # initialise stopwords

# initialise local storage lists
prev_twits = []


# fucntion to store data on github
def push_data(t_0):
    g = Github(t_0)                                      # github login
    repo = g.get_user().get_repo('SIOT')                 # go to repositrory
    file_list = ['weather_data.csv','twitter_data.csv']  # file to push
    commit_message = 'AUTO: Datapoint added'             # note for push
    master_ref = repo.get_git_ref('heads/master')
    master_sha = master_ref.object.sha
    base_tree = repo.get_git_tree(master_sha)
    element_list = list()
    for i, entry in enumerate(file_list):
        with open(entry) as input_file:
            data = input_file.read()
        element = InputGitTreeElement(file_list[i], '100644', 'blob', data)
        element_list.append(element)
    tree = repo.create_git_tree(element_list, base_tree)
    parent = repo.get_git_commit(master_sha)
    commit = repo.create_git_commit(commit_message, tree, [parent])
    master_ref.edit(commit.sha)







# main body
def main(): 
    sentiment_objects = []
    if len(prev_twits) > 200:   # prevent size of previous tweets list becoming excessive (reduce required memory of algorithm)
        i = 0
        while i < 100:          # pop oldest 100 tweets from list
            prev_twits.pop(i)
            i += 1
    else:
        pass

    # weather things
    try:
        current_weather = get_weather(weather_key, location)
        # grab useful data
        time = current_weather['dt']                   #index to time sample taken (UTC)
        temp = current_weather['main']['temp']         #index to temp (C)
        feels = current_weather['main']['feels_like']  #feels like temp (C)
        clouds = current_weather['clouds']['all']      #index to cloud coverage (%)
        hum = current_weather['main']['humidity']      #index to humidity (%)
        wind = current_weather['wind']['speed']        #index to wind speed (m/s)
    except:
        time = 'weather api failed'
        temp = 0
        feels = 0
        clouds = 0
        hum = 0
        wind = 0
    

    # twitter tings
    try:
        tweet_test2 = get_loc_tweets(search, tweet_loc)   # get tweets
        for tweet in tweet_test2:
            twit = tweet.full_text          # full_ allows for 280 character tweets
            if twit not in prev_twits:      # if tweet is not a duplicate
                prev_twits.append(twit)
                twit2 = remove_url(twit)    # remove URL and symbols from tweet

                senti = TextBlob(twit2)                  # create textblob of tweet
                senti_value = senti.sentiment.polarity   # calculate sentiment value
                sentiment_objects.append(senti_value)    # store values

                lower_tweet = twit2.lower().split()    # lower case and split into unique words
                reduced_tweet = [word for word in lower_tweet if not word in stop_words]  # remove filler words
                
                t_row = [time, str(senti), senti_value, reduced_tweet]   #store values in row  -  time is for linking datasets together
                
                # write to csv file
                with open(os.path.join(sys.path[0], "twitter_data.csv"),'a') as f:
                    writer = csv.writer(f)
                    writer.writerow(t_row)
                # test
                print('twitter to csv successful')
            else:
                pass
    except:
        t_row = ['twitter api failed',0,0,0]
        # write to csv file
        with open(os.path.join(sys.path[0], "twitter_data.csv"),'a') as f:
            writer = csv.writer(f)
            writer.writerow(t_row)

        
    # write weather and sentiment value data to csv
    sentiment = sum(sentiment_objects)/len(sentiment_objects)   # average sentiment value for time 
    w_row = [time, temp, feels, clouds, hum, wind, sentiment]   #store values in row
    print(w_row)
    # write to csv file
    with open(os.path.join(sys.path[0], "weather_data.csv"),'a') as f:
        writer = csv.writer(f)
        writer.writerow(w_row)
    # test
    print('weather to csv successful')


    # push twitter data to github
    try:
        push_data(token)
        print('sent data to github succesfully')
    except:
        print('could not upload data to github :(')


print('starting...')
main()




"""
# twitter analysis  -  this code is for use after data collection has taken place

#word frequency analysis
flat_filt = list(itertools.chain(*filt_tweets))   # flatten filtered tweet list
word_counter = collections.Counter(flat_filt)     # count most common words
#print(word_counter.most_common(15))               # print the 15 most common
common_words = pd.DataFrame(word_counter.most_common(15), columns=['Words', 'Count'])

# Plot horizontal bar graph
fig, ax = plt.subplots(figsize=(8, 8))
common_words.sort_values(by='Count').plot.barh(x='Words', y='Count', ax=ax, color="purple")
ax.set_title("Word Frequency Analysis for Tweets on the Weather")
plt.show()


# sentiment analysis
#print(sentiment_objects)
sentiment_df = pd.DataFrame(sentiment_objects, columns=["Polarity", "No. of Tweets"])
sentiment_df = sentiment_df[sentiment_df.Polarity != 0]    # Remove polarity values equal to zero

fig, ax = plt.subplots(figsize=(8, 6))
sentiment_df.hist(bins=[-1, -0.75, -0.5, -0.25, 0.0, 0.25, 0.5, 0.75, 1],
             ax=ax,
             color="purple")

plt.title("Sentiment Analysis of Tweets on the Weather")
plt.show()



"""





