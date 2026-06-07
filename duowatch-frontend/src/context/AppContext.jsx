import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('duowatch_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [partnerStatus, setPartnerStatus] = useState(() => {
    return localStorage.getItem('duowatch_partner_status') || 'none'; // 'none', 'sent', 'received', 'connected'
  });

  const [partnerName, setPartnerName] = useState(() => {
    return localStorage.getItem('duowatch_partner_name') || '';
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('duowatch_messages');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Welcome to your private Duo Room! ❤️", sender: 'system', time: '10:00 AM' }
    ];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('duowatch_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('duowatch_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('duowatch_partner_status', partnerStatus);
  }, [partnerStatus]);

  useEffect(() => {
    localStorage.setItem('duowatch_partner_name', partnerName);
  }, [partnerName]);

  useEffect(() => {
    localStorage.setItem('duowatch_messages', JSON.stringify(messages));
  }, [messages]);

  const login = (name, email) => {
    setUser({ name, email });
  };

  const logout = () => {
    setUser(null);
    setPartnerStatus('none');
    setPartnerName('');
    setMessages([{ id: 1, text: "Welcome to your private Duo Room! ❤️", sender: 'system', time: '10:00 AM' }]);
    localStorage.clear();
  };

  const sendPartnerRequest = (email) => {
    setPartnerStatus('sent');
    setPartnerName(email.split('@')[0]);
  };

  const acceptPartnerRequest = () => {
    setPartnerStatus('connected');
  };

  const addMessage = (text, sender = 'me') => {
    const newMsg = {
      id: Date.now(),
      text,
      sender,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMsg]);

    // Simulate partner replying after a short delay
    if (sender === 'me') {
      setTimeout(() => {
        const replyMsg = {
          id: Date.now() + 1,
          text: getRandomReply(),
          sender: 'other',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, replyMsg]);
      }, 1500);
    }
  };

  const getRandomReply = () => {
    const replies = [
      "Aww, love that! 🥰",
      "Which movie should we watch next?",
      "Can we start the video call now? 🎥",
      "I'm grabbing some snacks! Brb 🍿",
      "DuoWatch is so cool!",
      "I miss you! ❤️",
      "Haha true 😂",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  return (
    <AppContext.Provider value={{
      user,
      partnerStatus,
      partnerName,
      messages,
      login,
      logout,
      sendPartnerRequest,
      acceptPartnerRequest,
      setPartnerStatus,
      setPartnerName,
      addMessage
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
