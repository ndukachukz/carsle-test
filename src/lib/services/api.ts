import axios from "axios";

const API_URL = "https://restful-api-vercel-tau.vercel.app";

export class api {
  static async getUsers() {
    const res = await axios.get<User[]>(`${API_URL}/users`);
    return res.data;
  }

  static async getUser(id: string) {
    const res = await axios.get<User>(`${API_URL}/users/${id}`);
    return res.data;
  }

  static async updateUser(user: User) {
    const res = await axios.put<User>(`${API_URL}/users/${user.id}`, user);
    return res.data;
  }

  static async createCall(call: Omit<Call, "id">) {
    const res = await axios.post<Call>(`${API_URL}/calls`, call);
    return res.data;
  }

  static async updateCall(call: Call) {
    const res = await axios.put<Call>(`${API_URL}/calls/${call.id}`, call);
    return res.data;
  }
}
