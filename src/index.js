import {AppRegistry} from 'react-native';
import {setDefaultOptions} from 'date-fns';
import {ru} from 'date-fns/locale';

import App from './App';

setDefaultOptions({locale: ru});

AppRegistry.registerComponent('racy', () => App);
AppRegistry.runApplication('racy', {
  rootTag: document.getElementById('root'),
});
