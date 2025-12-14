# OpenSyntaxHQ

> Engineer-first open source tools and reference implementations for building scalable, maintainable software.

[![Deploy to GitHub Pages](https://github.com/OpenSyntaxHQ/OpenSyntaxHQ/actions/workflows/deploy.yml/badge.svg)](https://github.com/OpenSyntaxHQ/OpenSyntaxHQ/actions/workflows/deploy.yml)

## About

**OpenSyntaxHQ** builds practical, well-documented tools that make software systems easier to design, ship, and maintain. We prioritize engineering constraints, performance, and clean abstractions over hype.

Visit the live site: [OpenSyntaxHQ](https://opensyntaxhq.github.io/OpenSyntaxHQ/)

## Tech Stack

Built with a focus on performance and developer experience:

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) / `motion`

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/OpenSyntaxHQ/OpenSyntaxHQ.git
    cd OpenSyntaxHQ
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000/OpenSyntaxHQ](http://localhost:3000/OpenSyntaxHQ) with your browser to see the result.

## Deployment

This site is automatically deployed to **GitHub Pages** via GitHub Actions.

-   **Configuration**: `output: 'export'` (Static Export)
-   **Base Path**: `/OpenSyntaxHQ`
-   **Workflow**: `.github/workflows/deploy.yml`

Any push to the `main` branch triggers a new build and deployment.

## License

MIT © [OpenSyntaxHQ](https://github.com/OpenSyntaxHQ)
