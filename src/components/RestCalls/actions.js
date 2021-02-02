import { actions as sdkActions } from '@commercetools-frontend/sdk';
import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';

export const fetchZones = () => 
    sdkActions.get({
        mcApiProxyTarget:MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
        service:'zones'
    })

export const fetchTaxById = id => 
    sdkActions.get({
        mcApiProxyTarget:MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
        service:'taxCategories',
        options:{ id }
    })