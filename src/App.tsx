import { Box, Button, Fab, Grid, Stack } from '@mui/material';
import React from 'react';
import { Item } from './interfaces/item';
import { CardItem } from './interfaces/card';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import items from './content/items.json';
import { WordCard } from './components/Card';

items.sort((a: Item, b: Item) => a.id.localeCompare(b.id));

const App: React.FC = () => {
  const [filteredItems, setFilteredItems] = React.useState<CardItem[]>([]);
  const [isPlaying, setIsPlaying] = React.useState('');
  const [activeCard, setActiveCard] = React.useState<CardItem | undefined>(undefined);
  const [lang, setLang] = React.useState('es');

  const scrollUp = () => {
    window.scrollBy({
      top: -window.innerHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handlePlaying = (id: string, playing: boolean) => {
    setIsPlaying(playing ? id : '');
  };

  const handleLang = (lang: string) => {
    setLang(lang);
  };

  const playBgAudio = () => {
    const bgSound = new Audio('/wortkarten/sounds/bg.mp3');
    bgSound.loop = true;
    bgSound.volume = 0.05;
    bgSound.play();
  }

  React.useEffect(() => {
    const filtered = items.map((item: Item) => ({
      id: item.id,
      name: item.i18n[lang]?.name || item.i18n['es'].name,
      audio: item.i18n[lang]?.audio || item.i18n['es'].audio,
      image: item.image,
      sound: item.sound,
    }));
    setFilteredItems(filtered);
  }, [lang]);

  React.useEffect(() => {
    const active = filteredItems.find((item: CardItem) => item.id === isPlaying);
    setActiveCard(active);
  }, [isPlaying, filteredItems]);

  return (
    <>
      <Stack direction="row" spacing={2} paddingX={3} paddingTop={2} alignItems="center" justifyContent="center">
        <Button size="small" sx={{ padding: 0, minWidth: 'unset', lineHeight: 1, fontSize: 32 }} onClick={() => handleLang('es')}>🇪🇸</Button>
        {/* <Button size="small" sx={{ padding: 0, minWidth: 'unset', lineHeight: 1, fontSize: 32 }} onClick={() => handleLang('br')}>🇧🇷</Button> */}
        <Button size="small" sx={{ padding: 0, minWidth: 'unset', lineHeight: 1, fontSize: 32 }} onClick={() => handleLang('de')}>🇩🇪</Button>
        {/* <Button size="small" sx={{ padding: 0, minWidth: 'unset', lineHeight: 1, fontSize: 32 }} onClick={() => handleLang('en')}>🇺🇸</Button> */}
        <Button size="small" sx={{ padding: 0, minWidth: 'unset', lineHeight: 1, fontSize: 32 }} onClick={() => playBgAudio()}>▶️</Button>
      </Stack>
      <Grid container spacing={4} padding={3} paddingRight={14} bgcolor="primary.main">
        {filteredItems.map((item: CardItem) => (
          <Grid item xs={6} sm={6} md={4} lg={3} xl={2} key={item.id}>
            <WordCard {...item} onPlaying={handlePlaying} isPlaying={isPlaying === item.id} disabled={(!!isPlaying && isPlaying !== item.id)} lang={lang} />
          </Grid>
        ))}
      </Grid>
      {isPlaying && activeCard && (
        <Box position="fixed" top={0} left={0} width="100%" height="100%" bgcolor="white" display="flex" alignItems="center" justifyContent="center" zIndex={1}>
          <img src={`/wortkarten/img/${activeCard.image}`} alt={activeCard.name} />
        </Box>
      )}
      <Stack direction="column" spacing={2} padding={3} alignItems="center" justifyContent="center" position="fixed" top={0} right={0} height="100%">
        <Fab onClick={scrollUp}>
          <KeyboardArrowUpIcon />
        </Fab>
        <Fab onClick={scrollDown}>
          <KeyboardArrowDownIcon />
        </Fab>
      </Stack>
    </>
  );
}

export default App;
