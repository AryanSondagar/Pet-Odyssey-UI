import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let guard: authGuard;

  beforeEach(() => {
    guard = new authGuard({} as any, {} as any);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
