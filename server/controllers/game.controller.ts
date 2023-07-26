import apicalypse from 'apicalypse';

import {getRequestOptions} from './igdb.controller';
import {Game} from '../models/game.interface';
import {Cover, CoverIdMap} from '../models/cover.interface';

export const getGames = async (page = 0, pageLimit = 50) => {
  const requestOptions = getRequestOptions(process.env.CLIENT_ID as string, process.env.ACCESS_TOKEN as string);
  const games = await apicalypse(requestOptions)
    .limit(pageLimit)
    .offset(page)
    .fields('age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;')
    .request('/games');
  const coverIds = (games.data as Game[])
    .map(({cover}) => cover)
    .filter(coverId => !!coverId);
  const whereFilter = `id = (${coverIds.join(',')})`;
  const covers = await apicalypse(requestOptions)
    .limit(coverIds.length)
    .where(whereFilter)
    .fields(['url'])
    .request('/covers');
  const coverById = (covers.data as Cover[]).reduce((result, {id, url}) => {
    result[id] = url;
    return result;
  }, {} as CoverIdMap);
  return games.data.map((game: Game) => {
    if (game.cover && coverById && coverById[game.cover]) {
      return {...game, cover: coverById[game.cover]};
    }
    return game;
  });
};
