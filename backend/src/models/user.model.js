export class User {
    constructor({ id, email, password, username, latitude, longitude, is_verified, verification_token }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.latitude = latitude;
    this.longitude = longitude;
    this.is_verified = is_verified|| false;   
    this.verification_token = verification_token|| null;
  }
}