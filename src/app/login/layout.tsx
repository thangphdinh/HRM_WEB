// /app/login/layout.tsx
import type { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
    return (
        <div className="login-container">
            <div className="login-overlay">
                <div className="login-wrapper">
                    {children}
                </div>
            </div>
        </div>
    );
}
