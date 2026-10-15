const featureNames = ['admin', 'adoption', 'auth', 'checkout', 'courses', 'home', 'marketplace'];

module.exports = {
  forbidden: [
    ...featureNames.map((feature) => ({
      name: `no-cross-feature-imports-from-${feature}`,
      severity: 'error',
      from: { path: `^src/app/features/${feature}/` },
      to: { path: `^src/app/features/(?!${feature}/)` },
    })),
    {
      name: 'shared-must-not-import-features',
      severity: 'error',
      from: { path: '^src/app/shared/' },
      to: { path: '^src/app/features/' },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsConfig: { fileName: 'tsconfig.app.json' },
  },
};
