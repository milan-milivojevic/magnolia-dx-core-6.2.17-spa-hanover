# Hanover Standard Template Kit — Magnolia DX Core SPA

A React SPA integrated with Magnolia DX Core 6.2.17 via the Visual SPA Editor. The compiled app is deployed into the `standard-template-kit` light module and served directly by Magnolia.

## Requirements

- Node.js 16+ and npm 8+
- Magnolia DX Core 6.2.17 with the `standard-template-kit` light module

## Install

```bash
cd react-spa/standard-template-kit
npm install
```

## Local Development

```bash
npm start
```

App runs at `http://localhost:3000`. Requires a running Magnolia instance at the host configured in `.env` (`REACT_APP_MGNL_HOST`).

## Build and Deploy to Magnolia

```bash
npm run deploy:mgnl
```

This cleans the previous build, builds the app using `.env.mgnl`, and copies the output to `magnolia/light-modules/standard-template-kit/webresources/build/`.

## Environment Files

| File | Used for |
|---|---|
| `.env` | Local development — points to the live Magnolia host |
| `.env.mgnl` | Production build — `PUBLIC_URL` set for light module serving, `REACT_APP_MGNL_HOST` left empty for relative API calls |

## Deployment to Production

After building the project with `npm run deploy:mgnl`:

1. **Zip the light module folder:**
   - `magnolia-dx-core-6.2.17-spa-hanover/magnolia/light-modules/standard-template-kit/`

2. **Create ITO ticket** requesting:
   - Unzip the provided archive
   - Add contents to the Magnolia `light-modules` folder on the server
   - Restart Docker containers

3. **Verify** the changes are reflected after container restart
