import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PATHS } from "./constants/Navigation";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            ...PATHS.map((item) => ({
                path: item.link,
                element: item.element,
            })),
        ],
    },
]);

export default function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <RouterProvider router={router} />
        </MantineProvider>
    );
}
