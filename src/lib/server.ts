import FirebaseAuth from "$lib/firebase/auth";

export default class Server {
  static baseUrl = "https://watdo.up.railway.app/v1";

  static async fetch(path: string, method: string = "GET", body: any = null) {
    return await fetch(`${Server.baseUrl}${path}`, {
      method: method,
      headers: {
        Authorization: `Bearer ${await FirebaseAuth.getUserIdToken()}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });
  }
}
