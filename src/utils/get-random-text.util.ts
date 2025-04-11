export function generateRandomTitle(wordCount = 7): string {
  const words = [
    // Космос
    'SpaceX',
    'mission',
    'launch',
    'orbit',
    'astronauts',
    'exploration',
    'NASA',
    'telescope',
    // Мистецтво
    'exhibition',
    'painting',
    'gallery',
    'artist',
    'sculpture',
    'museum',
    'modern',
    'classical',
    // Фінанси
    'stocks',
    'market',
    'investment',
    'banking',
    'inflation',
    'economy',
    'recession',
    'budget',
    // Крипта
    'Bitcoin',
    'Ethereum',
    'crypto',
    'blockchain',
    'DeFi',
    'mining',
    'NFT',
    'token',
    // Погода
    'storm',
    'forecast',
    'rainfall',
    'heatwave',
    'climate',
    'temperature',
    'snow',
    'hurricane',
    // Політика
    'election',
    'government',
    'policy',
    'president',
    'minister',
    'senate',
    'law',
    'debate',
    // Культура
    'festival',
    'cinema',
    'music',
    'theater',
    'literature',
    'fashion',
    'heritage',
    'award',
    // Наука
    'research',
    'discovery',
    'innovation',
    'biology',
    'physics',
    'chemistry',
    'AI',
    'robotics',
    // Спорт
    'match',
    'tournament',
    'championship',
    'athlete',
    'score',
    'team',
    'coach',
    'record',
    // Інше
    'trending',
    'breaking',
    'update',
    'report',
    'exclusive',
    'opinion',
    'analysis',
    'event',
  ];

  const titleWords = Array.from(
    { length: wordCount },
    () => words[Math.floor(Math.random() * words.length)],
  );

  titleWords[0] =
    titleWords[0].charAt(0).toUpperCase() + titleWords[0].slice(1);

  return titleWords.join(' ') + '.';
}
