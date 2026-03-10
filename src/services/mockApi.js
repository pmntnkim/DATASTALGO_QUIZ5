const wait = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

const usersKey = 'hf_users';

const defaultUser = {
  id: 'u1',
  name: 'Demo Student',
  email: 'demo@student.com',
  password: '123456',
};

const historicalFigure = {
  id: 'historical-figure',
  name: 'General Historical Figure',
  died: 1900,
  diedLabel: 'their historical era',
  persona: 'I am a general historical figure speaking with period-appropriate perspective.',
  style: 'Thoughtful, reflective, and educational.',
  prompts: [
    'From a historical point of view, I would explain it this way:',
    'In the spirit of history and learning, here is my response:',
    'Let us consider your question through the lens of the past:'
  ],
};

const restrictedKeywords = [
  'internet',
  'smartphone',
  'tiktok',
  'facebook',
  'instagram',
  'youtube',
  'bitcoin',
  'chatgpt',
  'ai assistant',
  'avengers',
  'marvel',
  'k-pop',
  'netflix',
  'covid',
];

const getUsers = () => {
  const raw = localStorage.getItem(usersKey);
  if (!raw) {
    localStorage.setItem(usersKey, JSON.stringify([defaultUser]));
    return [defaultUser];
  }
  return JSON.parse(raw);
};

const saveUsers = (users) => {
  localStorage.setItem(usersKey, JSON.stringify(users));
};

const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

export const registerUserApi = async ({ name, email, password }) => {
  await wait();
  const users = getUsers();
  const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    throw new Error('Email is already registered.');
  }

  const newUser = {
    id: `u_${Date.now()}`,
    name,
    email,
    password,
  };

  users.push(newUser);
  saveUsers(users);
  return toPublicUser(newUser);
};

export const loginUserApi = async ({ email, password }) => {
  await wait();
  const users = getUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password.');
  }

  return toPublicUser(user);
};

const mentionsFutureYear = (text, figure) => {
  const yearMatches = text.match(/\b(\d{4})\b/g) || [];
  return yearMatches.some((year) => Number(year) > figure.died);
};

const mentionsRestrictedKeyword = (text) => {
  const normalized = text.toLowerCase();
  return restrictedKeywords.some((keyword) => normalized.includes(keyword));
};

const guardrailResponse = (figure) =>
  `I must refuse that topic. As ${figure.name}, I cannot discuss events, technologies, or pop culture after ${figure.diedLabel || figure.died}.`;

const normalFigureResponse = (userText, figure) => {
  const index = Math.floor(Math.random() * figure.prompts.length);
  return `${figure.prompts[index]} ${userText}`;
};

export const sendHistoricalMessageApi = async ({ message }) => {
  await wait(500);
  const activeFigure = historicalFigure;
  const shouldRefuse =
    mentionsFutureYear(message, activeFigure) || mentionsRestrictedKeyword(message);

  if (shouldRefuse) {
    return {
      role: 'assistant',
      content: guardrailResponse(activeFigure),
      refused: true,
    };
  }

  return {
    role: 'assistant',
    content: normalFigureResponse(message, activeFigure),
    refused: false,
  };
};

export const getHistoricalFigureApi = async () => {
  await wait(200);
  return historicalFigure;
};
