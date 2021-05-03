import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Route, Switch, Link } from 'react-router-dom';
import { ListIcon, TableIcon,RocketIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import FlatButton from '@commercetools-uikit/flat-button';
import ShoppingLists from '../ShoppingLists';
import ExternalServer from '../ExternalServer';
import messages from './messages';
import styles from './main-view.mod.css';

const MainView = (props) => {
  const intl = useIntl();

  return (
    <Spacings.Inset scale="m">
      <Spacings.Stack scale="m">
        <Text.Headline as="h1" intlMessage={messages.title} />
        <div className={styles['nav-header']}>
          <Spacings.Inline scale="s">
           
            <FlatButton
              as={Link}
              to={`${props.match.url}/ShoppingLists`}
              icon={<TableIcon />}
              label={intl.formatMessage(messages.ShoppingListsLabelLink)}
            />
             <FlatButton
              as={Link}
              to={`${props.match.url}/ExternalServer`}
              icon={<RocketIcon />}
              label={intl.formatMessage(messages.ExternalServerLabelLink)}
            />
          </Spacings.Inline>
        </div>
        <Switch>
          <Route path={`${props.match.path}/ShoppingLists`} component={ShoppingLists} />
          <Route path={`${props.match.path}/ExternalServer`} component={ExternalServer} />
        </Switch>
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
MainView.displayName = 'MainView';
MainView.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MainView;
