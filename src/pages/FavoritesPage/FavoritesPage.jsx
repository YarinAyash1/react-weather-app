import React from 'react';
import { connect } from 'react-redux';
import { FavoritesList } from '../../cmps/FavoritesList/FavoritesList';
import { loadFavorites } from '../../store/actions/weatherActions';
import './FavoritesPage.scss';

class _FavoritesPage extends React.Component {
  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    const favorites = this.props;
    console.log('favorites page', favorites.favorites)
    return (
      <div className="favorites-page container">
        <h2 className="main-title">Favorites</h2>
        {favorites && <FavoritesList favorites={ favorites.favorites } />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    favorites: state.weatherReducer.favorites
  }
}

const mapDispatchToProps = {
  loadFavorites,
}

export const FavoritesPage = connect(mapStateToProps, mapDispatchToProps)(_FavoritesPage)