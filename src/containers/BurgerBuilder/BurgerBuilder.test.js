import {BurgerBuilder} from './BurgerBuilder';
import buildControls from '../../components/Burger/BuildControls/BuildControls'

import React from 'react';
import {configure, shallow} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()})
describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={ () => {}} />)
    })
    it('should render BuildControls when ingredients are received', () => {
        wrapper.setProps({ingredients: {salad:0}});
        expect(wrapper.find(buildControls)).toHaveLength(1)
    })
})