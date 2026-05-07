import { type PropsWithChildren } from 'react';
import { useTheme } from '../context/ThemeProvider';

export default function RootLayout({ children }: PropsWithChildren) {
    const { theme } = useTheme();
    return (
        <div data-theme={theme}>
            {children}
        </div>
    )
}