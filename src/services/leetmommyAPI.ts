import axios from 'axios';

// const URL = 'https://leetmommy2.herokuapp.com';
const URL = 'http://127.0.0.1:5000';

export interface Ping {
  ping: boolean;
}

export interface Doc {
  url: string,
  title: string,
  headers: string[],
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
  public static ping = async (): Promise<Ping> => {
    console.log('pinging');
    return await axios.get(`${URL}/ping`);
  }

  /**
   *  
   */
  public static autocomplete = async (cohort: string, query: string): Promise<string[]> => {
    const result = await axios.get(`${URL}/autocomplete?cohort=${cohort}&query=${query}`);
    return result.data.data;
  }

  /**
   * 
   */
  public static search = async (cohort: string, query: string): Promise<Doc[]> => {
    const result = await axios.get(`${URL}/search?cohort=${cohort}&query=${query}`);
    return result.data.data;
  }
};

export default LeetMommyAPI;