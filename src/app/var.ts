export const globalState = {
    isAdmin: false, // Default value if no localStorage value exists
  
    initialize() {
      if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem("isAdmin");
        this.isAdmin = storedValue ? JSON.parse(storedValue) : false;
        // console.log("Initialized isAdmin from localStorage:", this.isAdmin);
      }
    },
  
    setIsAdmin(value: boolean) {
      this.isAdmin = value; // Update global state
      if (typeof window !== "undefined") {
        localStorage.setItem("isAdmin", JSON.stringify(value)); // Save to localStorage
        // console.log("Updated isAdmin in localStorage:", value);
      }
    },
  
    getIsAdmin() {
      if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem("isAdmin");
        return storedValue ? JSON.parse(storedValue) : this.isAdmin;
      }
      return this.isAdmin;
    },
  };
  