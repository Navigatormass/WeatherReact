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
                this.setStateAsync({ weather: weather, city: city, countries: [] } as IState);
            } 
        } catch (e) {
            console.log(e);
        }
        return {} as Weather;
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
                            <Form countries={this.state.countries}/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;