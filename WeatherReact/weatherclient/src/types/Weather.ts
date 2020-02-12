import { CurrentCondition } from './CurrentCondition';
import { City } from './City';
import { Constants } from '../Constants';

export class Weather {
    location?: string;
    weatherIcon?: any;
    weatherText?: string;
    temperatureValue?: number;
    temperatureUnit?: string;
    isDayTime?: boolean;
    error?: string;

    public constructor(currentConditions: CurrentCondition, city: City) {
        this.location = city.EnglishName!;
        this.weatherText = currentConditions.WeatherText;
        this.isDayTime = currentConditions.IsDayTime;
        if (currentConditions.WeatherIcon) {
            let icon = currentConditions.WeatherIcon.toString();
            if (icon.length === 1)
                icon = `0${icon}`;
            this.weatherIcon = `${Constants.weatherIconUrl}${icon}-s.png`;
        }
        this.temperatureValue = currentConditions.Temperature.Metric.Value;
        this.temperatureUnit = currentConditions.Temperature.Metric.Unit;
    }
}