// Mock API service - ready for backend integration
const API_DELAY = 400;

const wait = (ms = API_DELAY) => new Promise((resolve) => setTimeout(resolve, ms));

// LocalStorage keys
const USERS_KEY = 'hf_users';
const AUTH_USER_KEY = 'hf_auth_user';

// Historical Figure Data
const HISTORICAL_FIGURE = {
  id: 'einstein',
  name: 'Albert Einstein',
  died: 1955,
  persona: 'I am Albert Einstein, theoretical physicist.',
};

// Default user for testing
const DEFAULT_USER = {
  id: 'u1',
  name: 'Demo Student',
  email: 'demo@student.com',
  password: '123456',
};

// Guardrail: Keywords that indicate post-death topics
const RESTRICTED_KEYWORDS = [
  'internet', 'smartphone', 'iphone', 'android', 'tiktok', 'facebook', 
  'instagram', 'youtube', 'twitter', 'bitcoin', 'cryptocurrency',
  'chatgpt', 'ai assistant', 'marvel', 'avengers', 'netflix', 
  'covid', 'pandemic', 'wifi', 'laptop', 'tablet', 'app store'
];

// Helper functions
const getUsers = () => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_USER]));
    return [DEFAULT_USER];
  }
  return JSON.parse(raw);
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

// Guardrail logic
const mentionsFutureYear = (text) => {
  const yearMatches = text.match(/\b(19\d{2}|20\d{2})\b/g) || [];
  return yearMatches.some((year) => parseInt(year) > HISTORICAL_FIGURE.died);
};

const mentionsRestrictedKeyword = (text) => {
  const normalized = text.toLowerCase();
  return RESTRICTED_KEYWORDS.some((keyword) => normalized.includes(keyword));
};

const shouldRefuseMessage = (message) => {
  return mentionsFutureYear(message) || mentionsRestrictedKeyword(message);
};

const guardrailResponse = () => {
  return `I must respectfully decline to discuss that topic. As ${HISTORICAL_FIGURE.name}, who passed away in ${HISTORICAL_FIGURE.died}, I cannot engage with events, technologies, or cultural phenomena that occurred after my time.`;
};

const generateResponse = (userMessage) => {
  const responses = [
    `That's a fascinating question. In my view, we must examine the fundamental principles at work here.`,
    `From my perspective, the key is to think about this problem from first principles. What are we really asking?`,
    `Imagination is more important than knowledge. Let me share my thoughts on this matter.`,
    `This reminds me of thought experiments I've considered. The essence of understanding comes from curiosity.`,
    `An excellent inquiry. The beauty of science lies in asking such questions.`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

// API Functions
export const registerApi = async ({ name, email, password }) => {
  await wait();
  
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  
  if (exists) {
    throw new Error('Email is already registered');
  }
  
  const newUser = {
    id: `u_${Date.now()}`,
    name,
    email,
    password,
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return { user: toPublicUser(newUser) };
};

export const loginApi = async ({ email, password }) => {
  await wait();
  
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  return { user: toPublicUser(user) };
};

export const getFigureApi = async () => {
  await wait(300);
  return HISTORICAL_FIGURE;
};

export const sendMessageApi = async ({ message }) => {
  await wait(600);
  
  const refused = shouldRefuseMessage(message);
  
  return {
    message: refused ? guardrailResponse() : generateResponse(message),
    refused,
  };
};
