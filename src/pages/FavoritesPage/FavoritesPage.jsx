import React from 'react';
import { WeatherList } from '../../cmps/WeatherList/WeatherList';
import { weatherService } from '../../services/weatherService';
import './FavoritesPage.scss';

export default class FavoritesPage extends React.Component {
    state = {
        favorites: null,
    };

    componentDidMount() {
        this.loadFavorites();
    }

    async loadFavorites() {
        const favorites = await weatherService.getFavorites();
        this.setState({ favorites });
    }

    render() {
      const favorites = this.state.favorites;
        return (
            <>
                <div className="favorites-page container">
                    <h2 className="main-title">Favorites</h2>
               
                </div>
            </>
        );
    }
}
