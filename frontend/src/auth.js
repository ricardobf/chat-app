const USER_KEY = "chat-user";

const generateId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const auth = {
  user: null,
  authenticate(name) {
    this.user = {
      name,
      id: generateId()
    };
    localStorage.setItem(USER_KEY, JSON.stringify(this.user));
  },

  logout() {
    localStorage.removeItem(USER_KEY);
    this.user = null;
    window.location.reload();
  },

  isAuthenticated() {
    if (this.user !== null) return true;

    const cache = localStorage.getItem(USER_KEY);
    if (cache != null) {
      this.user = JSON.parse(cache);
      return true;
    }

    return false;
  }
};

export default auth;
