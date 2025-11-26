# SolFlux - Solana Devnet Companion

SolFlux is a sleek Solana devnet companion that lets you monitor balances, request test SOL, send tokens, and sign arbitrary messages from a single dashboard. It is built with React, Vite, and Tailwind CSS and integrates the Solana Wallet Adapter to connect to popular wallets in just a few lines of code.

## Contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Usage guide](#usage-guide)
- [Project structure](#project-structure)
- [Customization notes](#customization-notes)
- [Dependency reference](#dependency-reference)
- [Next steps](#next-steps)

## Overview

Out of the box, SolFlux connects to the Solana devnet endpoint and ships with polished UI components powered by Tailwind CSS. The dashboard provides a starter experience for hackathons, workshops, or prototyping Solana-enabled front-ends.

## Features

- **Wallet-aware balance card** — Fetches and refreshes the connected wallet's SOL balance.
- **Devnet airdrop helper** — Requests SOL airdrops with validation and automatic transaction confirmation.
- **SOL transfer form** — Sends SOL between wallets using `SystemProgram.transfer` with confirmation feedback.
- **Message signing demo** — Signs arbitrary text with supported wallets and displays the generated signature.
- **Toast notifications** — Success and error alerts with auto-dismiss behaviour for better UX.

## Tech stack

- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/) for the build toolchain
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Solana Wallet Adapter](https://github.com/anza-xyz/wallet-adapter) React bindings and UI kit
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [lucide-react](https://lucide.dev/) icon set

## Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the dev server**
   ```bash
   npm run dev
   ```
3. Open the printed URL (default `http://localhost:5173`) and connect a devnet-capable Solana wallet.

> ℹ️ Node.js 18+ is recommended to match the tooling versions bundled with Vite 7.

## Available scripts

- `npm run dev` — Launch Vite in development mode with hot module replacement.
- `npm run build` — Produce an optimized production build.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Run ESLint across the project.

## Usage guide

1. **Connect a wallet** using the Solana Wallet Adapter button in the top-right corner. Configure the supported wallets array in `src/main.jsx` (see [Customization notes](#customization-notes)).
2. **Check balance** on the hero card. Use the refresh icon to fetch the latest SOL balance.
3. **Request devnet SOL** via the *Request Airdrop* card. The UI validates input and confirms the transaction on-chain.
4. **Send tokens** with the *Send Solana* form. Enter a recipient address and SOL amount to dispatch a transfer transaction.
5. **Sign messages** in the *Sign Message* panel to generate a signature that you can later verify on-chain or in off-chain services.

## Project structure

```
Airdrop-dapp/
├── src/
│   ├── App.jsx              # Layout and shell
│   ├── main.jsx             # Wallet adapters and providers
│   ├── index.css            # Tailwind entrypoint
│   └── components/
│       ├── Airdrop.jsx      # Devnet airdrop form
│       ├── ShowBalance.jsx  # Balance display and refresh
│       ├── SendTokens.jsx   # SOL transfer workflow
│       ├── SendMessage.jsx  # Message signing demo
│       └── Notifications.jsx# Toast UI component
└── public/                  # Static assets
```

## Customization notes

- **Wallet list** — The sample app keeps the `wallets` array empty in `WalletProvider`. Import the wallets you need from `@solana/wallet-adapter-wallets` and pass them in.
- **Network endpoint** — Update the `endpoint` passed to `ConnectionProvider` if you wish to target mainnet-beta or a local validator.
- **Styling** — Tailwind CSS v4 classes drive the UI. Add global tokens via `src/index.css` or extend Tailwind's config if needed.
- **Notifications** — The notification hook lives in `App.jsx`. Extend it or integrate a third-party toast system as desired.

## Dependency reference

Got all packages - 
npm install --save \
    @solana/wallet-adapter-base \
    @solana/wallet-adapter-react \
    @solana/wallet-adapter-react-ui \
    @solana/wallet-adapter-wallets \
    @solana/web3.js \
    react

from - https://github.com/anza-xyz/wallet-adapter/blob/master/APP.md


Happy hacking on Solana! 🚀

