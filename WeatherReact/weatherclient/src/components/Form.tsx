import React from 'react'
class Form extends React.Component {
    render() {
        return (
            <div>
                <input id="country" type="text" name="country" placeholder=" Countrys..." />
                <input id="city" type="text" name="city" placeholder=" Citys..."/>
            </div>
        );

    }
}
export default Form;