# Purpose of the library

Agent Trace UI is designed to be drop-in library for displaying agent traces. Our mission is to bring an easy way to quickly setup simple UI, with total control over the source code.

## Technologies

- We use [pnpm](https://pnpm.io) as package manager and [`pnpm workspaces`](https://pnpm.io/workspaces) for separation of packages.
- Our library is built for [React](https://react.dev/) and uses [Tailwind](https://tailwindcss.com/) for styling

Since our main idea is having drop-in components with as little extra steps as possible, we try to limit dependencies and only use what is necessary:

- [lucide-react](https://lucide.dev/guide/packages/lucide-react) for icons
- [classnames](https://jedwatson.github.io/classnames/) for managing complex styles
- [radix primitives](https://www.radix-ui.com/primitives) in a few places - to help with building reliable and accessible components
- [react-json-pretty](https://www.npmjs.com/package/react-json-pretty) - lightweight package for displaying JSON data

## Structure

There are 4 packages:

| Name        | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| `ui`        | Contains components itself - `Button`, `Input`, `TraceList` etc |
| `data`      | Has utils and adapters for different data types                 |
| `types`     | Reusable global types - such as `TraceRecord`, `TraceSpan` etc. |
| `storybook` | For showcasing component                                        |

## Priorities

While developing new components or making changes to existing ones, we must focus on this key points:

- Accessibility by default. Our components should follow accessibility guidelines and conform to common accessibility standars, such as [WCAG](https://www.w3.org/TR/WCAG21/).
- All components should work and look correctly on any screen widths, starting from 375px.
- All components should support both light and dark theme
- Code must be clean, easy to understand and expand. Since we expect our users to adjust source code for their needs, we should think of how they will approach this - and make their lifes easier by providing easy to understand components.

## Making a contribution to the project

1. Fork the repository.
1. In project root, run `pnpm i` to install all dependencies
1. Run `pnpm run dev` to start local dev server
1. Create a branch in your repo, make changes and commit them. We follow [conventonal commits](https://www.conventionalcommits.org/en/v1.0.0/) format
1. Make PR to the base repo

## Styleguide

Here are some rules we follow in our repository

- When creating new component, place it inside `packages/ui/src/componens` folder.

```
packages
└── ui
    └── src
        └── components
            ├── Input.tsx
            ├── Button.tsx
            ├── ...
            ├── YourNewComponent.tsx
```

- If your components gets big, it is better to move some parts of it into separate, smaller components. Create a folder with the name of your component, place your component in this folder and add "COMPONENT_NAME" prefix to all of the subcomponents. Like that:

```
packages
└── ui
    └── src
        └── components
            ├── Input.tsx
            ├── Button.tsx
            ├── ...
            └── YourComponent
                ├── YourComponent.tsx
                ├── YourComponentHeader.tsx
                ├── YourComponentContent.tsx
                └── YourComponentFooter.tsx
```

- When handling complex styling logic, where composition (especially conditional) of classes is required, use `classnames`:

```jsx
import cn from "classnames";

...

<div classNames={classnames(
  "flex items-center gap-2",
  "bg-gray-300 dark:bg-gray-700",
  selected && "border border-2 border-orange-400",
  hasChildren ? "p-4" : "p-2"
)}>
...
</div>
```

- When creating new util or data adapter in `packages/data`, add tests for them. We use [Vitest](https://vitest.dev) for testing.

## Request new components

If you want new component to be added to the library, don't hesitate to create an issue on Github and start a discussion.
