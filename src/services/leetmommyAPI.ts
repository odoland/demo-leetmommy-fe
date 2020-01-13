import axios from 'axios';

const URL = 'https://leetmommy2.herokuapp.com';

export interface Ping {
  ping: boolean;
}

export interface Doc {
  url: string,
  title: string,
  headers: string[],
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