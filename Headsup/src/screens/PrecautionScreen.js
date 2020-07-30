/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {Headline} from 'react-native-paper';

// importing components
import PreventionCards from '../components/PreventionCards';

// importing common style
import Styles from '../Styles';

const Precaution = ({style}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'pink',
        ...style,
      }}>
      <ScrollView
        style={Styles.safeArea}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}>
        <View style={Styles.mainHeader}>
          <Headline style={Styles.mainHeaderText}>
            Prevention Is Better Than Cure
          </Headline>
        </View>

        <PreventionCards
          title="Wash Hands"
          content="Most of the virus and diseases spread
                    because people don't wash there hands often.
                    Wash your hands regularly for 20 seconds,
                    with soap and water or alcohol-based hand rub"
          src={require('../../assets/img/wh.png')}
        />
        <PreventionCards
          title="Cough or Sneeze"
          content="When we cough or sneeze, we put a lot
                    of virus out, therefore cover your nose and mouth
                    with a disposable tissue or flexed elbow when
                    you cough or sneeze"
          src={require('../../assets/img/cs.png')}
        />
        <PreventionCards
          title="Take Care of Unwell"
          content="It is necessary to take care of those
                    who are unwell but make sure you do so by avoiding
                    close contact (1 meter or 3 feet) with people
                    who are unwell"
          src={require('../../assets/img/sp.png')}
        />
        <PreventionCards
          title="Stay Home"
          content="Key component from stopping this virus
                    is to stay home and self-isolated from others in
                     the household if you feel unwell"
          src={require('../../assets/img/sh.png')}
        />
        <PreventionCards
          title="Don't Touch"
          content="Don't touch your eyes, nose, or mouth
                    if your hands are not clean and wash your face
                    at least thrice a day"
          src={require('../../assets/img/dt.png')}
        />
      </ScrollView>
    </View>
  );
};

export default Precaution;
