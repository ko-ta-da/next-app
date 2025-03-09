"use client";

import { signIn } from "next-auth/react";

export default function loginPage() {
    return (
        <div style = {{ textAlign: "center", marginTop: "100px" }}>
            <h1>ログイン</h1>
            {/* Googleでのログイン */}
            <button onClick={() => signIn("google")} style={{ marginRight: "10px" }}>
                Googleでログイン
            </button>
            {/* ID/パスワードでのログイン */}
            <button
                onClick={() =>
                    signIn("credentials", {
                        username: "admin",
                        password: "pass",
                        callbackUrl: "/",
                    })
                }
            >
                ID/パスワードでログイン
            </button>
        </div>
    );
}