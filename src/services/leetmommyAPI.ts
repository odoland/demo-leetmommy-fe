import axios from 'axios';

const URL = 'https://leetmommy2.herokuapp.com';
// const URL = 'http://127.0.0.1:5000';

/**
 * Whether the ping was successful or not
 */
export interface PingSuccess {
  ping: boolean;
}

/**
 * Lecture note object.
 */
export interface Doc {
  url: string,
  title: string,
  /**
   * Each lecture page has an h1, h2 .. h3 heading that titles each section. This is a list of them.
   */
  headers: string[],

  /**
   * These hold all the highlighted matched words of the text 
   */ 
  highlight: Highlight,
}

export interface Highlight {
  headers: string[],
  title: string[],
  code: string[],
  bullets: string[],
  text: string[],
}

class LeetMommyAPI {

  /**
   * Wakes up heroku servers
   */
  public static ping = async (): Promise<PingSuccess> => {
    console.log('pinging');
    return (await axios.get(`${URL}/ping`)).data;
  }

  /**
   * Returns a list of lecture titles 
   */
  public static autocomplete = async (cohort: string, query: string): Promise<string[]> => {
    const result = await axios.get(`${URL}/autocomplete?cohort=${cohort}&query=${query}`);
    return result.data.data;
  }

  /**
   * Returns a list of Doc objects
   */
  public static search = async (cohort: string, query: string): Promise<Doc[]> => {
    const result = await axios.get(`${URL}/search?cohort=${cohort}&query=${query}`);
    return result.data.data;
  }
};

export default LeetMommyAPI;