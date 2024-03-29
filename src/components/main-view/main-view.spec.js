import { fireEvent } from '@commercetools-frontend/application-shell/test-utils';
import { renderApplication } from '../../test-utils';

describe('main view', () => {
  it('the user can click on the link to "one" and the page should show a text with "View one"', async () => {
    const initialRoute = '/my-project/training-custom-app';
    const rendered = renderApplication(null, {
      permissions: { canViewProducts: true, canManageProducts: true },
      route: initialRoute,
    });
    await rendered.findByText(/Hello, world/i);

    fireEvent.click(rendered.getByText(/Page one/i));

    await rendered.findByText(/View one/i);

    expect(rendered.history.location).toEqual(
      expect.objectContaining({
        pathname: `${initialRoute}/one`,
      })
    );
  });
});
