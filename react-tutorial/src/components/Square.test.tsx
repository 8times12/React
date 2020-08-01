import * as React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Square from './Square';
import { Checkers } from '../constants';

configure({ adapter: new Adapter() });
it('renders nothing', () => {
    const square = shallow(<Square checker={null} onCheck={() => {}} isCurrChecked={false} isLine={false} />);
    expect(square.find('button').isEmpty());
});

it('renders a checker without classes "current" and "line"', () => {
    const square = shallow(<Square checker={Checkers.X} onCheck={() => {}} isCurrChecked={false} isLine={false} />);
    expect(square.find('button').text()).toEqual(Checkers.X.toString());
    expect(square.find('button').hasClass('current')).toEqual(false);
    expect(square.find('button').hasClass('line')).toEqual(false);
});

it(`has a class "current"`, () => {
    const square = shallow(<Square checker={Checkers.X} onCheck={() => {}} isCurrChecked={true} isLine={false} />);
    expect(square.find('button').hasClass('current')).toEqual(true);
});

it(`has a class "line"`, () => {
    const square = shallow(<Square checker={Checkers.X} onCheck={() => {}} isCurrChecked={false} isLine={true} />);
    expect(square.find('button').hasClass('line')).toEqual(true);
});
