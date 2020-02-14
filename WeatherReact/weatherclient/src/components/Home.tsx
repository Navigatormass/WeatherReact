import React from 'react';
import Form from './Form';
import WeatherDetails from './WeatherDetails';
import {Weather} from '../types/Weather'
import {Country} from '../types/Country';
import {City} from '../types/City';
import {Constants} from '../Constants';
import { CurrentCondition } from '../types/CurrentCondition';
//import logo from '../logo.svg';

interface IState {
    weather: Weather,
    countries: Country[],
    city?: City;
}


class Home extends React.Component<IState> {

    state: IState = {
        weather: { error: "" } as Weather,
        countries: [],
        city: {  } as City
    }

    async componentDidMount() {
        try {
            const countries = await this.getCountries();
            await this.setStateAsync({countries: countries} as IState);
        } catch (e) {
            console.log(e);
        } 
    }

    async getCountries(): Promise<Country[]> {
        try {
            const res = await fetch(`${Constants.locationAPIUrl}/countries?apikey=${Constants.apiKey}`);
            return await res.json() as Country[];
        } catch (e) {
            console.log(e);
            return [];
        } 
    }

    async getCity(searchText: string, countryCode: string): Promise<City> {
        const res = await fetch(
            `${Constants.locationAPIUrl}/cities/${countryCode}/search?apikey=${Constants.apiKey}&q=${searchText}`);
        const cities = await res.json() as City[];
        if (cities.length > 0)
            return cities[0];
        return {} as City;
    }

    async getCurrentConditions(city: City) {
        try {
            const res = await fetch(`${Constants.currentConditionsAPIUrl}/${city.Key}?apikey=${Constants.apiKey}`);
            const currentConditions = await res.json() as CurrentCondition[];
            if (currentConditions.length > 0) {
                const weather = new Weather(currentConditions[0], city);
                this.setStateAsync({ weather: weather, city: city } as IState);
            } 
        } catch (e) {
            console.log(e);
        }
        return {} as Weather;
    }

    getWeather = async (e: any, countryCode: string, searchText: string) => {
        e.preventDefault();
        if (!countryCode && !searchText) {
            await this.setStateAsync({ weather: { error: "Please enter the value" }, city: undefined, countries: [] } as IState);
            return;
        }
        try {
            const city = await this.getCity(searchText, countryCode);
            if (city.Key) {
                await this.getCurrentConditions(city);
            }
        } catch (e) {
            await this.setStateAsync({ weather: { error: e } } as IState);
        } 
    }

    async setStateAsync(state: IState) {
        return new Promise((resolve: any) => {
            this.setState(state, resolve);
        });
    }

    render() {
        return (
            <div className="container align-content-center  panel">
                <div className="container">
                    <div className="row">
                        <div className="form-control">
                            <WeatherDetails weather={this.state.weather} />
                            <Form getWeather={this.getWeather} countries={this.state.countries}/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;