import { useParams } from 'react-router-dom';
import GamesView from '../gamesView/GamesView';
import React from 'react';

const GamesViewWithId: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <GamesView id={id ?? null} />;
}

export default GamesViewWithId;