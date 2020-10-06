// import React from 'react';
// import 'react-native-gesture-handler';
// import {View, Text, ImageBackground} from 'react-native';
// import {HelloWorld} from '_atoms';
// import Navigator from '_routes';

// const App = () => <Navigator />;

// export default App;

import React from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
  Button,
  Icon,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons'; // <--Eva Icons
import {FeatherIconsPack} from './assets/icons/feather-icons'; // <--Import Feather Icons
import {MaterialIconsPack} from './assets/icons/material-icons'; // <-- Import Material icons
import {default as theme} from './assets/themes/custom-theme.json'; // <-- Import app theme
import {default as mapping} from './assets/themes/mapping.json'; // <-- Import app mapping

import {AppNavigator} from './routes/app-navigator';

const FacebookIcon = (props) => <Icon {...props} name="facebook" pack="eva" />;
// packs: eva,material,feather
//npx react-native link [Imp Command to link new 3rd party packages]

export default () => (
  <>
    <IconRegistry icons={[FeatherIconsPack, EvaIconsPack, MaterialIconsPack]} />
    <ApplicationProvider
      {...eva}
      theme={{...eva.dark, ...theme}}
      customMapping={mapping}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);
