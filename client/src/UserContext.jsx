import React, { useState, createContext, useEffect } from "react";
import { ProfileUrl } from "./UrlApi";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      fetch(ProfileUrl, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch profile (${response.status} ${response.statusText})`
            );
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
          setReady(true);
        })
        .catch((error) => {
          console.error("Profile Fetch Error:", error);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
