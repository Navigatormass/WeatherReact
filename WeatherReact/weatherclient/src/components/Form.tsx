﻿import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
import { Country } from '../types/Country';
import { City } from '../types/City';

interface IState {
    city: City;
    country: Country;
    cities: City[];
    searchText: string;
}

interface IProps {
    getWeather: (e:any, country: string, searchText: string) => Promise<void>;
    countries: Country[];
}


class Form extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);//In React, when you call super with props, React will make props available across the component through this.props
        this.state = {
            city: {} as City,
            country: {} as Country,
            cities: [],
            searchText: ""
        }
    }

    handleSubmit = async (e: any) => {
        this.props.getWeather(e, this.state.country.ID, this.state.searchText)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <Typeahead
                                id="country"
                                labelKey="EnglishName"
                                options={this.props.countries}
                                onChange={(s) => this.setState({ country: s[0] } as IState)}
                                placeholder="   Country..."
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 form-group field">
                    <FormControl id="city" type="text" name="city"
                        onChange={(e: any) => this.setState({ searchText: e.target.value } as IState)}
                        placeholder={"   City..."}
                    />
                </div>
                <div className="col-sm-2 form-group field">
                    <Button variant="primary" type="submit"> Go </Button>
                </div>
            </form>
        );

    }
}
export default Form;