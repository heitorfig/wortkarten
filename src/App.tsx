import { Grid } from '@mui/material';
import React from 'react';
import { CardItem } from './interfaces/card';

import items from './content/items.json';
import { WordCard } from './components/Card';

items.sort((a: CardItem, b: CardItem) => a.id.localeCompare(b.id));

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState('');

  const handlePlaying = (id: string, playing: boolean) => {
    setIsPlaying(playing ? id : '');
  };

  return (
    <Grid container spacing={4} padding={3} bgcolor="primary.main">
      {items.map((item: CardItem) => (
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2} key={item.id}>
          <WordCard {...item} onPlaying={handlePlaying} isPlaying={isPlaying === item.id} disabled={(!!isPlaying && isPlaying !== item.id)} />
        </Grid>
      ))}
    </Grid>
  );
}

export default App;
