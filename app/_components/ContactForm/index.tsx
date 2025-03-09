"use client";

import { createContactData } from '@/app/_actions/contact';
import { useActionState } from "react";
import styles from './index.module.css';

const initialState = {
    status: "",
    message: "",
};

// 状態パラメータを無視してcreateContactDataを呼ぶラッパー関数
const actionWrapper = (
    _state: { status: string; message: string },
    formData: FormData
    ) => createContactData(_state,formData);

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState<{ status: string; message: string }, FormData> (actionWrapper, initialState);

    console.log(state);
    if (state.status === "success") {
        return (
            <p className={styles.success}>
                お問い合わせいただき、ありがとうございます。
                <br />
                お返事まで今しばらくお待ちください。
            </p>
        );
    }
    return (
        <form className={styles.form} action={formAction}>
            <div className={styles.horizontal}>
                <div className={styles.item}>
                    <label className={styles.label} htmlFor="lastname">
                        性
                    </label>
                    <input className={styles.textfield} type="text" id="lastname" name="lastname" />
                </div>
                <div className={styles.item}>
                    <label className={styles.label} htmlFor="firstname">
                        名
                    </label>
                    <input className={styles.textfield} type="text" id="firstname" name="firstname" />
                </div>
            </div>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="company">
                    会社名
                </label>
                <input className={styles.textfield} type="text" id="company" name="company" />
            </div>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="email">
                    メールアドレス
                </label>
                <input className={styles.textfield} type="text" id="email" name="email" />
            </div>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="message">
                    メッセージ
                </label>
                <textarea className={styles.textarea} id="message" name="message" />
            </div>
            <div className={styles.actions}>
                {state.status === "error" && (
                    <p className={styles.error}>{state.message}</p>
                )}
                <input type="submit" value={isPending ? "送信中..." : "送信"} className={styles.button} disabled={isPending} />
            </div>
        </form>
    );
}