import FirebaseAuth from "$lib/firebase/auth";

export default class Server {
  static baseUrl = "https://watdo.up.railway.app/v1";

  static async fetch(path: string, method: string = "GET") {
    return await fetch(`${Server.baseUrl}${path}`, {
      method: method,
      headers: {
        Authorization: `Bearer ${await FirebaseAuth.getUserIdToken()}`,
      },
    });
  }
}
