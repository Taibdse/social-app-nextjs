const key = 'social-list';

export const saveSocial = (social: any) => {
  const socials = getSocials();
  socials.push(social);
  localStorage.setItem(key, JSON.stringify(socials));
}

export const getSocials = () => {
  const json = localStorage.getItem(key);
  if (!json) return [];
  try {
    return JSON.parse(json) || [];
  } catch (error) {
    return [];
  }
}
