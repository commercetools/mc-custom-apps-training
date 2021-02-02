import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Route, Switch, Link } from 'react-router-dom';
import { ListIcon, TableIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import FlatButton from '@commercetools-uikit/flat-button';
import RestCalls from '../RestCalls';
import GraphqlCalls from '../GraphqlCalls';
import Homepage from '../homepage';
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
              to={`${props.match.url}/RestCalls`}
              icon={<ListIcon />}
              label={intl.formatMessage(messages.RestCallsLabelLink)}
            />
            <FlatButton
              as={Link}
              to={`${props.match.url}/GraphqlCalls`}
              icon={<TableIcon />}
              label={intl.formatMessage(messages.GraphqlCallsLabelLink)}
            />
            <FlatButton
              as={Link}
              to={`${props.match.url}/homepage`}
              icon={<TableIcon />}
              label={intl.formatMessage(messages.homepageLabelLink)}
            />
          </Spacings.Inline>
        </div>
        <Switch>
          <Route path={`${props.match.path}/RestCalls`} component={RestCalls} />
          <Route path={`${props.match.path}/GraphqlCalls`} component={GraphqlCalls} />
          <Route path={`${props.match.path}/homepage`} component={Homepage} />
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
