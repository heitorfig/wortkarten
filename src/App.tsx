import { Button, Grid, Stack } from '@mui/material';
import React from 'react';
import { Item } from './interfaces/item';
import { CardItem } from './interfaces/card';

import items from './content/items.json';
import { WordCard } from './components/Card';

items.sort((a: Item, b: Item) => a.id.localeCompare(b.id));

const App: React.FC = () => {
  const [filteredItems, setFilteredItems] = React.useState<CardItem[]>([]);
  const [isPlaying, setIsPlaying] = React.useState('');
  const [lang, setLang] = React.useState('es');

  const handlePlaying = (id: string, playing: boolean) => {
    setIsPlaying(playing ? id : '');
  };

  const handleLang = (lang: string) => {
    setLang(lang);
  };

  React.useEffect(() => {
    const filtered = items.map((item: Item) => ({
      id: item.id,
      name: item.i18n[lang].name,
      sound: item.i18n[lang].sound,
      image: item.image,
    }));
    setFilteredItems(filtered);
  }, [lang]);

  return (
    <>
      <Stack direction="row" spacing={2} paddingX={3} alignItems="center" justifyContent="center">
        <Button variant="contained" color="primary" onClick={() => handleLang('es')}>Español</Button>
        <Button variant="contained" color="primary" onClick={() => handleLang('de')}>Deutsch</Button>
      </Stack>
      <Grid container spacing={4} padding={3} bgcolor="primary.main">
        {filteredItems.map((item: CardItem) => (
          <Grid item xs={6} sm={6} md={4} lg={3} xl={2} key={item.id}>
            <WordCard {...item} onPlaying={handlePlaying} isPlaying={isPlaying === item.id} disabled={(!!isPlaying && isPlaying !== item.id)} lang={lang} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default App;
