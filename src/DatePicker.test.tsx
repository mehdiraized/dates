import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import DatePicker from './DatePicker';

test('DatePicker renders without crashing', () => {
  render(
    <MantineProvider>
      <DatePicker onChange={() => {}} value={null} />
    </MantineProvider>,
  );
});
