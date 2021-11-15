import axios from './config';

export default {
  getDataTracking: () => axios.get<any[]>(`/items`),
};
