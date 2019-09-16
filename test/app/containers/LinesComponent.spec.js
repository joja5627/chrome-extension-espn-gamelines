import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../src/app/stores/windowStore';
import LinesComponent from '../../../src/app/containers/LinesComponent.js';
import liftedContent from '../mock-data/liftedContent';
import linesResponse from '../mock-data/linesResponse';


const store = configureStore(store);
const component = mount(<LinesComponent liftedContent={liftedContent} linesResponse={linesResponse}/>);
//"short_name": "Cavaliers",  "short_name": "Tribe",
describe('Lines Container', () => {
  it('should render inspector monitor\'s component', () => {
    expect().toExist();
  });

//   it('should contain an empty action list', () => {
//     expect(
//       component.find('ActionList').html()
//     ).toMatch(/<div class="actionListRows-[0-9]+"><\/div>/);
//   });
});
