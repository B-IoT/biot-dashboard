import styled from '@emotion/styled/macro';

export const FadeIn = styled.div({
  opacity: 0,
  transition: 'opacity 250ms ease',
});

export const FadeOut = styled.div({
  opacity: 1,
  transition: 'opacity 250ms ease',
});

export const Scale = styled.div({
  transform: 'scale(1)',
  transition: 'transform 250ms ease',
});

export const Hover = styled.div({
  [`:hover ${FadeIn}`]: {
    opacity: 1,
  },
  [`:hover ${FadeOut}`]: {
    opacity: 0,
  },
  [`:hover ${Scale}`]: {
    transform: 'scale(0.9)',
  },
});
