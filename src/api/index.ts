import axios from 'axios';
import {API_KEY} from './key';
import {City} from '../interface/City';

interface JsonBinResponse {
  record: City[];
  metadata: {
    id: string;
    private: boolean;
    createdAt: string;
  };
}
const options = {
  headers: {
    'X-Master-Key': API_KEY,
    'Content-Type': 'application/json',
  },
};

export const getCities = async (): Promise<City[]> => {
  try {
    const {data} = await axios.get<JsonBinResponse>(
      'https://api.jsonbin.io/v3/b/6779d9e0acd3cb34a8c43e88',
      options,
    );

    return data.record;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};
