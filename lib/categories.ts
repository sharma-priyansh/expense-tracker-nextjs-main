// Configurable list of categories used across the app.
// Modify this list to add/remove standard categories.
export const CATEGORIES = [
  'Food',
  'Travel',
  'Utilities',
  'Entertainment',
  'Shopping',
  'Bills',
  'Health',
];

// Color map for categories. Tweak colors here to change palette across the app.
export const CATEGORY_COLORS: Record<string, string> = {
  Food: '#f39c12', // orange
  Travel: '#3498db', // blue
  Utilities: '#9b59b6', // purple
  Entertainment: '#e67e22', // orange-dark
  Shopping: '#e84393', // pink
  Bills: '#2ecc71', // green
  Health: '#1abc9c', // teal
};

export default CATEGORIES;
