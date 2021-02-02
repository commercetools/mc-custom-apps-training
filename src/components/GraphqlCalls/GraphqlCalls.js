import React from 'react';
import Text from '@commercetools-uikit/text';
import messages from './messages';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { FetchTaxes } from './queries.graphql';
import { useQuery } from '@apollo/client/react';
import Card from '@commercetools-uikit/card';



const target = GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM;
const taxId="931d8106-8661-4b5e-a062-c046248349d2";

const GraphqlCalls = () => {
    const { loading, error, data } = useQuery(FetchTaxes,{
        variables: {
            id:taxId
        },
        context:{ target }
    });
     
        if (loading) return 'Loading...';
        if (error) return `---Error! ${error.message}`;
        return (
            <Card theme="dark" type="raised">
            <Text.Headline as="h1">{`Tax: ${data.taxCategory.name}`}</Text.Headline>
            <Text.Headline as="h5">{`Tax Key: ${data.taxCategory.key}`}</Text.Headline>
            <Text.Headline as="h5">{`Tax ID: ${data.taxCategory.id}`}</Text.Headline>
          </Card>
        )
    
    
};
GraphqlCalls.displayName = 'GraphqlCalls';

export default GraphqlCalls;
