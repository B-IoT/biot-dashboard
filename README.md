# biot-web-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deployment

To build the app for production, use `npm run build`. It will build it to the `build` folder.

The command correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### Vercel

The `main` branch is deployed on [Vercel](https://vercel.com/b-iot/biot-web-app) at the following URL: <https://biot-web-app.vercel.app>.

Other branches are "preview deployed" on [Vercel](https://vercel.com/b-iot/biot-web-app) as well.

### Render

The `main` branch is deployed on [Render](https://dashboard.render.com/static/srv-bui2h4qpp1jgqvkc4b40) at the following URL: <https://biot-web-app.onrender.com>.

## Testing

Use `npm test` to launch the test runner in the interactive watch mode.

Use `npm test -- --coverage` to launch it with code coverage.

## Development

To run the app in the development mode, use `npm start`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### Workflow

Pushing on the `main` branch is forbidden, as it hosts the stable code for the production site; create a new branch for the feature to implement instead.

When the feature is ready, open a pull request to the `dev` branch; Render will preview deploy it. Once a certain number of features is ready and stable, `dev` can be merged into `main`.

### Analyzing bundle size

It is possible to analyze the bundle size with:

```shell
npm run build
npm run analyze
```

## Docs

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
