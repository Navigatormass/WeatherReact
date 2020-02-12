import React from 'react';
import Form from './Form';
import WeatherDetails from './WeatherDetails';
import {Weather} from '../types/Weather'
import {Country} from '../types/Country';
import {City} from '../types/City';
//import logo from '../logo.svg';

interface IState {
    weather: Weather,
    countries: Country[],
    city?: City;
}

class Home extends React.Component<IState> {

    render() {
        return (
            <div className="App">
                <WeatherDetails />
            </div>
        );
    }
}

export default Home;