import { Card, CardMedia, CardHeader, styled, alpha } from "@mui/material";
import React from "react";

interface WordCardProps {
  id: string;
  name: string;
  image: string;
  sound: string;
  onPlaying: (id: string, isPlaying: boolean) => void;
  isPlaying: boolean;
  disabled: boolean;
  lang: string;
}

const CardStyled = styled(Card)(({ theme, isPlaying, disabled }: { theme?: any, isPlaying: boolean, disabled: boolean }) => ({
  position: 'relative',
  color: isPlaying ? theme.palette.warning.contrastText : theme.palette.text.primary,
  backgroundColor: isPlaying ? theme.palette.warning.main : theme.palette.background.paper,
  boxShadow: isPlaying ? `0 0 0 7px ${alpha(theme.palette.warning.main, 0.9)}` : `0 0 0 7px rgba(255, 255, 255, 0.5)`,
  transition: 'all 0.3s ease-in-out',
  transformOrigin: 'center',
  '& .MuiCardHeader-root': {
    position: 'relative',
    zIndex: 1,
  },
  '& .MuiCardMedia-root': {
    position: 'relative',
    height: 150,
    zIndex: 1,
  },
  '& .backdrop': {
    position: 'absolute',
    right: '-25%',
    bottom: '-25%',
    width: '80%',
    height: '80%',
    objectFit: 'contain',
    opacity: 0.2,
    pointerEvents: 'none',
    userSelect: 'none',
    msUserSelect: 'none',
    MozUserSelect: 'none',
    zIndex: 0,
    filter: 'blur(4px)',
  }
}));

export const WordCard = ({ id, name, image, sound, onPlaying, isPlaying, disabled, lang }: WordCardProps) => {
  const playSound = (sound: string) => () => {
    if (!isPlaying && !disabled) {
      const audio = new Audio(`/wortkarten/sounds/${lang}/${sound}`);
      audio.playbackRate = 0.9;
      setTimeout(() => audio.play(), 500);
      onPlaying(id, true);
      audio.addEventListener('ended', () => {
        setTimeout(() => onPlaying(id, false), 500);
      });
      audio.addEventListener('error', () => onPlaying('id', false));
    }
  }

  return (
    <CardStyled onClick={playSound(sound)} isPlaying={isPlaying} disabled={disabled}>
      <CardMedia component="img" height={150} image={`/wortkarten/img/${image}`} alt={name} sx={{ objectFit: 'contain' }} />
      <CardHeader title={name} titleTypographyProps={{ variant: 'h6' }} />
      <img src={`/wortkarten/img/${image}`} alt={name} className="backdrop" />
    </CardStyled>
  );
}