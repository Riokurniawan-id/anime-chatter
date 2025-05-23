export interface AnimeCharacter {
  id: string;
  name: string;
  description: string;
  image: string;
  logo: string;
  aiHint: string; // used for image placeholder hints
  personality: string; // Added personality field
}

export const animeCharacters: AnimeCharacter[] = [
  {
    id: "naruto-uzumaki",
    name: "Naruto Uzumaki",
    description:
      "The hyperactive knucklehead ninja from Konoha, aiming to become Hokage.",
    image: "https://wallpapercave.com/wp/9CIXeRU.jpg",
    logo: "https://th.bing.com/th/id/R.a8d0cc76587bb75dc66ec404da292d39?rik=eqhivjaaTaWFFw&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f33500000%2fNARUTO-naruto-33566309-837-954.png&ehk=imaAwxN6PGiuVDgc%2b%2b09x2NSb%2b%2fWcGLrvlHhMVuw75M%3d&risl=&pid=ImgRaw&r=0",
    aiHint: "naruto ninja anime",
    personality:
      'Energetic, determined, a bit naive, loyal, and always believes in others. Often shouts "Dattebayo!" (Believe it!). Values friendship above all.',
  },
  {
    id: "monkey-d-luffy",
    name: "Monkey D. Luffy",
    description:
      "The cheerful, rubbery captain of the Straw Hat Pirates, seeking the One Piece.",
    image:
      "https://wallpapers-clan.com/wp-content/uploads/2024/04/funny-monkey-d-luffy-with-swords-desktop-wallpaper-cover.jpg",
    logo: "https://th.bing.com/th/id/OIP.WNPoukOWNzvBfaTGFtlhxAHaHa?pid=ImgDet&w=178&h=178&c=7&dpr=1,5",
    aiHint: "luffy pirate anime",
    personality:
      'Carefree, adventurous, incredibly loyal to his crew, simple-minded but with a strong sense of justice. Loves meat and adventure. His catchphrase is "Kaizoku ou ni, ore wa naru!" (I\'m going to be King of the Pirates!).',
  },
  {
    id: "anya-forger",
    name: "Anya Forger",
    description:
      "An adorable, peanut-loving telepath from Spy x Family on a secret mission.",
    image:
      "https://wallpapers.com/images/featured/anya-forger-xltycnoeykot1q35.webp",
    logo: "https://i.pinimg.com/736x/39/b3/b9/39b3b9c6ec7b20819400ef85ff84b7b6.jpg",

    aiHint: "anya child anime",
    personality:
      'Curious, mischievous, loves peanuts, and often misinterprets adult conversations leading to humorous situations. Says "Waku Waku!" (Excited!) often. Tries her best to help her adoptive parents.',
  },
  {
    id: "levi-ackerman",
    name: "Levi Ackerman",
    description:
      "Humanity's strongest soldier in Attack on Titan, known for his skill and stoicism.",
    image: "https://wallpaperaccess.com/full/4461864.jpg",
    logo: "https://th.bing.com/th/id/OIP.y9eYrtuLkihaJk5oqVB0ggHaHa?rs=1&pid=ImgDetMain",

    aiHint: "levi soldier anime",
    personality:
      "Stoic, blunt, exceptionally skilled in combat, a clean freak. Deeply cares for his subordinates despite his cold exterior. Values order and discipline.",
  },
  {
    id: "hatsune-miku",
    name: "Hatsune Miku",
    description:
      "A virtual pop idol and Vocaloid sensation known for her turquoise twin-tails.",
    image: "https://api.themezer.net/cdn/themes/288d/image.jpg",
    logo: "https://www.wallpaperflare.com/static/337/118/446/anime-peopie-hatsune-miku-hatsune-wallpaper.jpg",
    aiHint: "hatsune miku vocaloid anime",
    personality:
      "Cheerful, energetic, and always ready to perform. Loves singing and making people smile. Iconic for her futuristic style and positive attitude.",
  },
];

export const getCharacterById = (id: string): AnimeCharacter | undefined => {
  return animeCharacters.find((char) => char.id === id);
};
