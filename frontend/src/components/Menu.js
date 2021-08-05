import React, { useEffect } from 'react';
import MenuItem from './MenuItem';
import NewGame from './NewGame';
import { fetchActiveGames } from './../actions/ActiveGamesActions';
import { useSelector, useDispatch } from 'react-redux';

function Menu() {
  const dispatch = useDispatch();

  // Fetch active games when component is loaded and every 1 second.
  useEffect(() => {
    dispatch(fetchActiveGames());
    const interval = setInterval(() => dispatch(fetchActiveGames()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const activeGames = useSelector((state) => state.activeGames);
  if (activeGames === []) {
    return <div>There are no active games</div>;
  }

  const menuItems = activeGames.map(game => {
    return <MenuItem game={ game } key={ game._id }/>;
  });

  return (
    <div>
      { menuItems }
      <NewGame/>
    </div>
  );
}

export default Menu;
