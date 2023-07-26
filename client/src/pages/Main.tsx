import {CircularProgress, Grid} from '@mui/material';

import request from '../request';
import FetchData from '../components/FetchData';
import GameCard from '../components/GameCard';

const fetchData = async () => {
  const res = await request('http://localhost:4040/api/games', {method: 'GET'});
  return {items: res.data};
};

const Main = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FetchData
          fetchData={fetchData}
        >
          {({items, isLoading}) => (
            isLoading ?
              <CircularProgress /> :
              items && (
                <Grid container spacing={2}>
                  {items.map((item) => (
                    <Grid key={item.id} item xs={4}>
                      <GameCard {...item} />
                    </Grid>
                  ))}
                </Grid>
              )
          )}
        </FetchData>
      </Grid>
    </Grid>
  );
};

export default Main;
