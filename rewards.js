// The rewards the owner can choose from. "es" is what is saved in the database.
window.REWARDS = [
  { id: "jarra",    stamps: 5,  icon: "🍺",
    es: "Jarra gratis",
    en: "Free jarra",
    hint: "El clásico. Fácil de entender, ideal para que se apunten." },
  { id: "amigo",    stamps: 4,  icon: "👯",
    es: "Trae a un amigo: su 1ª bebida a mitad de precio",
    en: "Bring a friend: their 1st drink half price",
    hint: "El premio trae un cliente nuevo, que puede crear su propia tarjeta." },
  { id: "racion",   stamps: 4,  icon: "🍟",
    es: "Ración gratis (nachos o bravas)",
    en: "Free snack (nachos or bravas)",
    hint: "Barato para el local y hace que los grupos se queden más tiempo." },
  { id: "cumple",   stamps: 3,  icon: "🎂",
    es: "Bebida gratis en tu semana de cumpleaños",
    en: "Free drink in your birthday week",
    hint: "Organizan su cumpleaños en el pub y traen a todo el grupo." },
  { id: "leyenda",  stamps: 10, icon: "👕",
    es: "Leyenda: camiseta o tote bag del pub",
    en: "Legend: pub T-shirt or tote bag",
    hint: "Premio de fidelidad a largo plazo, y publicidad del pub por la calle." }
];
window.rewardText = (saved, lang) => {
  const r = window.REWARDS.find(x => x.es === saved);
  return r ? (lang === "en" ? r.en : r.es) : saved;
};
