
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import dotenv from "dotenv";
import crypto from 'crypto'; // Import the crypto module
dotenv.config();

const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_KEY_SECRET = process.env.TWITTER_API_KEY_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET;

if (!TWITTER_API_KEY) throw "TWITTER_API_KEY not defined";
if (!TWITTER_API_KEY_SECRET) throw "TWITTER_API_KEY_SECRET not defined";
if (!TWITTER_ACCESS_TOKEN) throw "TWITTER_ACCESS_TOKEN not defined";
if (!TWITTER_ACCESS_TOKEN_SECRET) throw "TWITTER_ACCESS_TOKEN_SECRET not defined";

const oauth = new OAuth({
  consumer: {
    key: TWITTER_API_KEY,
    secret: TWITTER_API_KEY_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
});
const accessToken = {
  key: TWITTER_ACCESS_TOKEN,
  secret: TWITTER_ACCESS_TOKEN_SECRET,
};

export const getTwitterUser = async (username: string): Promise<{
  profilePic: string,
  followers: number
}> => {
  // const url = 'https://api.twitter.com/1.1/users/show.json?screen_name=' + username;
  const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics,profile_image_url`;

  const requestData = {
    url,
    method: 'GET',
  };

  const headers = oauth.toHeader(oauth.authorize(requestData, accessToken));

  try {
    const response = await axios.get(url, { headers });
    const profile_image_url = response.data.data.profile_image_url;
    const followers_count = response.data.data.public_metrics.followers_count;

    console.log(response.data);
    console.log('Profile Picture URL:', profile_image_url);
    console.log('Follower Count:', followers_count);
    return {
      profilePic: profile_image_url,
      followers: followers_count
    }
  } catch (error: any) {
    console.error('Error:', error.response.data.errors);
    throw ('Error:' + error.response.data.errors);
  }
};

getTwitterUser('isaiahballah');
