import React from "react";
import { useIntl } from 'react-intl';
import messages from './messages';
import Text from '@commercetools-uikit/text';



const Homepage = (props) =>{
  const intl = useIntl();
  return (
    <Text.Headline as="h1" intlMessage={messages.title} />  
    );
};
Homepage.displayName = 'Homepage';

export default Homepage;
